//NPM Imports
import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { Employee, Role } from "../database/models";
const { PAGE_SIZE } = require('../constant/constant')
const bcrypt = require('bcrypt');

export async function index(req: Request, res: Response) {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string, 10) || PAGE_SIZE;

    const filterKeyword: string = req.query.search as string || '';
    const sortField: string = req.query.sortField as string || 'id';
    const sortOrder: string = req.query.sortOrder as string || 'desc';

    const whereClause: any = {};
  
    if (filterKeyword !== '') {
      whereClause[Op.or] = [
        { user_name: { [Op.iLike]: `%${filterKeyword}%` } },
      ];
    }

    const { count, rows } = await Employee.findAndCountAll({
      // include: [
      //   {
      //     model: Role,
      //     as: 'roles',
      //     attributes: ['first_name', 'last_name'],
      //   },
      // ],
      where: whereClause,
      order: [[sortField, sortOrder]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return res.status(HttpStatusCodes.OK).json({
      message: "Success",
      data: {
        totals: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        records: rows,
      },
    });
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

/**
 * All Employee Listing
 * @param req 
 * @param res 
 * @returns 
 */
export async function listing(req: Request, res: Response) {
  try {
    const user: any = req?.user;
    let rows: any = null;
    if(user.role_id == 1) {
      rows = await Employee.findAll();
    } else if(user.role_id != 1 && user?.parent_user_id ==0) {
      rows = await Employee.findAll({
        where: {
          [Op.or]: [
            { id: user?.id }, // Fetch logged-in user's info
            { parent_user_id: user?.id }, // Fetch employees under the same parent_user_id
          ],
        },
      });
    } else {
      rows = await Employee.findAll();
    }
    
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

/**
 * Create Serivce
 * @param req 
 * @param res 
 * @returns 
 */
export async function create(req: Request, res: Response) {
  try {
    const body = req.body;
    const user: any = req.user
    const saltRounds = 10;
    let password: any = await bcrypt.hash(body?.password, saltRounds);
    const createdEmployee = await Employee.create(
      {
        username: body?.username,
        password: password,
        status: body?.status ? true: false,
        role_id: body?.role_id,
        created_by: user?.id,
      }
    );
    if(createdEmployee) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Success",
        data: createdEmployee,
      });
    } else {
      console.warn('Controller Error (Create Employee Function): Error in creating cms');
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Oops! Something went wrong. Please contact to administrator',
      });
    }


  } catch(error) {
    console.error("Controller Error (Employee Created Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}


/**
 * Update Employee
 * @param req 
 * @param res 
 * @returns 
 */
export async function update(req: Request, res: Response) {
  try {
    const body = req.body;
    const user: any = req.user
    const { id } = req.params;


    if (id === '' || id === ':id' || id === undefined || id === null){
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee Not Found',
      });
    }

    const employee: any | null = await Employee.findByPk(id);

    if (!employee) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee Not Found',
      });
    }

    let updateData: any = {
      status: body?.status ? true : false,
      updated_by: user?.id,
      role_id: body?.role_id,
    };

    if (body?.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(body?.password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedEmployee = await employee.update(updateData);

    if (updatedEmployee) {
      return res.status(HttpStatusCodes.OK).json({
        message: 'Success',
        data: updatedEmployee,
      });
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Oops! Something went wrong. Please contact the administrator',
      });
    }
  } catch(error) {
    console.error("Controller Error (Employee Created Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

/**
 * Display Employee Detail
 * @param req 
 * @param res 
 * @returns 
 */
export async function show(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (id === '' || id === ':id' || id === undefined || id === null) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee Not Found',
      });
    }

    const cms: any | null = await Employee.findOne({
      include:  [{
        model: Employee,
        as: 'cms',
        attributes: ['first_name','last_name']
      }],
      where: { id },
    });

    if (!cms)
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee not found',
      });

    return res.status(HttpStatusCodes.OK).json({
      message: 'Success',
      data: cms,
    });
  } catch (error) {
    console.error('Controller Error (Fetch Employee Details Function):', error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

/**
 * Delete Employee
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (id === '' || id === ':id' || id === undefined || id === null) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee Not Found',
      });
    }

    const deleteCount = await Employee.destroy({
      where: {
        id: id
      }
    });


    if (deleteCount > 0) {
      return res.status(HttpStatusCodes.OK).json({
        message: 'Employee has been deleted successfully'
      });
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'Employee not found',
      });
    }
  } catch (error) {
    console.error('Controller Error (Delete Employee Function):', error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error
    });
  }
}

