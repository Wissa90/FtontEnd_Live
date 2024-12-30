import { Box } from "@chakra-ui/react";
import { ReactNode, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Footer from "../../../horizon-ai/components/footer/FooterAuthDefault";
import Sidebar from "../../../horizon-ai/components/sidebar/Sidebar";
import routes from "../../../horizon-ai/routes";
import Navbar from "./navbar/NavbarAdmin";
import { getActiveRoute, getActiveNavbar } from '../utils/navigation';

type ChatLayoutProps = {
  children: ReactNode;
  conversations: string[];
};

const ChatLayout = ({ children, conversations = [] }: ChatLayoutProps) => {
  const location = useLocation();
  const pathname = location?.pathname || '/'; // Fallback to '/' if undefined
  const [apiKey, setApiKey] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const initialKey = localStorage.getItem('apiKey');
    if (initialKey?.includes('sk-') && apiKey !== initialKey) {
      setApiKey(initialKey);
    }
  }, [apiKey]);


  return (
    <Box>
      <Sidebar
        setApiKey={apiKey}
        routes={routes || []} // Fallback to an empty array if routes are undefined
        conversations={conversations}
      />
      <Box
        pt={{ base: "60px", md: "100px" }}
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <Box>
          <Navbar
            setApiKey={setApiKey}
            onOpen={onOpen}
            logoText={"Horizon UI Dashboard PRO"}
            brandText={getActiveRoute(routes, location.pathname)}
            secondary={getActiveNavbar(routes, location.pathname)}
          />
        </Box>

        <Box
          mx="auto"
          p={{ base: "20px", md: "30px" }}
          pe="20px"
          minH="100vh"
          pt="50px"
        >
          {children}
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export { ChatLayout };
