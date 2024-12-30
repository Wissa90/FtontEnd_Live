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
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { authApi } from "../../../auth/auth.api";
import { useNavigate } from "react-router-dom";

interface ContactInformationStepProps {
  data: FormData;
  updateData: (data: { [key: string]: string }) => void;
  prevStep: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  dateOfBirth: string;
  grade: string;
  gradeStage: string;
  parentEmail: string;
}

export const ContactInformationStep = ({
  data,
  updateData,
  prevStep,
}: ContactInformationStepProps) => {
  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const navigate = useNavigate();
  const placeholderColor = useColorModeValue(
    { color: "gray.500", fontWeight: "500" },
    { color: "whiteAlpha.600", fontWeight: "500" }
  );

  const [error, setError] = useState<string | null>("");

  const handleSubmit = async () => {
    setError(""); // Reset error message

    try {
      // Create the payload in the required format
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        profile: {
          birth_date: new Date(data.dateOfBirth).toISOString().split("T")[0], // Format as YYYY-MM-DD
          location: "", // Default or user-provided value
          current_grade: parseInt(data.grade, 10), // Ensure grade is sent as a number
          educational_stage: data.gradeStage,
          parent_email: data.parentEmail,
        },
      };


      // Send data to the backend
      const response = await authApi.register(payload);
      console.log("Registration successful:", response);

      // Navigate to the next page after successful registration
      navigate("/chat");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          Contact Information
        </Text>
      </Box>
      <FormControl>
        <FormLabel htmlFor="email" fontSize="sm" fontWeight="500" color={textColor}>
          Email
        </FormLabel>
        <Input
          id="email"
          name="email"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your email"
          mb="24px"
          size="lg"
          type="email"
          borderColor={borderColor}
          value={data.email}
          onChange={handleChange}
          _placeholder={{ placeholderColor }}
        />
        <FormLabel htmlFor="parentEmail" fontSize="sm" fontWeight="500" color={textColor}>
          Parent Email
        </FormLabel>
        <Input
          id="parentEmail"
          name="parentEmail"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your parent's email"
          mb="24px"
          size="lg"
          type="email"
          borderColor={borderColor}
          value={data.parentEmail}
          onChange={handleChange}
          _placeholder={{ placeholderColor }}
        />
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
        <Flex justify="space-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};
