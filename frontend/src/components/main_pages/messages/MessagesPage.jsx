import { Link, useParams } from "react-router-dom";
import Conversation from "./Conversation";
import Message from "./Message";
import ConversationModal from "./ConversationModal";

import { useQuery, gql } from '@apollo/client';

// Fetch chats/messages
// const GET_USERS = gql`
//   query {
//     user(id:) {
//       chats
//     }
//   }
// `;

// const GET_CHATS = gql`
//   query {
//     userChats(ids:) {
//       chats
//     }
//   }
// `;

// function DisplayLocations() {
//   const { loading, error, data } = useQuery(GET_USERS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   return data.users.map(({ username, email }, i) => (
//     <div key={i}>
//       <h3>{username}</h3>
//       <br />
//       <b>About this user:</b>
//       <p>{email}</p>
//       <br />
//     </div>
//   ));
// }

  // sample chats
  function generateRandomTimestamp() {
    const now = new Date();
    const randomOffset = Math.floor(Math.random() * 7); // Random number between 0 and 6 (inclusive)
    const timestamp = new Date(now - randomOffset  * 60  * 60 * 1000); // Subtract days
    return timestamp.toISOString(); // Convert to ISO format
  }
  const conversations = [
    {
      id: 0,
      members: ["Alice", "Bob"],
      messages: [
        { sender: "Alice", text: "Nice weather today!", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Have you seen this movie?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I have a question.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "How are you?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "Let's grab a coffee.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Let's meet tomorrow.", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm excited htmlFor the weekend.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "What's up?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm fine, thank you.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Did you watch the game?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "Nice weather today!", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Have you seen this movie?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I have a question.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "How are you?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "Let's grab a coffee.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Let's meet tomorrow.", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm excited htmlFor the weekend.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "What's up?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm fine, thank you.", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "Nice weather today!", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Have you seen this movie?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I have a question.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "How are you?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "Let's grab a coffee.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Let's meet tomorrow.", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm excited htmlFor the weekend.", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "What's up?", timestamp: generateRandomTimestamp() },
        { sender: "Alice", text: "I'm fine, thank you.", timestamp: generateRandomTimestamp() },
      ]
    },
    {
      id: 1,
      members: ["Charlie", "David"],
      messages: [
        { sender: "Charlie", text: "Hey David!", timestamp: generateRandomTimestamp() },
        { sender: "David", text: "Hi Charlie!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      id: 2,
      members: ["Eve", "Frank"],
      messages: [
        { sender: "Eve", text: "Hello Frank!", timestamp: generateRandomTimestamp() },
        { sender: "Frank", text: "Hi Eve!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      id: 3,
      members: ["Grace", "Harry"],
      messages: [
        { sender: "Grace", text: "Good morning Harry!", timestamp: generateRandomTimestamp() },
        { sender: "Harry", text: "Morning Grace!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      id: 4,
      members: ["Ivy", "Jack"],
      messages: [
        { sender: "Ivy", text: "Hey Jack, how are you?", timestamp: generateRandomTimestamp() },
        { sender: "Jack", text: "I'm good, thanks!", timestamp: generateRandomTimestamp() }
      ]
    }
  ];



export default function Messages() {
  const { chatid } = useParams();




  // Modal functions

  window.onclick = (event) => {
    const modal = document.querySelector("#conversationModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

  const createChat = () => {
    const modal = document.querySelector("#conversationModal");
    modal.style.display = "flex";
  }

  return (
    <div className="flex flex-1 w-full">

      <div className="max-h-full min-h-screen w-96 pr-0.5">
        <div className="w-96 max-h-screen fixed flex flex-col">
          <h1 className="text-2xl p-3 absolute mt-2.5">Messages</h1>
          <div className="min-h-16 flex flex-row-reverse">
            <button className="mt-4 mr-5 h-11 rounded-md hover:bg-slate-200 active:bg-slate-300"
            onClick={createChat}>
              <i className="material-icons px-2 text-3xl">
                create
              </i>
            </button>
          </div>
          <ul className="overflow-y-auto flex-shrink">
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
            {conversations.map((conv) => {
              return (
                <Conversation key={conv.id} conv={conv} />
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 border-gray-500 border-l scroll-smooth overflow-auto">
        <p>{chatid ?? "Select a conversation!"}</p>
        {chatid && <ul className="flex flex-col-reverse overflow-auto">
          {conversations[chatid].messages.toReversed().map((message, i) => {
            return (
              <Message key={i} message={message} />
            );
          })}
        </ul>}
      </div>

      <ConversationModal />

    </div>
  );
};
