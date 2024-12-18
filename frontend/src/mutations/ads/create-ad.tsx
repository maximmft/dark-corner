import { gql } from "@apollo/client";

export const CREATE_AD = gql`
 mutation createAd($data: AdInput!) {
  createAd(data: $data) {
    id
    title
    description
    owner
    price
    picture
    location
    createdAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`;
