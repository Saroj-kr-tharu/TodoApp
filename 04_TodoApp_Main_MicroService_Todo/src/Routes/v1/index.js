const express = require("express");
const {
  readTaskController,
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  filterTaskController,
} = require("../../Controllers/todoController");

const {
  validateCreateTask,
  validateUpdateTask,
  validateDeleteTask,
  validateFilterTask,
  validateGetTask,
} = require("../../Middlewares/todoMIddleware");

const router = express.Router();

router.post("/getAllTask", validateGetTask, readTaskController);
router.post("/createTask", validateCreateTask, createTaskController);
router.get("/taskById", validateGetTask, getTaskController);
router.patch("/updateTask", validateUpdateTask, updateTaskController);
router.delete("/deleteTask", validateDeleteTask, deleteTaskController);
router.get("/filterTask", validateFilterTask, filterTaskController);

router.get("/info", (req,res)=> {
  res.json({
    messages: 'todo main service is live'
  })
});

module.exports = router;
