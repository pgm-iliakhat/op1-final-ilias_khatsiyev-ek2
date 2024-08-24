import Task from "../../models/tasks.js";

//get tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.query();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get task by id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.query().findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post tasks
export const postTasks = async (req, res) => {
  try {
    const task = await Task.query().insert(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//put tasks
export const putTasks = async (req, res) => {
  try {
    const task = await Task.query().findById(req.params.id).patch(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.query().deleteById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
