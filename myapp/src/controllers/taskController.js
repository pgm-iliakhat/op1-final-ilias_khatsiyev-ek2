import Task from "../models/tasks.js";
import Category from "../models/category.js";

// Post a task
const postTask = async (req, res) => {
  const categoryId = req.params.id;

  try {
    if (categoryId) {
      await Task.query().insert({
        ...req.body,
        category_id: categoryId,
      });

      res.redirect(`/categories/${categoryId}`);
    } else {
      await Task.query().insert(req.body);

      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

// Check a task
const checkTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.query().findById(id);
    const category = await Category.query().findById(task.category_id);

    if (category) {
      await Task.query().findById(id).patch({
        checked: true,
      });
      res.redirect(`/categories/${category.id}`);
    } else {
      await Task.query().findById(id).patch({
        checked: true,
      });
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.query().findById(id);
    const category = await Category.query().findById(task.category_id);

    if (category) {
      await Task.query().findById(id).patch({
        task: req.body.task,
      });
      res.redirect(`/categories/${category.id}`);
    } else {
      await Task.query().findById(id).patch({
        task: req.body.task,
      });
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.query().findById(id);
    const category = await Category.query().findById(task.category_id);

    if (category) {
      await Task.query().deleteById(id);
      res.redirect(`/categories/${category.id}`);
    } else {
      await Task.query().deleteById(id);
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

// Handle form data
export const handleTasksForm = async (req, res) => {
  const method = req.body.method;
  delete req.body.method;

  switch (method) {
    case "DELETE":
      await deleteTask(req, res);
      break;
    case "PUT":
      await checkTask(req, res);
      break;
    case "PATCH":
      await updateTask(req, res);
      break;
    default:
      await postTask(req, res);
      break;
  }
};
