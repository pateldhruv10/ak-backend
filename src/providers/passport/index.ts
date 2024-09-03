// NPM Imports
import { Application } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "dotenv";

// Providers Imports
// import { getCacheValue, setCacheValue } from '../redis';

// Models Imports
import { Employee, Role } from "../../database/models";

// Load Environment Variables
config();

///------------------------------|| PASSPORT.JS PROVIDER ENTRY POINT ||------------------------------///

// INITIALIZE PASSPORT.JS
export default function initializePassport(app: Application) {
  // Set up Passport.js middleware
  app.use(passport.initialize());

  // Define the JWT authentication strategy
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process?.env?.JWT_SECRET || "",
      },
      async (payload: any, done: any) => {

        console.log('Payload => ', payload)
        try {
          if(payload?.employee) {
            const employee = await Employee.findOne({ where: { id: payload?.employee?.id } });
            if (employee == null) {
              return done(null, false);
            }
            return done(null, employee);
          } 
          
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
  console.log("Passport.js Event: Passport.js initialized");
}
