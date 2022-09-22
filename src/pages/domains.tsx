import type { NextPage } from 'next'
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CommonContext } from "../contexts/CommonContext";
import RegisterNewDomain from "../components/RegisterNewDomain";
import { Domain as DomainEntity, GET_DOMAINS_QUERY, GetDomainsResult } from "../utils/thegraph";
import { useQuery } from "@apollo/client";
import Domain from "../components/Domain";

const Domains: NextPage = () => {

  const [selectedDomain, setSelectedDomain] = useState<DomainEntity | undefined>();
  const { account } = useContext(CommonContext);
  const { loading, data, error } = useQuery(GET_DOMAINS_QUERY, {
    variables: {
      accountId: account.toLowerCase()
    },
  });
  const { createSubdomain } = useContext(CommonContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createGallerySubdomain = async (name: string, resolver: string) => {
    await createSubdomain(name, 'gallery', resolver);
  }

  const onNameSelect = (domain: DomainEntity) => {
    setSelectedDomain(domain);
    onOpen();
  }

  return (
    <>
      <Center>
        <Box width="100vw">
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
            <GridItem width="100%" zIndex={1}>
              <RegisterNewDomain />
            </GridItem>
          </Grid>
        </Box>
      </Center>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Create gallery.${selectedDomain?.name} sub-domain?`}</ModalHeader>
          <ModalFooter justifyContent={"center"}>
            <Button width="50%"
                    onClick={() => createGallerySubdomain(selectedDomain!.name, selectedDomain!.resolver.address)}>Create</Button>
            <Button width="50%" onClick={() => console.log('proceed')} marginX={3}>Proceed with selected</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Domains;
