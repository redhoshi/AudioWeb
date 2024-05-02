//https://github.com/saku-1101/design-patterns-demo/blob/main/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
          <Navbar/>
          <Contact/>
        </ChakraProvider>
    </div>
  );
}

export default App;
