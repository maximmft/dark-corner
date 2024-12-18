import { gql } from "@apollo/client";

export const GET_AD_ID = gql`
  query GetAdById($adId: String!) {
    getAdById(adId: $adId) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        name
        id
      }
      tags {
        name
        id
      }
    }
  }
`;
