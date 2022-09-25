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
import { toast } from "react-toastify";
import { getCovalentData } from "../../utils/covalent";
import { getNFTPortData } from '../../utils/nftport';
import "react-toastify/dist/ReactToastify.css";

const CreateGallery: NextPage = () => {

  const router = useRouter();
  const selectedName = router.query.id;

  const [creationInProgress, setCreationInProgress] = useState<boolean>(false);
  const [mainnetNfts, setMainnetNfts] = useState<NFTData[]>([]);
  const [polygonNfts, setPolygonNfts] = useState<NFTData[]>([]);
  const [bscNfts, setBscNfts] = useState<NFTData[]>([]);
  const [selectedNfts, setSelectedNfts] = useState<NFTData[]>([]);
  const { account, setContentHash } = useContext(CommonContext);

  useEffect(() => {
    if (!account) {
      return;
    }

    getMainnetNfts(account)
      .then(data => setMainnetNfts(data));

    getNFTPortData(account, "polygon")
      .then(data => setPolygonNfts(data));

    getCovalentData(account, "56")
      .then(data => setBscNfts(data));
  }, [account]);

  const onNftClick = (nft: NFTData) => {
    const index = selectedNfts.indexOf(nft);
    if (index === -1) {
      setSelectedNfts([...selectedNfts, nft]);
    } else {
      selectedNfts.splice(index, 1);
      setSelectedNfts(selectedNfts);
    }
  }

  const createMyGallery = async () => {
    setCreationInProgress(true);
    await toast.promise(async () => {
      const ensName = selectedName as string;
      const cid = await uploadHtml(createHtml(ensName, selectedNfts));
      console.log("uploaded", cid);
      await setContentHash("0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329", ensName, "ipfs://" + cid);
    }, {
      pending: 'Transaction is in progress',
      success: 'Gallery successfully created',
      error: 'Transaction failed'
    }).finally(() => setCreationInProgress(false));
  }

  return (
    <Box width="100vw">
      <Grid templateColumns="repeat(4, 1fr)" gap={9} px={40} py={10} mx={0}>
        {
          mainnetNfts.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftClick(nft)} />
              </GridItem>
            )
          })
        }
        {
          polygonNfts.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftClick(nft)} />
              </GridItem>
            )
          })
        }
        {
          bscNfts.map((nft, index) => {
            return (
              <GridItem width="100%" key={index} zIndex={1}>
                <NftImage name={nft.name} imageUrl={nft.imageUrl} onClick={() => onNftClick(nft)} />
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
            isLoading={creationInProgress}
            isDisabled={creationInProgress}
          >
            Create
          </Button>
        </Center>
      </Box>
    </Box>
  )
}

export default CreateGallery;
