import { authToken } from "./authMiddleware.js"
import { getUserId } from "./requestUserId.js";

export function gets(app) {
  app.get('/api/protected', authToken, (req, res) => {
    return res.status(200).json({ message: "Protected token matches."});
  });

  app.get('/api/account/getUserId', getUserId);
}
