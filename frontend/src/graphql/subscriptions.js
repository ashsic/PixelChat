import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription MessageSent($id: String!) {
    messageSent(id: $id) {
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
