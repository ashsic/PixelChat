

export default function Home() {
  const endpoint = "http://localhost:3000/graphql";
  const query = `
  query {
    users {
      username
      email
    }
  }
  `;

  const fetchTest = async () => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Additional headers if needed
      },
      body: JSON.stringify({ query }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data.users);
        return data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <div>
      <h1 onClick={fetchTest}>Home Test</h1>
      <div>
        {/* {fetchTest.map((user) => {
          return (
            <p>{user}</p>
          );
        })} */}
      </div>
    </div>
  );
};
