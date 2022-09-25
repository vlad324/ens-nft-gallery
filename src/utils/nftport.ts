import { NFTData } from "./nft";

type NFTSResponse = {
  contract_address: string,
  token_id: string
}

export const getNFTPortData = async (address: string, chain: string) => {
  const json = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}`, {
    method: 'GET',
    headers: {
      "Authorization": "6fbb3dd5-fff6-45da-b611-099f0b91113c",
      "Content-Type": "application/json"
    }
  }).then(response => response.json());

  const result = [];
  const nfts = (json.nfts || []) as NFTSResponse[];
  for (const nft of nfts) {
    try {
      result.push(await getNFTDetails(nft.contract_address, nft.token_id, chain));
    } catch (e) {
      console.log(e);
    }
  }

  return result;
}

const getNFTDetails = async (contractAddress: string, tokenId: string, chain: string) => {
  const json = await fetch(`https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}?chain=${chain}`, {
    method: 'GET',
    headers: {
      "Authorization": "6fbb3dd5-fff6-45da-b611-099f0b91113c",
      "Content-Type": "application/json"
    }
  }).then(response => response.json());

  return {
    name: json.nft.metadata.name,
    contractAddress: contractAddress,
    tokenId: tokenId,
    imageUrl: json.nft.metadata.image
  } as NFTData;
}