import express from "express";
import cors from "cors";
import { posts } from "./posts.js";
import { connectToDatabase } from "./database.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());  

const conn = connectToDatabase();
posts(app, conn);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
