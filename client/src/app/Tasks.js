import React from "react";
import { useState, useEffect } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import API from "../utils/API";

import "./Tasks.css";
// const ap = axios.create({
//     baseURL: `http://localhost:3001/`
// })

const log = console.log;
const Tasks = () => {
  const [allTasks, updateAllTasks] = useState([]);

  const [taskInputVal, updateTaskInputVal] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    // log(`name: ${name}`);
    // log(`value: ${value}`);

    if (name === "task_input") {
      updateTaskInputVal(value);
    }
  };

  const createTask = (task) => {
    log(`ADDING TASK`);
    log(task);
    try {
      API.createTask(task);
    } catch (err) {
      if (err) {
        log(err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = { name: taskInputVal, completed: false };
    createTask(task);
  };

  //   const getAllTasks = async () => {
  //     log(`ALL TASKS`);

  //     let myTasks;
  //       try{
  //         myTasks = await API.getAllTasks()
  //       }catch(err){
  //         log(err);
  //         myTasks = [];
  //         throw err;
  //     }

  //     log(myTasks);
  //   }

  const getAllTasks = () => {
    log(`ALL TASKS`);

    let myTasks;

    API.getAllTasks()
      .then((res) => {
        myTasks = res.data;
        log(myTasks);

        updateAllTasks(myTasks);
      })
      .catch((err) => log(`err: ${err}`));

    // log(myTasks);
  };

  useEffect(() => {
    getAllTasks();

    log("All Tasks---");
    log(allTasks);
  }, []);
  return (
    <div className="tasks__container">
      <h1 className="font-henny-penny">Tasks</h1>

      {allTasks.length > 0 && (
        <div className="tasks__lists">
          <ul>
            {allTasks.map((tsk, key) => {
              const { _id, completed, name } = tsk;
              return (
                <li key={_id}>
                  {name} | <span>Completed:  {completed ? 'no': 'yes'} </span>{" "}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="tasks__input-wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="task_input"
            classes="font-syne"
            handleChange={handleChange}
            value={taskInputVal}
          />

          {/* <button type="submit">ADD</button> */}

          <Button type="submit" text="ADD" classes="font-syne form-btn" />
        </form>
      </div>
    </div>
  );
};

export default Tasks;
