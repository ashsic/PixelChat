import express from "express";
import cors from "cors";
import { connectDb } from "./models/index.js";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes

app.get("/", (req, res) => {
  res.send("Hello world!");
});

connectDb().then(() => {
  console.log("Connected to MongoDB.");

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});
