import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Register
export const register = async (req, res) => {
  const { lastname, firstname, email, password } = req.body;

  try {
    const existingUser = await User.query().where("email", email).first();
    const errors = validationResult(req);

    if (existingUser) {
      req.flash = {
        type: "danger",
        message: "This email is already in use!",
      };
      return res.render("register", { flash: req.flash });
    }

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      };

      return res.render("register", { flash: req.flash });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.query().insert({
      lastname,
      firstname,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().where("email", email).first();
    const errors = validationResult(req);

    if (!user) {
      req.flash = {
        type: "danger",
        message: "User not found!",
      };
      return res.render("login", { flash: req.flash });
    }

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      req.flash = {
        type: "danger",
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      };

      return res.render("login", { flash: req.flash });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      req.flash = {
        type: "danger",
        message: "Invalid password!",
      };
      return res.render("login", { flash: req.flash });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.TOKEN_SALT,
      {
        expiresIn: "3h",
      }
    );

    res.cookie("user", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
};
