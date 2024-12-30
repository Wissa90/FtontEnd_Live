"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

interface AcademicInformationStepProps {
  data: {
    dateOfBirth: string;
    grade: string;
    gradeStage: string;
  };
  updateData: (newData: { [key: string]: string }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const AcademicInformationStep: React.FC<AcademicInformationStepProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const placeholderColor = useColorModeValue(
    { color: "gray.500", fontWeight: "500" },
    { color: "whiteAlpha.600", fontWeight: "500" }
  );

  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.dateOfBirth || !data.grade || !data.gradeStage) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      nextStep();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
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
          fontWeight="700"
        >
          Academic Information
        </Text>
      </Box>
      <FormControl>
        <FormLabel htmlFor="dateOfBirth" fontSize="sm" fontWeight="500" color={textColor}>
          Date of Birth
        </FormLabel>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          variant="auth"
          fontSize="sm"
          type="date"
          placeholder="Select date"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.dateOfBirth}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          _placeholder={placeholderColor}
        />

        <FormLabel htmlFor="grade" fontSize="sm" fontWeight="500" color={textColor}>
          Grade
        </FormLabel>
        <Input
          id="grade"
          name="grade"
          variant="auth"
          fontSize="sm"
          placeholder="Enter your grade"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.grade}
          onChange={handleChange}
          _placeholder={placeholderColor}
        />

        <FormLabel htmlFor="gradeStage" fontSize="sm" fontWeight="500" color={textColor}>
          Grade Stage
        </FormLabel>
        <Select
          id="gradeStage"
          name="gradeStage"
          variant="auth"
          fontSize="sm"
          placeholder="Select grade stage"
          mb="24px"
          size="lg"
          borderColor={borderColor}
          value={data.gradeStage}
          onChange={handleChange}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="highschool">High School</option>
        </Select>

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
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default AcademicInformationStep;