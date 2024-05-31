import "./loadEnv.js";

import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';

const app = express();

app.use(morgan(process.env.ACCESS_LOG_FORMAT));
const corsOpts = {
  // allow all origins
  origin: true,
  credentials: true, // This allows cookies to be included
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
}; 

app.use(cors(corsOpts));
app.use(
  cookieSession({
    name: process.env.COOKIE_SESSION_NAME,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import { router as employeeRouter } from "./router/employee.router.js";
app.use("/employees", employeeRouter);

import { router as fileRouter } from "./router/file.router.js";
app.use("/files", fileRouter);

import { router as userRouter } from "./router/user.router.js";
app.use("/users", userRouter);

import { router as carRouter } from "./router/car.router.js";
app.use("/cars", carRouter);

import { router as authRouter } from "./router/auth.router.js";
import logger from "./config/log.config.js";
app.use("/auth", authRouter);

import { router as imgRouter } from "./router/picture.router.js";
app.use("/image", imgRouter);

import { router as bookingRouter } from "./router/booking.router.js";
app.use("/booking", bookingRouter);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Something broke!"); // Send a generic error response
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception ${err.message}`);
  process.exit(0);
});

app.listen(process.env.SERVER_PORT, () =>
  logger.info(`Server is running on port ${process.env.SERVER_PORT}`)
);
