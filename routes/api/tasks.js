// Require router
const router = require('express').Router();

// Require constrollers
const taskController = require("../../controllers/taskController");

router.route("/all")
.get(taskController.findAll)
.post(taskController.create);

router.route("/all/:id")
.put(taskController.update)
.delete(taskController.remove)

module.exports = router;