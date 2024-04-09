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

