import sequelize from '../config/database.config.js';
import { DataTypes } from 'sequelize';

const Car = sequelize.define('Car', {
  car_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER
  },
  daily_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Ensure this is an integer
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
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
  tableName: 'car',
  timestamps: true, // Automatically manage created_at and updated_at
  underscored: true
});

export default Car;
