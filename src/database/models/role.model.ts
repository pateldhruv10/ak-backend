"use strict";

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../providers/sequelize";

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    full_access: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "employees",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    paranoid: false,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export { Role };
