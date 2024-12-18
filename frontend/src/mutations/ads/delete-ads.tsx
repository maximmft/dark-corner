import { gql } from "@apollo/client";

export const DELETE_AD = gql`
  mutation DeleteAd($adId: String!) {
    deleteAd(adId: $adId)
  }
`;

