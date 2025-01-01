"use client";
// chakra imports
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
//   Custom components
import { PropsWithChildren } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { MdOutlineManageAccounts, MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { IRoute } from "../../../types/navigation";
import APIModal from "../../apiModal";
import { NextAvatar } from "../../image/Avatar";
import Brand from "./Brand";
import SidebarCard from "./SidebarCard";
import avatar4 from "/img/avatars/avatar4.png";

import { Conversation } from "src/domain/chat/chat.types";
import { RoundedChart } from "../../icons/Icons";
// FUNCTIONS

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
  conversations: Conversation[];
  selectedId?: number;
  [x: string]: any;
  setSelected: (conversation: Conversation) => void;
}

function SidebarContent(props: SidebarContent) {
  const { setApiKey, conversations, selectedId, setSelected } = props;
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
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="20px"
      pb="26px"
      borderRadius="30px"
      maxW="285px"
      px="20px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box
          ps="0px"
          pe={{ md: "0px", "2xl": "0px" }}
          display="flex"
          flexDirection="column"
          gap="2.5"
        >
          {conversations.map((_) => (
            <Card key={_.id} style={{ 'cursor': 'pointer', ...(_.id === selectedId ? { border: '1px solid blue' } : {}) }} onClick={() => setSelected(_)}>
              <CardBody>
                <Text>{_.name}</Text>
              </CardBody>
            </Card>
          ))}
          {/* <Links routes={routes} /> */}
        </Box>
      </Stack>

      <Box mt="60px" width={"100%"} display={"flex"} justifyContent={"center"}>
        <SidebarCard />
      </Box>
      <APIModal setApiKey={setApiKey} sidebar={true} />
      <Flex
        mt="8px"
        justifyContent="center"
        alignItems="center"
        boxShadow={shadowPillBar}
        borderRadius="30px"
        p="14px"
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
    </Flex>
  );
}

export default SidebarContent;
