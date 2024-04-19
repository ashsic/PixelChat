import { gql } from "@apollo/client";

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
