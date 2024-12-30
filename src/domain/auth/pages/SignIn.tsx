"use client";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { HSeparator } from "../../../horizon-ai/components/separator/Separator";
import { authApi } from "../auth.api";
import { DefaultAuthLayout } from "../components/AuthLayout";

function SignIn() {
  // Chakra color mode
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.500";
  const textColorDetails = useColorModeValue("navy.700", "gray.500");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const placeholderColor = useColorModeValue(
    { color: "gray.500", fontWeight: "500" },
    { color: "whiteAlpha.600", fontWeight: "500" },
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setError("");
    try {
      await authApi.loginUser({ username, password });
      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <DefaultAuthLayout illustrationBackground="/img/auth/auth.png">
      <Flex
        w="100%"
        maxW="max-content"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "12vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Text
            color={textColor}
            fontSize={{ base: "34px", lg: "36px" }}
            mb="10px"
            fontWeight={"700"}
          >
            Sign In
          </Text>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="500"
            fontSize="sm"
          >
            Enter your username and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            variant="transparent"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="14px"
            ms="auto"
            mb="30px"
            fontSize="md"
            w={{ base: "100%" }}
            h="54px"
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text
              color={textColorSecondary}
              fontWeight="500"
              fontSize="sm"
              mx="14px"
            >
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              cursor="pointer"
              display="flex"
              ms="4px"
              htmlFor="email"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Username<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              id="email"
              variant="auth"
              fontSize="sm"
              type="email"
              placeholder="Enter your username"
              mb="24px"
              size="lg"
              borderColor={borderColor}
              h="54px"
              fontWeight="500"
              _placeholder={{ placeholderColor }}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            {/* PASSWORD */}
            <FormLabel
              cursor="pointer"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              htmlFor="pass"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                variant="auth"
                id="pass"
                fontSize="sm"
                placeholder="Enter your password"
                mb="24px"
                size="lg"
                borderColor={borderColor}
                h="54px"
                fontWeight="500"
                _placeholder={{ placeholderColor }}
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  color={textColor}
                  fontWeight="600"
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <RouterLink to="#">
                <Text
                  color={textColorBrand}
                  w="124px"
                  fontWeight="600"
                  fontSize="sm"
                >
                  Forgot password?
                </Text>
              </RouterLink>
            </Flex>
            {/* CONFIRM */}
            {error && (
              <Text
                color="red"
                size="xs"
                display="flex"
                justifyContent="center"
                marginBottom="1.5"
              >
                {error}
              </Text>
            )}
            <Button
              variant="primary"
              py="20px"
              px="16px"
              fontSize="sm"
              borderRadius="45px"
              mt={{ base: "20px", md: "0px" }}
              w="100%"
              h="54px"
              mb="24px"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Sign In
            </Button>
          </FormControl>
          <Flex justifyContent="center" alignItems="start" maxW="100%" mt="0px">
            <Text color={textColorDetails} fontWeight="500" fontSize="sm">
              Not registered yet?
            </Text>
            <Link href="/auth/sign-up" py="0px" lineHeight={"120%"}>
              <Text
                color={textColorBrand}
                fontSize="sm"
                as="span"
                ms="5px"
                fontWeight="600"
              >
                Create an Account
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}

export default SignIn;
