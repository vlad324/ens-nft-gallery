import type { NextPage } from 'next'
import { Box, Button, Center, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NftImage from "../../components/NftImage";
import { createHtml } from "../../utils/html";
import { uploadHtml } from "../../utils/ipfsTools";
import { CommonContext } from "../../contexts/CommonContext";
import { getMainnetNfts } from "../../utils/quicknode";
import { NFTData } from "../../utils/nft";
import { getNFTPortData } from "../../utils/nftport";

const CreateGallery: NextPage = () => {

  const router = useRouter();
  const selectedName = router.query.id;

  const [mainnetNfts, setMainnetNfts] = useState<NFTData[]>([]);
  const [polygonNfts, setPolygonNfts] = useState<NFTData[]>([]);
  const [selectedNfts, setSelectedNfts] = useState<NFTData[]>([]);
  const { account, setContentHash } = useContext(CommonContext);

  useEffect(() => {
    if (!account) {
      return;
    }

    // 0x94Ec09f4bd183Be53DF90CE7239150963B081B09
    getMainnetNfts(account)
      .then(data => setMainnetNfts(data));

    getNFTPortData(account, "polygon")
      .then(data => setPolygonNfts(data));
  }, [account]);

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
          mainnetNfts.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftSelect(nft)} />
              </GridItem>
            )
          })
        }
        {
          polygonNfts.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftSelect(nft)} />
              </GridItem>
            )
          })
        }
      </Grid>
      <Box width="100%" paddingY={5}>
        <Center>
          <Button
            className={"custom-button"}
            background={"white"}
            onClick={createMyGallery}
          >
            Create
          </Button>
        </Center>
      </Box>
    </Box>
  )
}

export default CreateGallery;
