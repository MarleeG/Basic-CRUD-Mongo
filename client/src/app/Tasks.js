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

  const [formSubmitBtnText, updateFormSubmitBtnText] = useState("ADD");
  const handleChange = (e) => {
    const { name, value } = e.target;
    // log(`name: ${name}`);
    // log(`value: ${value}`);

    if (name === "task_input") {
      updateTaskInputVal(value);
    }
  };

  const clearAddTaskInput = () => {
    updateTaskInputVal("");
  };

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

  const createTask = async (task) => {
    log(`ADDING TASK`);
    log(task);

    try {
      await API.createTask(task);
    } catch (err) {
      if (err) {
        log(err);
      }
    }

    getAllTasks();
    clearAddTaskInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = { name: taskInputVal };
    createTask(task);
  };

  const deleteTask = (id) => {
    API.deleteTask(id)
      .then((res) => {
        log(res);
        getAllTasks();
        clearAddTaskInput();
      })
      .catch((err) => log(err));
  };

  const completeTask = (id) => {
    log("COMPLETING TASK---");
    log(id);

    // API.completeTask(id, { completed: true })
    //   .then((res) => {
    //     log(res);
    //     getAllTasks();
    //   })
    //   .catch((err) => log(err));

    API.completeTask(id, { completed: true });

    getAllTasks();
    //   .then((res) => log(res))
    //   .catch((err) => log(err));
  };

  const changeTask = (id) => {
    log("change task");

    log(id);
    const { name, _id, completed } = allTasks.find((tsk) => tsk._id === id);

    updateTaskInputVal(name);

    updateFormSubmitBtnText("UPDATE")

    // log(name);
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
          <ul className="task_ul">
            {allTasks.map((tsk, key) => {
              const { _id, completed, name } = tsk;
              return (
                <li key={_id} className="tasks__li">
                  {name} |{" "}
                  <span>
                    Completed: {completed ? "yes" : "no"}
                    {" | "}
                    <Button
                      text="delete"
                      type="button"
                      classes="task-delete-btn"
                      //   deleteTask={deleteTask}

                      method={deleteTask}
                      id={_id}
                    />
                    {}
                    <Button
                      text="complete"
                      type="button"
                      classes="task-complete-btn"
                      //   completeTask={completeTask}
                      method={completeTask}
                      id={_id}
                    />
                    <Button
                      text="change"
                      type="button"
                      classes="task-change-btn"
                      //   completeTask={completeTask}
                      method={changeTask}
                      id={_id}
                    />
                  </span>{" "}
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

          <Button
            type="submit"
            text={formSubmitBtnText}
            classes="font-syne form-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default Tasks;
