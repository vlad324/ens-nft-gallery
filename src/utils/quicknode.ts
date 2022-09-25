import { NFTData } from "./nft";

type AssetResponse = {
  name: string,
  collectionTokenId: string,
  collectionAddress: string,
  imageUrl?: string
}
export const getMainnetNfts = async (address: string) => {
  const json = await fetch("https://responsive-twilight-asphalt.discover.quiknode.pro/b86b71d47532ac9455a8e00394d3acb9a73cbbcc/", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "id": 67,
      "jsonrpc": "2.0",
      "method": "qn_fetchNFTs",
      "params": {
        "wallet": address,
        "omitFields": [
          "traits",
          "provenance"
        ],
        "perPage": 100
      }
    })
  }).then(response => response.json());

  return json.result.assets
    .filter((asset: AssetResponse) => asset.imageUrl)
    .map((asset: AssetResponse) => {
      return {
        name: asset.name,
        contractAddress: asset.collectionAddress,
        tokenId: asset.collectionTokenId,
        imageUrl: asset.imageUrl,
      } as NFTData;
    });
}