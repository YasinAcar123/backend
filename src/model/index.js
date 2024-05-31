import User from './user.js';
import Car from './car.js';
import Booking from './booking.js';
import Employee from "./employee.js";
import { File } from "./file.js";
import Picture from './picture.js';

// Define relationships in your application logic
User.hasMany(Booking, { foreignKey: 'user_user_id' });
Booking.belongsTo(User, { foreignKey: 'user_user_id' });

Car.hasMany(Booking, { foreignKey: 'car_car_id' });
Booking.belongsTo(Car, { foreignKey: 'car_car_id' });

Car.hasMany(Picture, {
  foreignKey: 'car_id',
  as: 'pictures'
});
Picture.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car'
});

export { User, Car, Booking, Employee, File, Picture };
