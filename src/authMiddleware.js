import jwt from "jsonwebtoken";

export function authToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unathorized: No token found."  });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    
    next();
  } catch (e) {
    localStorage.removeItem("token");
    
    return res.status(403).json({ error: "Forbidden: Invalid token." });
  }
}
