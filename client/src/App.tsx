import { useEffect } from "react";
import socket from "./socket";
import { Box, Button, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import Form from "./components/Form";
import GeoMap from "./components/GeoMap";

function App() {
  useEffect(() => {
    socket;
  }, []);

  return (
    <SimpleGrid columns={2}>
      <Form />
      <GeoMap />
    </SimpleGrid>
  );
}

export default App;
