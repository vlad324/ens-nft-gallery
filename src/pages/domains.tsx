import type { NextPage } from 'next'
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { CommonContext } from "../contexts/CommonContext";
import { GET_DOMAINS_QUERY, GetDomainsResult } from "../utils/thegraph";
import { useQuery } from "@apollo/client";
import Domain from "../components/Domain";
import RegisterNewDomain from "../components/RegisterNewDomain";

const Domains: NextPage = () => {

  const { account } = useContext(CommonContext);
  const { loading, data, error } = useQuery(GET_DOMAINS_QUERY, {
    variables: {
      accountId: account.toLowerCase()
    },
  });

  return (
    <>
      <Center>
        <Box width="100vw">
          <Grid templateColumns="repeat(4, 1fr)" gap={9} px={40} py={10} mx={0}>
            {
              data && (data as GetDomainsResult).domains.map(domain => {
                return (
                  <GridItem width="100%" key={domain.name} zIndex={1}>
                    <Domain name={domain.name} />
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
    </>
  )
}

export default Domains;
