'use client';
/* eslint-disable */

import { Flex, List, ListItem, Link } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

export default function Footer() {
  const { theme } = useTheme(); // Access the current theme (light or dark)
  const isDarkMode = theme === 'dark'; // Check if the theme is dark
  const textColor = isDarkMode ? 'white' : 'gray.500'; // Determine text color based on theme

  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: '30px', md: '0px' }}
      pb="30px"
    >
      <List display="flex">
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Terms-Conditions-6e79229d25ed48f48a481962bc6de3ee"
          >
            Terms & Conditions
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Privacy-Policy-8addde50aa8e408ca5c5f5811c38f971"
          >
            Privacy Policy
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/End-User-License-Agreement-8fb09441ea8c4c08b60c37996195a6d5"
          >
            License
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Refund-Policy-5d5fa25f7fac4978a0be6fcf3036c6ee"
          >
            Refund Policy
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
