import express from "express";
import authService from "../service/auth.service.js";
import { verifyToken } from "../utility/auth.utility.js";
import logger from "../config/log.config.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  logger.info("Registering user...", req.body.email);
  const user = req.body;
  await authService.register(user);
  logger.info("User has registered successfully", req.body.email);
  res.send("Register");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const  {token, user}  = await authService.login(email, password);
    res.cookie("access_token", token, {
      // secure: process.env.NODE_ENV === "production",
    });
    res.cookie("user", user, {
      // secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({token, user})
  } catch (error) {
    console.log("Error Logging in:", error)
    next(error)
  }
});

router.post("/logout", verifyToken, async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.send("Logout successfull");
  } catch (error) {
    next(error);
  }
});

export { router };
