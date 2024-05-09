# ig-clone
Testing my skills by making a full stack instagram clone with MERN/GraphQL.

/app contains the backend API, written in Node.js with GraphQL.
Express and Apollo Server are used for the backend routes
BCrypt and JSONWebToken are used for hashing passwords and authentication.
Mongoose is used to connect to the MongoDB database, hosted on MongoDB Atlas.
/app contains .env file with the DB URI, port, and jwt secret.

/frontend contains the front end React server, made using Vite.
React Router handles the routing, and Apollo Client handles the queries

In the future, the project will be deployed to AWS, 
using either EC2 or Serverless architecture to host it.
