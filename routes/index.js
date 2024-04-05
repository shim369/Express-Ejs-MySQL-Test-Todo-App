let express = require('express');
let router = express.Router();

const {
  getAllTasks,
  createTask,
  deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);
router.post("/", createTask);
router.post("/delete/:id", deleteTask);

module.exports = router;