import mysql from "mysql2";

export function connectToDatabase() {
  const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "ej",
    password: "",
    database: "warble"
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
