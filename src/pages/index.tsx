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
          <Text fontSize='5xl'
                bgGradient='linear(to-r, #7928CA, #FF0080)'
                bgClip='text'
                fontWeight='extrabold'
          >
            Turn your ENS into your personal NFT gallery.
          </Text>

          <Text fontSize='2xl'
                paddingX={10}
                paddingBottom={5}
          >
            Some text about 2M+ ENS names that mostly no used by people
          </Text>
          {!account && <ConnectWallet />}
        </VStack>
      </Center>
  )
}

export default Home;
