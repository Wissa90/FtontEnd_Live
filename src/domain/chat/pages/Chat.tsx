"use client";
import {
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson, MdKeyboardArrowDown } from "react-icons/md";
import MessageBoxChat from "../../../horizon-ai/components/MessageBoxChat";
import { ChatLayout } from "../components/ChatLayout";
import {
  sendMessage,
  getConversations,
  createConversation,
  getMessages
} from '../chat.api';

const Chat = () => {
  // State management
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<{ id: string; name: string }[]>([]);
  const [currentConversation, setCurrentConversation] = useState<{ id: string; name: string } | null>(null);
  const [messages, setMessages] = useState<{ id: string; text: string; role: string; timestamp: string }[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Refs for scrolling
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Color mode values
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgIcon = useColorModeValue(
    "linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)",
    "whiteAlpha.200"
  );
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonBg = useColorModeValue("white", "whiteAlpha.100");
  const gray = useColorModeValue("gray.500", "white");
  const buttonShadow = useColorModeValue(
    "14px 27px 45px rgba(112, 144, 176, 0.2)",
    "none"
  );
  const textColor = useColorModeValue("navy.700", "white");
  const placeholderColor = useColorModeValue(
    { color: "gray.500" },
    { color: "whiteAlpha.600" }
  );

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await getConversations();
      setConversations(response.data);

      // If there are conversations, load messages for the first one
      if (response.data.length > 0) {
        const firstConversation = response.data[0];
        setCurrentConversation(firstConversation);
        loadMessages(firstConversation.id);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await getMessages(conversationId);
      setMessages(response.data.messages);
      scrollToBottom(true);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = (immediate = false) => {
    const scrollAction = () => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: immediate ? "instant" : "smooth",
          block: "end",
        });
      }
    };

    if (immediate) {
      scrollAction();
    } else {
      setTimeout(scrollAction, 50);
    }
  };

  const createNewConversation = async () => {
    try {
      const response = await createConversation({
        name: `Chat ${new Date().toLocaleString()}`
      });
      setCurrentConversation(response);
      setMessages([]); // Clear messages for new conversation
      return response;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  };

  const handleTranslate = async () => {
    if (!inputCode.trim()) {
      alert("Please enter your message.");
      return;
    }

    setLoading(true);
    try {
      // Create new conversation if none exists
      if (!currentConversation) {
        const newConversation = await createNewConversation();
        setCurrentConversation(newConversation);
      }

      // Prepare form data
      const formData = new FormData();
      if (currentConversation) {
        formData.append('conversation_id', currentConversation.id);
      }
      formData.append('text', inputCode);

      // Add message to UI immediately for better UX
      const tempUserMessage = {
        id: `temp-${Date.now()}`,
        text: inputCode,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, tempUserMessage]);

      // Clear input immediately
      setInputCode("");

      // Send message
      const response = await sendMessage(formData);

      // Add AI response to messages
      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: response.details.text.response,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Scroll to the bottom
      scrollToBottom();

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(event.target.value);
  };

  // Monitor scroll position
  useEffect(() => {
    const container = chatContainerRef.current as HTMLElement | null;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setShowScrollButton(distanceFromBottom > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ChatLayout conversations={conversations.map(conv => conv.name)}>
      <Flex
        w="100%"
        pt={{ base: "70px", md: "0px" }}
        direction="column"
        position="relative"
      >
        <Img
          src="/img/chat/bg-image.png"
          position={"absolute"}
          w="350px"
          left="50%"
          top="50%"
          transform={"translate(-50%, -50%)"}
        />
        <Flex
          direction="column"
          mx="auto"
          w={{ base: "100%", md: "100%", xl: "100%" }}
          minH={{ base: "75vh", "2xl": "85vh" }}
          maxW="1000px"
        >



          {/* Messages Display */}
          <Flex
            ref={chatContainerRef}
            direction="column"
            w="100%"
            mx="auto"
            flex="1"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: borderColor,
                borderRadius: '24px',
              },
            }}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${message.id || index}`}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {message.role === 'user' ? (
                  <Flex w="100%" justify="flex-end" mb="10px">
                    <Flex maxW="80%" align="center">
                      <Flex
                        p="22px"
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="14px"
                        zIndex="2"
                      >
                        <Text
                          color={textColor}
                          fontWeight="600"
                          fontSize={{ base: "sm", md: "md" }}
                          lineHeight={{ base: "24px", md: "26px" }}
                        >
                          {message.text}
                        </Text>
                      </Flex>
                      <Flex
                        borderRadius="full"
                        justify="center"
                        align="center"
                        bg={"transparent"}
                        border="1px solid"
                        borderColor={borderColor}
                        ms="20px"
                        h="40px"
                        minH="40px"
                        minW="40px"
                      >
                        <Icon as={MdPerson} width="20px" height="20px" color={brandColor} />
                      </Flex>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex w="100%" justify="flex-start" mb="10px">
                    <Flex maxW="80%" align="center">
                      <Flex
                        borderRadius="full"
                        justify="center"
                        align="center"
                        bg={"linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"}
                        me="20px"
                        h="40px"
                        minH="40px"
                        minW="40px"
                      >
                        <Icon as={MdAutoAwesome} width="20px" height="20px" color="white" />
                      </Flex>
                      <Box flexGrow={1} maxW="100%">
                        <MessageBoxChat output={message.text} />
                      </Box>
                    </Flex>
                  </Flex>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Flex>

          {/* Scroll to Bottom Button */}
          {showScrollButton && (
            <Flex justify="center" mt="4">
              <Button
                onClick={() => scrollToBottom(true)}
                size="sm"
                rounded="full"
                bg={buttonBg}
                shadow={buttonShadow}
                _hover={{ bg: "gray.100" }}
              >
                <Icon as={MdKeyboardArrowDown} />
              </Button>
            </Flex>
          )}

          {/* Input Area */}
          <Flex ms={{ base: "0px", xl: "60px" }} mt="20px">
            <Input
              minH="54px"
              h="100%"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="45px"
              p="15px 20px"
              me="10px"
              fontSize="sm"
              fontWeight="500"
              _focus={{ borderColor: "none" }}
              color={inputColor}
              _placeholder={placeholderColor}
              placeholder="Type your message here..."
              value={inputCode}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleTranslate();
                }
              }}
            />
            <Button
              variant="primary"
              py="20px"
              px="16px"
              fontSize="sm"
              borderRadius="45px"
              ms="auto"
              w={{ base: "160px", md: "210px" }}
              h="54px"
              _hover={{
                boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
                bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
                _disabled: {
                  bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
                },
              }}
              onClick={handleTranslate}
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ChatLayout>
  );
};

export { Chat };
