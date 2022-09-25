import { createContext, useMemo, useState } from "react";
import { ethers } from "ethers";
import { encodeContenthash, labelhash, namehash } from "@ensdomains/ui";
import { ENS_CONTRACT_ADDRESS } from "../utils/constants";

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider | undefined) => void,
  account: string,
  setAccount: (a: string) => void,
  createSubdomain: (name: string, subdomainName: string, resolver: string) => void,
  setContentHash: (resolver: string, name: string, content: string) => void
}

export const CommonContext = createContext<Context>({
  provider: undefined,
  setProvider: () => {
  },
  account: '',
  setAccount: () => {
  },
  createSubdomain: () => {
  },
  setContentHash: () => {
  }
});

export const CommonContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>();

  const ensContract = useMemo(() => {
    if (!provider) {
      return;
    }

    const abi = [
      "function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl) external"
    ];
    return new ethers.Contract(ENS_CONTRACT_ADDRESS, abi, provider.getSigner());
  }, [provider]);

  const createSubdomain = async (name: string, label: string, resolver: string) => {
    const encodedName = namehash(name);
    const encodedLabel = labelhash(label);
    const transaction = await ensContract!.setSubnodeRecord(encodedName, encodedLabel, account!, resolver, 0);
    await transaction.wait(1);
  };

  const setContentHash = async (resolver: string, name: string, content: string) => {
    if (!provider) {
      return;
    }

    const contentHash = encodeContenthash(content);
    if (contentHash.error) {
      throw new Error(contentHash.error);
    }

    const abi = [
      "function setContenthash(bytes32 node, bytes calldata hash) external"
    ];
    const resolverContract = new ethers.Contract(resolver, abi, provider.getSigner());
    const encodedName = namehash(name);
    const transaction = await resolverContract.setContenthash(encodedName, contentHash.encoded);
    await transaction.wait(1);
  }

  return (
    <CommonContext.Provider value={{
      provider,
      setProvider,
      account,
      setAccount,
      createSubdomain,
      setContentHash
    }}>
      {children}
    </CommonContext.Provider>
  );
};