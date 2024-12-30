

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
import React, { useState } from "react";


interface PersonalInformationStepProps {
  data: {
    first_name: string;
    last_name: string;
  };
  updateData: (newData: { [key: string]: string }) => void;
  nextStep: () => void;
}

export const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ data, updateData, nextStep }) => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.500";
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const placeholderColor = useColorModeValue(
    { color: "gray.500", fontWeight: "500" },
    { color: "whiteAlpha.600", fontWeight: "500" }
  );

  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.first_name || !data.last_name) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      nextStep();
    }
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
          Personal Information
        </Text>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="500"
          fontSize="sm"
        >
          Enter your personal details to continue.
        </Text>
      </Box>
      <FormControl>
        <FormLabel
          htmlFor="first_name"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
        >
          First Name
        </FormLabel>
        <Input
          id="first_name"
          name="first_name"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your first name"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.first_name}
          onChange={handleChange}
          _placeholder={{ placeholderColor }}
        />
        <FormLabel
          htmlFor="last_name"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
        >
          Last Name
        </FormLabel>
        <Input
          id="last_name"
          name="last_name"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your last name"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.last_name}
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
        <Button
          variant="primary"
          w="100%"
          h="54px"
          mt="24px"
          onClick={handleNext}
        >
          Next
        </Button>
      </FormControl>
    </Flex>
  );
};

