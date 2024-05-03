import { gql } from "@apollo/client";

export const VERIFY_JWT = gql`
  query {
    verifyJwt {
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

export const USER_CHATS = gql`
  query UserChats($id: ID!) {
    userChats(id: $id) {
      _id
      name
      participants
      messages {
        text
        sender
        timestamp
      }
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      poster
      text
      likes
    }
  }
`;
