import type { NextPage } from 'next'
import { Center, Text, VStack } from "@chakra-ui/react";
import ConnectWallet from "../components/ConnectWallet";
import { useContext, useEffect } from "react";
import { CommonContext } from "../contexts/CommonContext";
import { useRouter } from "next/router";

const Home: NextPage = () => {

  const router = useRouter();
  const { account } = useContext(CommonContext);

  useEffect(() => {
    if (!account) {
      return;
    }

    router.push("/domains");
  }, [account]);

  return (
      <Center>
        <VStack>
          <Text fontSize='2xl'
                paddingX={10}
          >
            Today we have 2M+ ENS names and a few decentralized storage providers that offer a lot of storage for free.
          </Text>
          <Text fontSize='2xl'
                paddingX={10}
          >
            Why not combine these two technologies?
          </Text>
          <Text fontSize='2xl'
                paddingX={10}
          >
            And for example, create your personal NFT gallery that is accessible using your ENS name.
          </Text>
          <Text fontSize='2xl'
                paddingX={10}
          >
            Share it with web2 friends and maybe they also would like to create one :)
          </Text>
          <Text fontSize='5xl'
                bgGradient='linear(to-r, #7928CA, #FF0080)'
                bgClip='text'
                fontWeight='extrabold'
                paddingBottom={5}
          >
            Turn your ENS into your personal NFT gallery.
          </Text>
          {!account && <ConnectWallet />}
        </VStack>
      </Center>
  )
}

export default Home;
