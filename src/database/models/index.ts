// Models Imports
import { Employee } from "./employee.model";
import { Role } from "./role.model";


const models = {
  Employee,
  Role
};

//---- Employee
// Employee.hasMany(Role, { foreignKey: 'role_id', as: 'roles' });

export { 
  Employee,
  Role,
};
