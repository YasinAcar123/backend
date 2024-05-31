import express from "express";
import { Car } from "../model/index.js";
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
router.get("/:id", async (req, res) => {
  // take user cookie 
  console.log(req, "req")
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      res.json(car);
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

// Search for available cars
router.get("/search", verifyToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required." });
    }

    const availableCars = await findAvailableCars(startDate, endDate);
    res.json(availableCars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to find available cars
const findAvailableCars = async (startDate, endDate) => {
  try {
    const query = `
      SELECT c.* FROM Car c
      WHERE c.car_id NOT IN (
        SELECT DISTINCT b.car_id FROM Booking b
        WHERE (:startDate <= b.end_date AND :endDate >= b.start_date)
      )
    `;
    const cars = await sequelize.query(query, {
      replacements: { startDate, endDate },
      type: QueryTypes.SELECT,
    });
    return cars;
  } catch (error) {
    throw new Error('Error fetching available cars');
  }
};

export { router };



//Previous version of codes is down


// import express from "express";
// import {Car} from "../model/index.js"
// import { verifyToken } from "../utility/auth.utility.js";

// const router = express.Router();



// router.get("/", verifyToken, async (req, res) => {
//   res.send(await Car.findAll());
// });

// router.get("/:id", verifyToken, async (req, res) => {
//   res.send(await Car.findByPk(req.params.id));
// });

// router.post("/", verifyToken, async (req, res) => {
//   res.send(await Car.create(req.body));
// });

// router.put("/:id", verifyToken, async (req, res) => {
//   res.send(await Car.update(req.body, { where: { id: req.params.id } }));
// });

// router.delete("/:id", verifyToken, async (req, res) => {
//   await User.destroy({ where: { id: req.params.id } });
//   res.send("Delete car");
// });

// export { router };