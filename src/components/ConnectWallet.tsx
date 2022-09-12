import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CommonContext } from "../contexts/CommonContext";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { GOERLI_CHAIN_ID } from "../utils/constants";
import { switchNetwork } from "../utils/eth";

const ConnectWallet = () => {

  const { setProvider, setAccount } = useContext(CommonContext);

  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();

  useEffect(() => {
    if (!window) {
      return;
    }

    const web3Modal = new Web3Modal();
    setWeb3Modal(web3Modal);
  }, []);

  const connectWallet = async () => {
    if (!web3Modal) {
      console.log("no Web3Modal");
      return;

    }
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const network = await provider.getNetwork();
    if (network.chainId != GOERLI_CHAIN_ID) {
      await switchNetwork(provider, GOERLI_CHAIN_ID);
    }

    setProvider(new ethers.providers.Web3Provider(instance));

    const [account] = await provider.listAccounts();
    setAccount(account);
  }
  const disconnectWallet = async () => {
    if (!web3Modal) {
      console.log("no Web3Modal");
      return;
    }

    await web3Modal.clearCachedProvider();
    setProvider(undefined);
    setAccount('');
  }

  return (
    <Button className={"connect-button"}
            background={'white'}
            onClick={connectWallet}
            textAlign="center"
    >
      Connect wallet
    </Button>
  );
}

export default ConnectWallet;