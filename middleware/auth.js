import  verify  from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET_KEY_JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;
