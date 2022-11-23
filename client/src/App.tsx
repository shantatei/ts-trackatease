import { useEffect } from "react";
import socket from "./socket";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import Form from "./components/Form";
import Map from "./components/Map";

function App() {
  useEffect(() => {
    socket;
    
  }, []);

  return (
    <Box>
      <HStack>
        {/* <Form /> */}
        <Map />
      </HStack>
    </Box>
  );
}

export default App;
