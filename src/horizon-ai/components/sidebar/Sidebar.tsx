"use client";
import { PropsWithChildren } from "react";

// chakra imports
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { IoMenuOutline } from "react-icons/io5";
import { Conversation } from "src/domain/chat/chat.types";
import { isWindowAvailable } from "../../../domain/chat/utils/navigation";
import { IRoute } from "../../types/navigation";
import { renderThumb, renderTrack, renderView } from "../scrollbar/Scrollbar";
import Content from "./components/Content";

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  conversations: Conversation[];
  selectedId?: number;
  [x: string]: any;
  setSelected: (conversation: Conversation) => void;
  createConversation: () => void;
  deleteConversation: (id: number) => void;
}

const Sidebar = (props: SidebarProps) => {
  const { routes, setApiKey, conversations, selectedId, createConversation, deleteConversation, setSelected } = props;
  // this is for the rest of the collapses
  const variantChange = "0.2s linear";
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset",
  );
  // Chakra Color Mode
  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarRadius = "14px";
  const sidebarMargins = "0px";
  // SIDEBAR
  return (
    <Box display={{ base: "none", xl: "block" }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content
            setApiKey={setApiKey}
            routes={routes}
            conversations={conversations}
            selectedId={selectedId}
            setSelected={setSelected}
            createConversation={createConversation}
            deleteConversation={deleteConversation}
          />
        </Scrollbars>
      </Box>
    </Box>
  );
};

// FUNCTIONS
export function SidebarResponsive(props: { routes: IRoute[] }) {
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { routes } = props;
  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() && document.documentElement.dir === "rtl"
            ? "right"
            : "left"
        }
      >
        <DrawerOverlay />
        <DrawerContent
          w="285px"
          maxW="285px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} conversations={[]} setSelected={() => { }} createConversation={() => { }} deleteConversation={() => { }} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

export default Sidebar;
