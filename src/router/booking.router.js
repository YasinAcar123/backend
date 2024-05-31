import express from "express";
import { Booking, Car, Picture } from "../model/index.js";
import { verifyToken } from "../utility/auth.utility.js";
import sequelize from '../config/database.config.js';
import { QueryTypes } from 'sequelize';

const router = express.Router();

// Fetch all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch a single car by ID
router.get("/:carId", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.carId);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new car
router.post("/", async (req, res) => {
  const { brand, model, year, daily_price } = req.body;
  try {
    const newCar = await Car.create({ brand, model, year, daily_price });
    res.json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing car
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCar = await Car.update(req.body, { where: { car_id: req.params.id } });
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a car
router.delete("/:id", async (req, res) => {
  try {
    await Car.destroy({ where: { car_id: req.params.id } });
    res.send("Car deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Make a booking
router.post("/book", verifyToken, async (req, res) => {
  try {
    const { carId, startDate, endDate, id } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ error: "Car ID, start date, and end date are required." });
    }

    const booking = await Booking.create({ car_car_id: carId, start_date: startDate, end_date: endDate , user_user_id: id});
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch bookings for a specific car ID
router.get("/book/:carId", verifyToken, async (req, res) => {
  try {
    const { carId } = req.params;
    const bookings = await Booking.findAll({ where: { car_car_id: carId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find available cars according to the start and end date and take with querystring
router.post("/available", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    console.log("startDate:", startDate, "endDate:", endDate); // Log parameters for debugging

    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required." });
    }

    const availableCars = await sequelize.query(
      `SELECT * FROM car WHERE car_id NOT IN (
        SELECT car_car_id FROM booking WHERE (
          start_date <= :endDate AND end_date >= :startDate
        )
      )`,
      {
        replacements: { startDate, endDate },
        type: QueryTypes.SELECT
      }
    );
    // and add picture to the car object
    for (let car of availableCars) {
      const picture = await Picture.findOne({ where: { car_id: car.car_id } });
      car.picture = picture;
    }
    res.json(availableCars);
  } catch (error) {
    console.error("Error processing request:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

// send user booking details
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    // send users booking details
    const bookings = await Booking.findAll({ where: { user_user_id: userId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);


export { router };
