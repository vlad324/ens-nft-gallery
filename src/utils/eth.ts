import { ethers } from "ethers";
import { GOERLI_CHAIN_ID } from "./constants";

type ChainData = {
  chainName: string,
  rpcUrl: string,
  blockExplorerUrl: string,
  nativeCurrency: string,
  nativeCurrencyDecimals: number
}

const chains = new Map<number, ChainData>([
  [GOERLI_CHAIN_ID, {
    chainName: 'Goerli Test Network',
    rpcUrl: 'https://goerli.infura.io/v3/',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    nativeCurrency: 'GoerliETH',
    nativeCurrencyDecimals: 18,
  }]
]);

export const switchNetwork = async (provider: ethers.providers.Web3Provider, networkId: number) => {
  if (!provider.provider.request) {
    return
  }

  const chainId = '0x' + networkId.toString(16);
  try {
    await provider.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }]
    });
  } catch (error: any) {
    const chainData = chains.get(networkId);
    if (error.code === 4902 && chainData) {
      await provider.provider.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: chainId,
          chainName: chainData.chainName,
          rpcUrls: [chainData.rpcUrl],
          blockExplorerUrls: [chainData.blockExplorerUrl],
          nativeCurrency: {
            symbol: chainData.nativeCurrency,
            decimals: chainData.nativeCurrencyDecimals
          }
        }]
      });
    }
    throw error;
  }
}