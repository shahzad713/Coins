import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        p={"8"}
        m={"4"}
        shadow={"lg"}
        borderRadius={"lg"}
        bgColor={"whiteAlpha.900"}
        transition={"all 0.3s"}
        css={{ "&:hover": { transform: "scale(1.1)" } }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}
        </Heading>
        <Text noOfLines={"1"}> {name} </Text>
      </VStack>
    </a>
  );
};

export default ExchangeCard;
