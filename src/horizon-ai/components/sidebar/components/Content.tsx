"use client";
// chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
//   Custom components
import { PropsWithChildren } from "react";
import { FiLogOut, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { MdOutlineManageAccounts, MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { IRoute } from "../../../types/navigation";
import { NextAvatar } from "../../image/Avatar";
import avatar4 from "/img/avatars/avatar4.png";

import { Conversation } from "src/domain/chat/chat.types";
import { HorizonLogo, RoundedChart } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";
// FUNCTIONS

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
  conversations: Conversation[];
  selectedId?: number;
  [x: string]: any;
  setSelected: (conversation: Conversation) => void;
  createConversation: () => void;
  deleteConversation: (id: number) => void;
}

function SidebarContent(props: SidebarContent) {
  const { conversations, selectedId, setSelected, createConversation, deleteConversation } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const bgColor = useColorModeValue("white", "navy.700");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(12, 44, 55, 0.18)",
  );
  const iconColor = useColorModeValue("navy.700", "white");
  const shadowPillBar = useColorModeValue(
    "4px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "none",
  );
  const gray = useColorModeValue("gray.500", "white");
  const logoColor = useColorModeValue("navy.700", "white");

  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      borderRadius="30px"
      maxW="285px"
    // px="20px"
    // pt="20px"
    >
      <Flex alignItems="center" flexDirection="column">
        <IconButton
          onClick={createConversation}
          position="absolute"
          right={1}
          top={0}
          aria-label="New Conversation"
        >
          <FiPlusCircle fontSize="25px" />
        </IconButton>

        <HorizonLogo h="26px" w="146px" my="30px" color={logoColor} />
        <HSeparator mb="20px" w="284px" />
      </Flex>
      <Stack direction="column" mb="auto" mt="8px" >
        <Box
          overflowY="auto"
          ps="0px"
          pe={{ md: "0px", "2xl": "0px" }}
          display="flex"
          flexDirection="column"
          gap="2"
          maxH="70vh"
          sx={{
            "&::-webkit-scrollbar": {
              width: "12px", // Adjust width of scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // Background color of track
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // Color of the scrollbar thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // Darker thumb on hover
              cursor: "pointer", // Ensures the thumb is draggable
            },
          }}
        >
          {conversations.map((_) => (
            <Flex justifyContent="space-between" key={_.id}
              onClick={() => setSelected(_)}
              cursor="pointer"
              p={2} // Padding for better click area
              mr={2}
              borderRadius="md" // Rounded corners for a modern look

              bg={
                _.id === selectedId
                  ? useColorModeValue("navy.200", "blue.900") // Light blue for light mode, darker blue for dark mode
                  : "transparent"
              }
              border={
                _.id === selectedId
                  ? `1px solid ${useColorModeValue("blue.500", "blue.200")}` // Border adapts to mode
                  : "1px solid transparent"
              }
              _hover={{
                bg: useColorModeValue("gray.200", "gray.700"), // Subtle hover effect for all items
              }}
            >
              <Text
                fontSize="small"
                fontWeight="semibold"
              >
                {_.name}
              </Text>
              <Button color="red.600" size="small" backgroundColor="transparent" onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                deleteConversation(_.id);
              }}>
                <Icon as={FiTrash2} />
              </Button >
            </Flex>
          ))}
        </Box>
      </Stack>

      {/* <Box mt="60px" width={"100%"} display={"flex"} justifyContent={"center"}>
        <SidebarCard />
      </Box> */}
      <Flex
        mt="8px"
        justifyContent="center"
        alignItems="center"
        boxShadow={shadowPillBar}
        borderRadius="30px"
        width="90%"
        p="14px"
        mb="30px"
      >
        <NextAvatar h="34px" w="34px" src={avatar4} me="10px" />
        <Text color={textColor} fontSize="xs" fontWeight="600" me="10px">
          Adela Parkson
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            variant="transparent"
            aria-label=""
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            w="34px"
            h="34px"
            px="0px"
            p="0px"
            minW="34px"
            me="10px"
            justifyContent={"center"}
            alignItems="center"
            color={iconColor}
          >
            <Flex align="center" justifyContent="center">
              <Icon
                as={MdOutlineSettings}
                width="18px"
                height="18px"
                color="inherit"
              />
            </Flex>
          </MenuButton>
          <MenuList
            ms="-20px"
            py="25px"
            ps="20px"
            pe="80px"
            w="246px"
            borderRadius="16px"
            transform="translate(-19px, -62px)!important"
            border="0px"
            boxShadow={shadow}
            bg={bgColor}
          >
            <Box mb="30px">
              <Link to="/settings">
                <Flex align="center">
                  <Icon
                    as={MdOutlineManageAccounts}
                    width="24px"
                    height="24px"
                    color={gray}
                    me="12px"
                  />
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    Profile Settings
                  </Text>
                </Flex>
              </Link>
            </Box>
            <Box mb="30px">
              <Link to="/history">
                <Flex align="center">
                  <Icon
                    as={LuHistory}
                    width="24px"
                    height="24px"
                    color={gray}
                    me="12px"
                  />
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    History
                  </Text>
                </Flex>
              </Link>
            </Box>
            <Box mb="30px">
              <Link to="/usage">
                <Flex align="center">
                  <Icon
                    as={RoundedChart}
                    width="24px"
                    height="24px"
                    color={gray}
                    me="12px"
                  />
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    Usage
                  </Text>
                </Flex>
              </Link>
            </Box>
            <Box>
              <Link to="/my-plan">
                <Flex align="center">
                  <Icon
                    as={IoMdPerson}
                    width="24px"
                    height="24px"
                    color={gray}
                    me="12px"
                  />
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    My Plan
                  </Text>
                </Flex>
              </Link>
            </Box>
          </MenuList>
        </Menu>
        <Button
          variant="transparent"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="full"
          w="34px"
          h="34px"
          px="0px"
          minW="34px"
          justifyContent={"center"}
          alignItems="center"
        >
          <Icon as={FiLogOut} width="16px" height="16px" color="inherit" />
        </Button>
      </Flex>
    </Flex >
  );
}

export default SidebarContent;
