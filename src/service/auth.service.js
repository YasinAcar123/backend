import  User  from "../model/user.js";

import jwt from "jsonwebtoken";

import config from "../config/auth.config.js";
import logger from "../config/log.config.js";
import * as bcrypt from 'bcrypt'


const register = async ({ email, firstname, lastname, password, age }) => {
  logger.info(`Registering user... in service ${email}`);
  try {
    const hashPasword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, firstname, lastname, password, age });
    logger.info(`User is registered and activation email send ${email}`);
    return user;
  } catch (error) {
    logger.error(`Error creating user... ${error.message}`);
    throw new Error("Error creating user");
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (user == null) {
    throw new Error("User not found");
  }

  const token = jwt.sign({ id: user.id, role:user.is_admin }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  return {token, user};
};

export default { register, login };
