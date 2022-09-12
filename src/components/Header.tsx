import { Box, Center, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { CommonContext } from "../contexts/CommonContext";
import Image from "next/image";
import DisconnectWallet from "./DisconnectWallet";

const Header = () => {

  const router = useRouter();
  const { account } = useContext(CommonContext);

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="10%"
        py="20px"
      >
        <Center>
          <Link onClick={() => router.push("/")}>
            <Image alt={"logo"} src={"logo.svg"} height={50} width={50} />
          </Link>
        </Center>
        <Center textAlign="right">
          {account ? <Center paddingRight={'5px'}>{account}</Center> : ''}
          {account && <DisconnectWallet />}
        </Center>
      </Box>
    </>
  );
}

export default Header;