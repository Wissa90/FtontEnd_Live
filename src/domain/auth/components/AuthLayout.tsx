// Chakra imports
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import FixedPlugin from "../../../horizon-ai/components/fixedPlugin/FixedPlugin";
import Footer from "../../../horizon-ai/components/footer/FooterAuthDefault";

interface DefaultAuthLayoutProps extends PropsWithChildren {
  children: JSX.Element;
  illustrationBackground: string;
}

const DefaultAuthLayout = (props: DefaultAuthLayoutProps) => {
  const { children, illustrationBackground } = props;

  return (
    <Flex h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        direction="column"
      >
        <Link
          as={RouterLink}
          to="/all-templates"
          sx={{
            width: "fit-content",
            marginTop: "40px",
          }}
        >
          <Flex
            align="center"
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="gray.500"
            />
            <Text ms="0px" fontSize="sm" color="gray.500">
              Back to the dashboard
            </Text>
          </Flex>
        </Link>
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
          />
        </Box>
        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
};

export { DefaultAuthLayout };
