import { Box, Spinner, HStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <HStack h="90vh" justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"lg"} />
        <p> Loading....</p>
      </Box>
    </HStack>
  );
};

export default Loader;
