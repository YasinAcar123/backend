import sequelize from '../config/database.config.js';
import { DataTypes } from 'sequelize';

const Picture = sequelize.define('Picture', {
  picture_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  tableName: 'picture',
  timestamps: true, // Automatically manage created_at and updated_at
  underscored: true
});

export default Picture;
