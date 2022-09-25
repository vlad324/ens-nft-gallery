import { NFTData } from "./nft";
import { formatIpfsUrl } from "./ipfsTools";

const API_KEY = "ckey_5c86efc78a4c45d5b7a46805e4b";

export const getCovalentData = async (address: string, chainId: string) => {
  const json = await fetch(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?format=JSON&nft=true&no-nft-fetch=false&key=${API_KEY}`,)
    .then(response => response.json());

  return json.data.items
    .filter((item: any) => item.type === "nft")
    .flatMap((item: any) => {
      debugger
      return item.nft_data
        .filter((data: any) => data.external_data && data.external_data.image)
        .map((data: any) => {
          return {
            name: data.external_data.name,
            contractAddress: item.contract_address,
            tokenId: data.token_id,
            imageUrl: formatIpfsUrl(data.external_data.image)
          } as NFTData;
        })
    });
}