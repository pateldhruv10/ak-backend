// NPM Imports
import { Application, Request, Response, Express } from "express";
import HttpStatusCodes from "http-status-codes";
import listEndpoints from "express-list-endpoints";


// Middlewares Imports
import checkAuthentication from "../middlewares/admin-authentication.middleware";
import authRoutes from "./authRoutes";
import adminEmployeeRouter from "./employee.routes";
import roleRouter from "./role.routes";
import transactionRouter from "./transaction.routes";

///------------------------------|| ROUTES ENTRY POINT ||------------------------------///

export default function router(app: Application) {
  // MAIN ROUTE
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Peace Assist App Back-end application");
  });


  app.use('/api/auth', authRoutes);
  

  
  //----- Admin
  app.use("/api/role",checkAuthentication(),roleRouter);
  app.use("/api/employee",checkAuthentication(),adminEmployeeRouter);
  app.use("/api/transaction",checkAuthentication(),transactionRouter);


  // MISSING ROUTES
  app.use("*", (req: Request, res: Response) => {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ message: "Route Not Found" });
  });

  console.log("Router Event - Endpoints: ", listEndpoints(app as Express));
}
