import type { NextPage } from 'next'
import { Box, Button, Center, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NftImage from "../../components/NftImage";
import { createHtml } from "../../utils/html";
import { uploadHtml } from "../../utils/ipfsTools";
import { CommonContext } from "../../contexts/CommonContext";

type NFTData = {
  name: string,
  imageUrl: string,
}

type NFTResponseData = {
  name: string,
  imageUrl?: string
};

const getNfts = async (address: string) => {
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
    .filter((asset: NFTResponseData) => asset.imageUrl)
    .map((asset: NFTResponseData) => {
      return {
        name: asset.name,
        imageUrl: asset.imageUrl || ""
      } as NFTData;
    })
}


const CreateGallery: NextPage = () => {

  const router = useRouter();
  const selectedName = router.query.id;

  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [selectedNfts, setSelectedNfts] = useState<NFTData[]>([]);
  const { setContentHash } = useContext(CommonContext)

  useEffect(() => {
    getNfts("0x91b51c173a4bdaa1a60e234fc3f705a16d228740")
      .then(data => setNftData(data));
  });

  const onNftSelect = (nft: NFTData) => {
    setSelectedNfts([...selectedNfts, nft]);
  }

  const createMyGallery = async () => {
    const ensName = selectedName as string;
    const cid = await uploadHtml(createHtml(ensName, selectedNfts));
    console.log("uploaded", cid);
    await setContentHash("0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329", ensName, "ipfs://" + cid);
  }

  return (
    <Box width="100vw">
      <Grid templateColumns="repeat(4, 1fr)" gap={9} px={40} py={10} mx={0}>
        {
          nftData.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftSelect(nft)} />
              </GridItem>
            )
          })
        }
      </Grid>
      <Box width="100%" paddingY={5} onClick={createMyGallery}>
        <Center>
          <Button>Create</Button>
        </Center>
      </Box>
    </Box>
  )
}

export default CreateGallery;
