import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
// import bcrypt from "bcrypt";
import { generateToken } from "../providers/jwt";
import { Employee } from "../database/models";
const bcrypt = require('bcrypt');

  /**
   * Login Function
   * @param req 
   * @param res 
   * @returns 
   */
  export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        const employee: any = await Employee.findOne({
            where: { username }
        });

        if (!employee) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .send({ message: "Invalid User Name" });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (!passwordMatch) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .send({ message: "Invalid Password" });
        }

        if (employee.status === false) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .send({
                    message: "Your account has been suspended. Please contact the administrator",
                });
        }

        const token = generateToken({ employee }, "7d");

        // Set HttpOnly cookie with the access token
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(HttpStatusCodes.OK).json({
            message: "Success",
            data: {
                access_token: token,
                employee,
            },
        });
    } catch (error) {
        console.error("Controller Error (Login Function):", error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred during login",
        });
    }
}


  /**
   * Logout Function
   * @param req 
   * @param res 
   * @returns 
   */
  export async function logout(req: Request, res: Response) {
    try {
      req.logout({}, (err: any) => {
        if (err) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: err,
          });
        }
  
        // Clear the access token cookie
        res.clearCookie('access_token');
        return res.status(HttpStatusCodes.OK).json({
          message:  'Successfully Logout',
        }); 
      });
    } catch (error) {
      console.error('Controller Error (Logout Function):', error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error,
      });
    }
  }
