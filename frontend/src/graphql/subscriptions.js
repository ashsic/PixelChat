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

// export const MESSAGE_SENT = gql`
//   subscription Subscription {
//   messageSent(id: "662ac877cff998a5b2f1f2e9") {
//     text
//     sender
//     timestamp
//   }
// }
// `;


// export const USER_CHATS = gql`
//   query UserChats($ids: [ID!]!) {
//     userChats(ids: $ids) {
//       _id
//       name
//       participants
//       messages {
//         text
//         sender
//         timestamp
//       }
//     }
//   }
// `;
