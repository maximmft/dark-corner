import { gql } from "@apollo/client";

export const GET_AD_CAT = gql`
  query getAdByCategory($categoryName: String!) {
    getAdsByCategory(categoryName: $categoryName) {
    title
    description
    owner
    price
    id
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
