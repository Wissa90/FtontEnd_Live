"use client";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";


interface AccountInformationStepProps {
  data: {
    username: string;
    password: string;
    confirmPassword: string;
  };
  updateData: (newData: { [key: string]: string }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const AccountInformationStep = ({ data, updateData, nextStep, prevStep }: AccountInformationStepProps) => {
  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");


  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password complexity regex
    const errorMessages = [];

    // Validation logic
    if (!data.username) errorMessages.push("Username is required.");
    if (!data.password) errorMessages.push("Password is required.");
    if (!data.confirmPassword) errorMessages.push("Confirm password is required.");
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errorMessages.push("Passwords do not match.");
    }
    if (data.password && !passwordRegex.test(data.password)) {
      errorMessages.push(
        "Password must meet the following requirements:"
      );
    }

    // Update the error state
    setErrors(errorMessages);

    // Only proceed if there are no errors
    if (errorMessages.length > 0) {
      return; // Exit early if there are errors
    }

    // No errors, proceed to the next step
    nextStep();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
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
          Account Information
        </Text>
      </Box>
      <FormControl>
        <FormLabel htmlFor="username" fontSize="sm" fontWeight="500" color={textColor}>
          Username
        </FormLabel>
        <Input
          id="username"
          name="username"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your username"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.username}
          onChange={handleChange}
        />
        <FormLabel htmlFor="password" fontSize="sm" fontWeight="500" color={textColor}>
          Password
        </FormLabel>
        <Input
          id="password"
          name="password"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your password"
          mb="24px"
          size="lg"
          type="password"
          borderColor={borderColor}
          value={data.password}
          onChange={handleChange}
        />
        <FormLabel htmlFor="confirmPassword" fontSize="sm" fontWeight="500" color={textColor}>
          Confirm Password
        </FormLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          variant="auth"
          fontSize="sm"
          placeholder="Re-enter your password"
          mb="24px"
          size="lg"
          type="password"
          borderColor={borderColor}
          value={data.confirmPassword}
          onChange={handleChange}
        />
        {errors.length > 0 && (
          <Box color="red.500" mb="16px">
            <UnorderedList>
              {errors.map((error, index) => (
                <ListItem key={index}>
                  {error === "Password must meet the following requirements:" ? (
                    <>
                      {error}
                      <UnorderedList pl={4}>
                        <ListItem>At least 8 characters long</ListItem>
                        <ListItem>Include at least one uppercase letter</ListItem>
                        <ListItem>Include at least one number</ListItem>
                        <ListItem>Include at least one special character (@$!%*?&)</ListItem>
                      </UnorderedList>
                    </>
                  ) : (
                    error
                  )}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>

        )}
        <Flex justify="space-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

