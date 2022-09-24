import { Box, Container, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  name: string,
  imageUrl: string,
  onClick: () => void
};

const NftImage = (prop: Props) => {

  const [selected, setSelected] = useState(false);

  const select = () => {
    setSelected(!selected);
    prop.onClick();
  }

  return (
    <Box borderRadius="16px" borderColor={selected ? "#00661d" : "#e2e8f0"} height="100%"
         borderWidth={selected ? "2px" : "1px"}
         onClick={select}>
      <VStack alignItems="flex-start" height="100%">
        <Box width="100%">
          <Image src={prop.imageUrl} width="100%" borderRadius="16px 16px 0 0" />
        </Box>
        <Spacer />
        <Container p={5}>
          <Text fontSize="xl" fontWeight={600}>
            {prop.name}
          </Text>
        </Container>
      </VStack>
    </Box>
  );
}
export default NftImage;