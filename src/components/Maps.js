import React from 'react'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Map from "./Map"

const Maps = () => {
  return (
    <ChakraProvider theme={theme}>
      <Map />
    </ChakraProvider>
  );
}

export default Maps
