const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Task.find(req.query)
      .then((tsk) => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Task.create(req.body)
    .then(tsk => res.json(tsk))
    .catch((err) => res.status(422).json(err));
  },
  update: (req, res) => {
      db.Task.findOneAndUpdate({id: req.params.id}, req.body)
      .then(tsk => res.json(tsk))
      .catch((err) => res.status(422).json(err));
  },
  remove: (req,res)=> {
    db.Task.findById(req.params.id)
    .then(tsk => tsk.remove())
    .then(tsk => res.json(tsk))
    .catch((err) => res.status(422).json(err))
  },
};