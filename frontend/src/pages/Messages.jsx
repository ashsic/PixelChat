

export default function Messages() {

  // Fetch chats/messages

  // sample chats
  function generateRandomTimestamp() {
    const now = new Date();
    const randomOffset = Math.floor(Math.random() * 7); // Random number between 0 and 6 (inclusive)
    const timestamp = new Date(now - randomOffset  * 60  * 60 * 1000); // Subtract days
    return timestamp.toISOString(); // Convert to ISO format
  }
  const conversations = [
    {
      members: ["Alice", "Bob"],
      messages: [
        { sender: "Alice", text: "Hi Bob!", timestamp: generateRandomTimestamp() },
        { sender: "Bob", text: "Hey Alice!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      members: ["Charlie", "David"],
      messages: [
        { sender: "Charlie", text: "Hey David!", timestamp: generateRandomTimestamp() },
        { sender: "David", text: "Hi Charlie!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      members: ["Eve", "Frank"],
      messages: [
        { sender: "Eve", text: "Hello Frank!", timestamp: generateRandomTimestamp() },
        { sender: "Frank", text: "Hi Eve!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      members: ["Grace", "Harry"],
      messages: [
        { sender: "Grace", text: "Good morning Harry!", timestamp: generateRandomTimestamp() },
        { sender: "Harry", text: "Morning Grace!", timestamp: generateRandomTimestamp() }
      ]
    },
    {
      members: ["Ivy", "Jack"],
      messages: [
        { sender: "Ivy", text: "Hey Jack, how are you?", timestamp: generateRandomTimestamp() },
        { sender: "Jack", text: "I'm good, thanks!", timestamp: generateRandomTimestamp() }
      ]
    }
  ];

  const timeSinceParser = (timestamp) => {
    const pastTime = new Date(timestamp);
    const now = new Date();
    const timeDiff = now - pastTime;

    if (timeDiff >= 86400000) {
      return Math.ceil(timeDiff / (86400000)) + "d";
    } else if (timeDiff >= 3600000) {
      return Math.ceil(timeDiff / (3600000))+ "h";
    } else {
      return Math.ceil(timeDiff + 1 / 60000) + "m";
    }
  };

  return (
    <div className="flex flex-1 w-full">
      <div className="w-96 max-h-screen">
        <h1 className="text-2xl p-3 absolute">Messages</h1>
        <ul className="overflow-auto h-full">
          <div className="h-14"></div>
          {conversations.map((conv) => {
            let multi = [(
              <li className="flex w-full items-center">
                <img
                src="Default_pfp.svg.png"
                alt="profile pic"
                className="w-14 h-14 m-2 rounded-full">
                </img>
                <div className="w-full">
                  <h4 className="mb-1">{conv.members[0]}</h4>
                  <div className="flex text-xs w-full">
                    <p className="">{conv.members[0] + ": " + conv.messages[0].text}</p>
                    <time className="pl-6">{timeSinceParser(conv.messages[0].timestamp)}</time>
                  </div>
                </div>
              </li>
            )];
            for (let i = 0; i < 3; i++) {
              multi = multi.concat(multi)
            };
            return multi;
          })}
        </ul>
      </div>
      <div className="flex flex-1">
          <p>test</p>
      </div>
    </div>
  );
};
