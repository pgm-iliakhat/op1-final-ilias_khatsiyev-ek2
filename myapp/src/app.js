// Import statements
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PORT, VIEWS_PATH } from "./constants.js";

//api
import {
  getTasks,
  getTaskById,
  postTasks,
  putTasks,
  deleteTask,
} from "./controllers/api/taskControllers.js";
import {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
} from "./controllers/api/categoryControllers.js";

// Import controllers
import * as pageController from "./controllers/pageController.js";
import { handleTasksForm } from "./controllers/taskController.js";

import { register, login, logout } from "./controllers/authController.js";

// Import middleware
import jwtAuth from "./middleware/jwtAuth.js";

// Create an instance of express
const app = express();

// Serve static files from the public directory
app.use(express.static("public"));

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Set up Handlebars
const hbs = create({
  defaultLayout: "main",
  extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", VIEWS_PATH);

// API routes
app.get("/api/tasks", jwtAuth, getTasks);
app.get("/api/tasks/:id", jwtAuth, getTaskById);
app.post("/api/tasks", jwtAuth, postTasks);
app.put("/api/tasks/:id", jwtAuth, putTasks);
app.delete("/api/tasks/:id", jwtAuth, deleteTask);

app.get("/api/categories", jwtAuth, getCategories);
app.get("/api/categories/:id", jwtAuth, getCategoryById);
app.post("/api/categories", jwtAuth, postCategory);
app.put("/api/categories/:id", jwtAuth, putCategory);
app.delete("/api/categories/:id", jwtAuth, deleteCategory);

// Page routes
app.get("/", jwtAuth, pageController.home);
app.get("/categories/:id", jwtAuth, pageController.category);
app.get("/login", pageController.login);
app.get("/register", pageController.register);

// Auth routes
app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

// Tasks forms
app.post("/tasks/:id", jwtAuth, handleTasksForm);
app.post("/tasks", jwtAuth, handleTasksForm);
app.post("/tasks/:id/check", jwtAuth, handleTasksForm);
app.post("/tasks/:id/edit", jwtAuth, handleTasksForm);
app.post("/tasks/:id/delete", jwtAuth, handleTasksForm);

// Start the server and log a message
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
