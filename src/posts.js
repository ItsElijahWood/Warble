import bcrypt from "bcrypt";

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
}
