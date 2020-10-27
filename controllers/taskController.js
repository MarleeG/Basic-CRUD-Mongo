const db = require("../models");

const log = console.log;
module.exports = {
  //   findAll: (req, res) => {

  //     log("-----------");

  //     log("FINDALL");
  //     log(req);
  //     log(res);
  //     log("-----------");

  //     db.Task.find({})
  //       .then((tsk) => res.json(tsk))
  //       .catch((err) => res.status(422).json(err));
  //   },

  findAll: async (req, res, next) => {
    log("-----------");

    log("FINDALL");
    log(req);
    log(res);
    log("-----------");

    // db.Task.find({})
    //   .then((tsk) => res.json(tsk))
    //   .catch((err) => res.status(422).json(err));

    let tasks;

    try {
      tasks = await db.Tasks.find({});
    } catch (err) {
      return next(err);
    }

    res.json({ tasks: tasks.map((task) => task.toObject({ getters: false })) });
  },
  create: (req, res) => {
    log("-----------");

    log("CREATE");
    log(req.body);
    log("-----------");

    db.Task.create(req.body)
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Task.findOneAndUpdate({ id: req.params.id }, req.body)
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Task.findById(req.params.id)
      .then((tsk) => tsk.remove())
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
};
