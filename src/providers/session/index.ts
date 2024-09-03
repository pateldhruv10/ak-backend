// NPM Imports
import { Application } from "express";
import session from "express-session";
import { config } from "dotenv";

config();

/**
 * Initialize session
 * @param app
 */
export default function initializeSession(app: Application) {
  app.use(
    session({
      secret: String(process?.env?.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    }),
  );
  console.log("Express-Session Event: Sessions initialized");
}
