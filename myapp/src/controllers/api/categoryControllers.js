import Category from "../../models/category.js";
import Task from "../../models/tasks.js";

//get categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.query();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get category by id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.query().findById(req.params.id);
    const tasks = await Task.query().where("category_id", req.params.id);
    category.tasks = tasks;

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//post category
export const postCategory = async (req, res) => {
  try {
    const category = await Category.query().insert(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//put category
export const putCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.query().findById(id);
    if (category) {
      await Category.query().findById(id).patch(req.body);
      res.json({ message: `Category ${id} updated` });
    } else {
      res.status(404).json({ message: `Category ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.query().findById(id);
    if (category) {
      await Category.query().deleteById(id);
      res.json({ message: `Category ${id} deleted` });
    } else {
      res.status(404).json({ message: `Category ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
