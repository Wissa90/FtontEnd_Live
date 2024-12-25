import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "../../../horizon-ai/components/footer/FooterAuthDefault";
import Sidebar from "../../../horizon-ai/components/sidebar/Sidebar";
import routes from "../../../horizon-ai/routes";

type ChatLayoutProps = {
  children: ReactNode;
  conversations: string[];
};

const ChatLayout = ({ children, conversations }: ChatLayoutProps) => {
  return (
    <Box>
      <Sidebar
        setApiKey={"some-api-key"}
        routes={routes}
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
