import { gql } from "@apollo/client";

export const GET_AD_NAME = gql`
  query GetAdsByName($needle: String!) {
    getAdsByName(needle: $needle) {
      id
      title
    }
  }
`;


