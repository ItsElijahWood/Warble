import { authToken } from "./authMiddleware.js"

export function gets(app) {
  app.get('/api/protected', authToken, (req, res) => {
    return res.status(200).json({ message: "Protected token matches."});
  });
}
