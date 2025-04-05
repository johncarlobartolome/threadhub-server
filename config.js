import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
export const CLIENT_URL = process.env.CLIENT_URL;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_CLIENT_ID = process.env.EMAIL_CLIENT_ID;
export const EMAIL_CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET;
export const EMAIL_REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
