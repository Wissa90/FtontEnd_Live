import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes'; // For color mode management
import theme from './theme/theme'; // Import your custom Chakra theme
import SignIn from './pages/SignIn';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Router>
          <Routes>
            {/* Define your routes here */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<div>404 Page Not Found</div>} /> {/* Fallback route */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
