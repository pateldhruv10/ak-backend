// NPM Imports
import express, { Application } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

// // Providers Imports
// import { initializeRedis } from './providers/redis';
import initializePassport from "./providers/passport";
import initializeSession from "./providers/session";
import { hash } from "bcrypt";

// Load Environment Variables
config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

//Initialize Morgan
app.use(morgan("short"));

// Handle Incoming HTTP Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(cors());
app.options("*", cors());

// // Initialize Redis Cache Client
// initializeRedis();

// Initialize Express Session
initializeSession(app);

// Initialize Passport.js
initializePassport(app);


// // Initialize Router
router(app);

app.listen(port, () => {
  console.log(
    `AK Infotech App back-end application is running on port ${port}.`,
  );
});
