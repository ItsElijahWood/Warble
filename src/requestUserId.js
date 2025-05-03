import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export function getUserId(req, res) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ Error: "Unathorized: No token found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const userId = decoded.userId;

    return res.json({ userId });
  } catch (e) {
    console.error(e);

    return res.status(403).json({ Error: "Forbidden: Invalid token" });
  }
}
