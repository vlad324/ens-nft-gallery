import type { NextPage } from 'next'
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CommonContext } from "../contexts/CommonContext";
import { Domain as DomainEntity, GET_DOMAINS_QUERY, GetDomainsResult } from "../utils/thegraph";
import { useQuery } from "@apollo/client";
import Domain from "../components/Domain";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Domains: NextPage = () => {

  const [selectedDomain, setSelectedDomain] = useState<DomainEntity | undefined>();
  const [creationInProgress, setCreationInProgress] = useState<boolean>(false);
  const { account } = useContext(CommonContext);
  const { data } = useQuery(GET_DOMAINS_QUERY, {
    variables: {
      accountId: account.toLowerCase()
    },
  });
  const { createSubdomain } = useContext(CommonContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const createGallerySubdomain = async (name: string, resolver: string) => {
    setCreationInProgress(true);
    await toast.promise(async () => {
      await createSubdomain(name, "gallery", resolver);
      await router.push(`/name/gallery.${name}`);
    }, {
      pending: 'Transaction is in progress',
      success: 'Subdomain successfully created',
      error: 'Transaction failed'
    }).finally(() => setCreationInProgress(false));
  }

  const onNameSelect = async (domain: DomainEntity) => {
    setSelectedDomain(domain);
    if (domain.name.startsWith("gallery.")) {
      await router.push(`/name/${domain.name}`);
    } else {
      onOpen();
    }
  }

  return (
    <>
      <Center>
        <Box width="100vw">
          <Center>
            <Text
              fontSize='2xl'
              fontWeight='bold'
            >
              Select ENS that you would like to turn into gallery
            </Text>
          </Center>
          <Grid templateColumns="repeat(4, 1fr)" gap={9} px={40} py={10} mx={0}>
            {
              data && (data as GetDomainsResult).domains.map(domain => {
                return (
                  <GridItem width="100%" key={domain.name} zIndex={1}>
                    <Domain name={domain.name} onClick={() => onNameSelect(domain)} />
                  </GridItem>
                )
              })
            }
          </Grid>
          <Center>
            <Text
              fontSize='2xl'
              fontWeight='bold'
            >
              Or register a new one via{' '}
              <Link
                href='https://app.ens.domains/'
                color='blue.700'
                isExternal
              >
                ENS app
              </Link>
            </Text>
          </Center>
        </Box>
      </Center>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create <Text as="b">gallery.{selectedDomain?.name}</Text> sub-domain?</ModalHeader>
          <ModalFooter justifyContent={"center"}>
            <Button
              className="custom-button"
              background="white"
              width="50%"
              isDisabled={creationInProgress}
              isLoading={creationInProgress}
              onClick={() => createGallerySubdomain(selectedDomain!.name, selectedDomain!.resolver.address)}
            >
              Create
            </Button>
            <Button
              className="custom-button"
              background="white"
              width="50%"
              isDisabled={creationInProgress}
              onClick={() => router.push(`/name/${selectedDomain!.name}`)} marginX={3}
            >
              Proceed with selected
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Domains;
