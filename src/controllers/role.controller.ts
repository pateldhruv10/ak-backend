//NPM Imports
import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Role } from "../database/models";

export async function index(req: Request, res: Response) {
  try {
    const rows = await Role.findAll({
      order: [['role_name', 'ASC']]
    });
    return res.status(HttpStatusCodes.OK).json({
      message: "Success",
      data: rows,
    });
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}
