import { gql } from "@apollo/client";

export const PATCH_AD = gql`
 mutation patchAd($data: AdUpdateInput!, $adId: String!) {
  patchAd(data: $data, adId: $adId) {
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
      name
      id
    }
  }
}
`;
