import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

const File = sequelize.define("File", {
  originalname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'file',
  timestamps: true, // Automatically manage created_at and updated_at
  underscored: true
});

export { File };
