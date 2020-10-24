// Require router
const router = require('express').Router();

// Require constrollers
const taskController = require("../../controllers/taskController");

router.route("/")
.get(taskController.findAll)
.post(taskController.create);

router.route("/:id")
.put(taskController.update)
.delete(taskController.delete)