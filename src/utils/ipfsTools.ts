import { File, NFTStorage } from "nft.storage"

const nftStorage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiZTgyRjFlODM3RjMwMmZCOTVjNDRCQTYwQkMxRGNlZUM5NDIxNDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDEwMzQwNTg4OSwibmFtZSI6Ik5GVCBnYWxsZXJ5In0.8e6lC_2VejkkCjTtV3HqSzAjQySqt9K2nMmPRbTaZig" });

export const uploadHtml = (data: string) => {
  const type = "text/html";
  const fileEntity = new File([data], "/", { type });

  return nftStorage.storeBlob(fileEntity);
}

export const formatIpfsUrl = (url: string) => {
  if (url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  if (url.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + url.substring(7);
  }

  return "https://ipfs.io/ipfs/" + url;
}
