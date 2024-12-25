'use client';
// Chakra Imports
import { Button, Icon } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
// Custom Icons
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
// Utils
import { isWindowAvailable } from '../../utils/navigation';


export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props;

  const { theme, setTheme } = useTheme();
  const isLightMode = theme === 'light';
  const bgButton = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';

  const toggleColorMode = () => {
    setTheme(isLightMode ? 'dark' : 'light');
  };

  return (
    <Button
      {...rest}
      h="60px"
      w="60px"
      bg={bgButton}
      zIndex="99"
      position="fixed"
      variant="no-effects"
      left={
        isWindowAvailable() && document.documentElement.dir === 'rtl'
          ? '35px'
          : ''
      }
      right={
        isWindowAvailable() && document.documentElement.dir === 'rtl'
          ? ''
          : '35px'
      }
      bottom="30px"
      border="1px solid"
      borderColor="#6A53FF"
      borderRadius="50px"
      onClick={toggleColorMode}
      display="flex"
      p="0px"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        h="24px"
        w="24px"
        color="white"
        as={isLightMode ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
