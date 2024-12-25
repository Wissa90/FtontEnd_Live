'use client';

import { Flex } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

const HSeparator = (props: { variant?: string;[x: string]: any }) => {
  const { theme } = useTheme(); // Access current theme
  const isDarkMode = theme === 'dark'; // Check if the theme is dark

  // Use colors based on the current theme
  const textColor = isDarkMode ? 'whiteAlpha.300' : 'gray.200';

  const { variant, ...rest } = props;
  return <Flex h="1px" w="100%" bg={textColor} {...rest} />;
};

const VSeparator = (props: { variant?: string;[x: string]: any }) => {
  const { theme } = useTheme(); // Access current theme
  const isDarkMode = theme === 'dark'; // Check if the theme is dark

  // Use colors based on the current theme
  const textColor = isDarkMode ? 'whiteAlpha.300' : 'gray.200';

  const { variant, ...rest } = props;
  return <Flex w="1px" bg={textColor} {...rest} />;
};

export { HSeparator, VSeparator };
