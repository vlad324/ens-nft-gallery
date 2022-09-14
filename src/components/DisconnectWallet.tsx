import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CommonContext } from "../contexts/CommonContext";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";

const DisconnectWallet = () => {

  const router = useRouter();
  const { setProvider, setAccount } = useContext(CommonContext);

  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();

  useEffect(() => {
    if (!window) {
      return;
    }

    const web3Modal = new Web3Modal();
    setWeb3Modal(web3Modal);
  }, []);

  const disconnectWallet = async () => {
    if (!web3Modal) {
      console.log("no Web3Modal");
      return;
    }

    await web3Modal.clearCachedProvider();
    setProvider(undefined);
    setAccount('');
    await router.push('/');
  }

  return (
    <Button className={"connect-button"}
            background={'white'}
            onClick={disconnectWallet}
            textAlign="center"
    >
      Disconnect wallet
    </Button>
  );
}

export default DisconnectWallet;