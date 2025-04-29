import express from "express";
import cors from "cors";
import { posts } from "./posts.js";
import { gets } from "./get.js";
import { connectToDatabase } from "./database.js";

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',  
  credentials: true,           
};

app.use(cors(corsOptions));
app.use(express.json());  

const conn = connectToDatabase();
gets(app);
posts(app, conn);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
