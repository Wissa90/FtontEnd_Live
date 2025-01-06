"use client";
import {
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAutoAwesome, MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  createConversation,
  deleteConversation,
  getConversations,
  getMessages,
  sendMessage
} from '../chat.api';
import { Conversation, Message } from "../chat.types";
import { ChatLayout } from "../components/ChatLayout";
import { ConfirmationModal } from "../components/ConfirmationModal";

const Chat = () => {
  const { id: selectedConversationIdParam } = useParams();
  const [conversationIdToDelete, setConversationIdToDelete] = useState<number>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();


  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<number | undefined>(
    selectedConversationIdParam ? Number(selectedConversationIdParam) : undefined
  );

  const [messages, setMessages] = useState<Message[]>([]);
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
    getConversations().then(setConversations);
  }, []);

  useEffect(() => {
    if (!selectedConversationId) {
      return;
    }

    getMessages(selectedConversationId)
      .then(messages => {
        setMessages(messages);
        scrollToBottom(true);
      });
  }, [])

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

  const handleSubmit = async () => {
    if (!inputCode.trim()) {
      alert("Please enter your message.");
      return;
    }

    setLoading(true);
    try {
      const conversation = selectedConversationId ? conversations.find(_ => _.id === selectedConversationId)!! : await createConversation({
        name: `Chat ${new Date().toLocaleString()}`
      });

      if (!selectedConversationId) {
        // new conversation created
        setConversations(current => [...current, conversation]);
        setSelectedConversationId(conversation.id);
        navigate(`/chat/${conversation.id}`, { replace: true });
        setMessages([]);
      }

      const formData = new FormData();

      formData.append('conversation_id', conversation.id.toString());
      formData.append('text', inputCode);

      // Add message to UI immediately for better UX
      // TODO: replace with useOptimistic from react-19
      const newMessageTempId = new Date().getTime();

      const tempUserMessage = {
        id: newMessageTempId,
        ai_response: '',
        user_question: inputCode,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, tempUserMessage]);
      setInputCode("");

      // Send message
      const aiResponse = (await sendMessage(formData)).details.text.response;

      // Add AI response to messages
      const updatedMessage = { ...tempUserMessage, ai_response: aiResponse };

      setMessages(prev => prev.map(_ => {
        if (_.id !== tempUserMessage.id) {
          return _;
        }

        return updatedMessage
      }));

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
    <ChatLayout
      conversations={conversations}
      selectedId={selectedConversationId}
      setSelected={conversation => {
        setSelectedConversationId(conversation.id);
        getMessages(conversation.id).then(setMessages);
        navigate(`/chat/${conversation.id}`, { replace: true });
      }}
      createConversation={() => {
        setSelectedConversationId(undefined);
        setMessages([]);
        navigate(`/chat`, { replace: true });
        inputRef?.current?.focus();
      }}
      deleteConversation={setConversationIdToDelete}
    >
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
                key={message.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {message.user_question && (
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
                          {message.user_question}
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
                  </Flex>)}

                {message.ai_response && (
                  <Flex w="100%" justify="flex-start" mb="10px">
                    <Flex maxW="80%" align="center">
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
                        <Icon as={MdAutoAwesome} width="20px" height="20px" color={brandColor} />
                      </Flex>
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
                          {message.ai_response}
                        </Text>
                      </Flex>
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
              ref={inputRef}
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
                  handleSubmit();
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
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {conversationIdToDelete && <ConfirmationModal
        isOpen={true}
        onClose={() => setConversationIdToDelete(undefined)}
        message="Are you sure you want to delete this conversaion?"
        confirmationText="Delete"
        cancelText="Cancel"
        confirm={async () => {
          await deleteConversation(conversationIdToDelete);
          getConversations().then(setConversations);
          setConversationIdToDelete(undefined);

          // Deleting a different conversation
          if (conversationIdToDelete !== selectedConversationId) {
            return;
          }

          // Deleting the currently selected conversation
          inputRef?.current?.focus();
          setSelectedConversationId(undefined);
          navigate(`/chat`, { replace: true });
          setMessages([]);
        }}
        confirmationVariant="destructive"
      />}

    </ChatLayout>
  );
};

export { Chat };

