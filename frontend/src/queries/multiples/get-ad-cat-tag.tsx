import { gql } from "@apollo/client";

export const GET_AD_CAT_TAG = gql`
query GetAdCatTag($adId: String!) {
  getAdById(adId: $adId) {
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
  getCategories {
    id
    name
  }
  getTags {
    id
    name
  }
}
`;

