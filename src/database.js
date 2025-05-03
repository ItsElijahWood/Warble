import mysql from "mysql2";
import dotenv from "dotenv"

dotenv.config();
export function connectToDatabase() {
  const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
  
  conn.connect(err => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database successfully!");
    }
  }); 

  return conn;
}
