import { gql } from "@apollo/client";

export const VERIFY_JWT = gql`
  query {
    verifyJwt{
      _id
      username
      firstName
      lastName
      dob
      bio
      picture
      chats
      posts
      followers
      following
    }
  }
`;
