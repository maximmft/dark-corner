import { gql } from "@apollo/client";

export const GET_ADS = gql`
query GetAds {
  getAds {
    id
    title
    description
    owner
    price
    picture
    location
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}`