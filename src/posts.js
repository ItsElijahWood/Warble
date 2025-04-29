import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "universal-cookie";

dotenv.config();
export function posts(app, conn) {
  app.post('/api/register', async (req, res) => {
    const { name, email, dateOfBirth, password } = req.body;
  
    if (!name || !email || !dateOfBirth || !password) {
      res.status(400).json({ error: "Required fields missing." });
    }

    const password_hashed = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, dob, password) VALUES (?, ?, ?, ?)";
    try {
      await conn.promise().query(query, [name, email, dateOfBirth, password_hashed]);

      res.status(201).json({ message: "Account created." });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Required fields missing." });
    }

    const query = "SELECT id, email, password FROM users WHERE email = ?";
    try {
      const [rows] = await conn.promise().query(query, [email]);

      if (rows.length === 0) {
        res.status(400).json({ error: "Invalid email or password." });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const object = { userId: user.id };

      const token = jwt.sign(object, process.env.JWT_TOKEN, { expiresIn: "30d" });

      return res.json({ Token: token });
    } catch (e) {
      console.error("Error selecting email and password from the database: ", e);
      res.status(500).json({ message: "Internal server error." });
    }
  });
}
