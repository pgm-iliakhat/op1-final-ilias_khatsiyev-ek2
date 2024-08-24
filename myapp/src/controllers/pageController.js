import Category from "../models/category.js";
import Task from "../models/tasks.js";

export const home = async (req, res) => {
  const tasks = await Task.query();
  const categories = await Category.query();
  const flash = req.flash || "";

  res.render("home", { tasks, categories, flash, loggedIn: req.loggedIn });
};

export const category = async (req, res) => {
  const category = await Category.query().findById(req.params.id);
  const categories = await Category.query();
  const tasks = await Task.query().where("category_id", req.params.id);
  const flash = req.flash || "";

  const categoryId = req.params.id;

  res.render("home", { tasks, categories, category, categoryId, flash });
};

export const login = (req, res) => {
  res.render("login");
};

export const register = (req, res) => {
  res.render("register");
};
