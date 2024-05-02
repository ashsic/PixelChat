import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription Subscription($id: ID!) {
    messageSent(id: $id) {
      text
      sender
      timestamp
    }
  }
`;

export const CHAT_CREATED = gql`
  subscription Subscription($id: ID!) {
    chatCreated(id: $id) {
      _id
    }
  }
`;
