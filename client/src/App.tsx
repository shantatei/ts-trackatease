import { useEffect } from "react";
import socket from "./socket";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import Form from "./components/Form";

function App() {
  useEffect(() => {
    socket;
  }, []);

  return (
    <Box>
      <Form />
    </Box>
  );
}

export default App;
