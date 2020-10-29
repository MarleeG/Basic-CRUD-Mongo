const db = require("../models");

const log = console.log;
module.exports = {
  //   findAll: (req, res) => {
  //     log("-----------");

  //     log("FINDALL");
  //     //   log(req);
  //     //   log(res);
  //     log("-----------");

  //     db.Task.find({})
  //       .then((tsk) => res.json(tsk))
  //       .catch((err) => res.status(422).json(err));
  //   },
  findAll: async (req, res, next) => {
    log("-----------");
    log("FINDALL");
    // log(req);
    // log(res);

    let tasks;

    try {
      tasks = await db.Task.find({});
    } catch (err) {
      return next(err);
    }

    log(tasks);
    res.json(tasks);
    log("-----------");

    // res.json({
    //     projects: projects.map((project) => project.toObject({ getters: false })),
    //   });

    // res.json({ tasks: tasks.map((task) => task.toObject({ getters: false })) });
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
    const filter = { _id: req.params.id };
    log('--------');

    log("update");
    log(`id: ${filter.id}`);
    log(req.body);

    log('--------');

    const update = req.body;

    db.Task.findOneAndUpdate(filter, update)
      .then((tsk) => {
        log("--------");
        log("promise");
        log("--------");

        return res.json(tsk);
      })
      .catch((err) => {
        log("error");
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
