const db = require("../models");

module.exports = {
  findAll: async (req, res, next) => {
    let tasks;

    try {
      tasks = await db.Task.find({});
    } catch (err) {
      return next(err);
    }

    res.json(tasks);
  },
  create: (req, res) => {
    db.Task.create(req.body)
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
  update: (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;

    db.Task.findOneAndUpdate(filter, update)
      .then((tsk) => {
        return res.json(tsk);
      })
      .catch((err) => {
        console.log("error");
        return res.status(422).json(err);
      });
  },
  remove: (req, res) => {
    db.Task.findById(req.params.id)
      .then((tsk) => tsk.remove())
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
};