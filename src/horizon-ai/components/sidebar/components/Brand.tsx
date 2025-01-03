"use client";
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { HorizonLogo } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      <HorizonLogo h="26px" w="146px" my="30px" color={logoColor} />
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
