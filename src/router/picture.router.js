import express from "express";
import { Car, Picture } from "../model/index.js"; // Import the models
import { verifyToken } from "../utility/auth.utility.js";
import uploadProductImage from "../service/image.service.js"


const router = express.Router();

// Create a new picture for a car
router.post("/:carId", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.carId);
    if (car) {
      const imageUrl= req.body.url
      const picture = await Picture.create({ url:imageUrl, car_id: req.params.carId });
      res.status(201).json(picture);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all pictures for a car
router.get("/:carId", async (req, res) => {
  console.log(req)
  try {
    const pictures = await Picture.findAll({ where: { car_id: req.params.carId } });
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {router};
