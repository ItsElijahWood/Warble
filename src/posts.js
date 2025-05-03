import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export function posts(app, conn) {
  app.post('/api/register', async (req, res) => {
    const { name, email, dateOfBirth, password } = req.body;
  
    if (!name || !email || !dateOfBirth || !password) {
      return res.status(400).json({ Error: "Required fields missing." });
    }

    const password_hashed = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, dob, password) VALUES (?, ?, ?, ?)";
    try {
      await conn.promise().query(query, [name, email, dateOfBirth, password_hashed]);

      return res.status(201).json({ message: "Account created." });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Error: "Internal server error." });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ Error: "Required fields missing." });
    }

    const query = "SELECT id, email, password FROM users WHERE email = ?";
    try {
      const [rows] = await conn.promise().query(query, [email]);

      if (rows.length === 0) {
        return res.status(400).json({ Error: "Invalid email or password." });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ Error: "Invalid email or password." });
      }

      const object = { userId: user.id };

      const token = jwt.sign(object, process.env.JWT_TOKEN, { expiresIn: "30d" });

      return res.json({ Token: token });
    } catch (e) {
      console.error("Error selecting email and password from the database: ", e);
      return res.status(500).json({ Error: "Internal server error." });
    }
  });

  app.post('/api/reset_password', async (req, res) => {
    const { id, old_password, new_password } = req.body;

    if (!id || !old_password || !new_password) {
      return res.status(400).json({ Error: "Required fields missing."})
    }

    const hashed_new_password = await bcrypt.hash(new_password, 10);

    try {
      const query = "SELECT * FROM users where id = ?";
      const [rows] = await conn.promise().query(query, [id]);

      if (rows.length === 0) {
        return res.status(400).json({ Error: "Invalid ID." });
      }

      const user = rows[0];
      const match_password = await bcrypt.compare(old_password, user.password);

      if (!match_password) {
        return res.status(400).json({ Error: "Old password does not match." });
      }

      const query2 = "UPDATE users SET password = ? WHERE id = ?";
      await conn.promise().query(query2, [hashed_new_password, id]);

      res.status(200).json({ message: "Password reset successfully."});
    } catch (e) {
      console.error(e);
      
      return res.status(500).json({ Error: "Internal server error."})
    }
  });

  app.post('/api/account/delete', async (req, res) => {
    const { Id } = req.body;

    try {
      const query = "DELETE FROM users WHERE id = ?";

      const [rows] = await conn.promise().query(query, [Id]);

      if (rows.affectedRows === 0) {
        return res.status(404).json({ Error: "User not found." });
      } 

      return res.status(200).json({ message: "Delete account successfully." });
    } catch (e) {
      console.error(e);

      return res.status(500).json({ Error: "Internal server error." });
    }
  });
}
