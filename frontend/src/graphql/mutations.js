import { gql } from "@apollo/client";

//Auth
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const SIGNUP = gql`
mutation SignUp($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!){
  signUp(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
    _id
  }
}
`;

//Chat

export const CREATE_CHAT = gql`
  mutation CreateChat($participants: [String!]!, $name: String!) {
    createChat(participants: $participants, name: $name) {
      _id
      participants
      name
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chat: String!, $sender: String!, $text: String!) {
    sendMessage(chat: $chat, sender: $sender, text: $text) {
      _id
      name
      messages {
        sender
        text
        likes
        timestamp
      }
    }
  }
`;
