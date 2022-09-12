import { createContext, useState } from "react";
import { ethers } from "ethers";

export interface Context {
  provider: ethers.providers.Web3Provider | undefined,
  setProvider: (p: ethers.providers.Web3Provider | undefined) => void,
  account: string,
  setAccount: (a: string) => void,
}

export const CommonContext = createContext<Context>({
  provider: undefined,
  setProvider: (p) => {
  },
  account: '',
  setAccount: (a) => {
  },
});

export const CommonContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>();

  return (
    <CommonContext.Provider value={{
      provider,
      setProvider,
      account,
      setAccount
    }}>
      {children}
    </CommonContext.Provider>
  );
};