# PixelChat
Testing my skills by making a full stack image sharing site with MERN/GraphQL. Check out my current progress below!

/app contains the backend API, written in Node.js Express with GraphQL
BCrypt and JSONWebToken are used for hashing passwords and authentication
Mongoose is used to connect to the MongoDB database, hosted on MongoDB Atlas
/app contains .env file with the DB URI, port, and jwt secret

/frontend contains the front end React server, made using Vite
React Router handles the routing, and Apollo Client handles the queries

In the future, the project will be deployed to AWS, using either 
EC2 or Serverless architecture to host it, with S3 for image storage.

In order to run the project yourself, follow these steps:

1. Ensure Git and Node.js are installed. I am running Node v20.10.0 at the time of writing
2. Open a terminal and clone the repo:
```bash
git clone git@github.com:ashsic/PixelChat.git
```
3. Split the terminal or open a new terminal tab. cd into PixelChat/frontend and install then run the app:
```bash
cd PixelChat/frontend
npm i
npm run dev
```
4. In the other terminal tab, cd into PixelChat/app, install the app, then create a .env file:
```bash
cd PixelChat/app
npm i
touch .env
```
5. Sign up for MongoDB Atlas, and create a free tier deployment. Connect via drivers and put your database URL in your .env, along with your port and secret key for hashing passwords:
```.env
DB_URL=<YOUR_MONGODB_ATLAS_URL>
PORT=3000
SECRET_KEY=<YOUR_SECRET_KEY>
```
6. Run the app. This will start the API server and connect to the DB. You should see a message similar to the following in your terminal:
```bash
Connected to MongoDB.
Server listening on http://localhost:3000/graphql.
```
7. Navigate to localhost:5173 in your browser of choice. Create an account and log in! Adjust the guest account credentials as needed.

-----------------------------NEXT STEPS-----------------------------

I have hit a slight roadblock when it comes to hosting images. I am currently researching how to securely host images
on S3 in a way that will not put me at risk of high fees for image retrieval in case of DDoS attack.

Once users can upload images and view posts, the main functionality of the website will be complete, at which point
I will clean up the code and styling a bit.

I want to learn the following, so I will probably also implement these at some point:
- GitHub actions
- Serverless API hosting
- DNS
- Cloudflare CDN
