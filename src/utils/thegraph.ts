import { gql } from "@apollo/client";

export type GetDomainsResult = {
  domains: Domain[]
}

export type Domain = {
  name: string
  resolver: { address: string }
}


export const GET_DOMAINS_QUERY = gql`
    query getDomainsForAccount($accountId: String!) {
        domains(where: {owner: $accountId} ) {
            name
            resolver {
                address
            }
        }
    }
`;