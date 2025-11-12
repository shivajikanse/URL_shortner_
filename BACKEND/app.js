import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/monogo.config.js";
import urlSchema from "./src/models/shortUrl.model.js";
import user_auth from "./src/routes/Auth.route.js";
import short_Url from "./src/routes/shortUrl.route.js";
import url_redirection from "./src/routes/url_redirection.route.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*", // allow all frontends for now
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Authentication route
app.use("/api/auth", user_auth);

//Post route -- create short url
app.use("/api/shorten", short_Url);

// Get route -- Redirection
app.use("/", url_redirection);

//global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port} `);
});
