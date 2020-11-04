import React from "react";
import { useState, useEffect } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import API from "../utils/API";

import "./Tasks.css";
const Tasks = () => {
  const [allTasks, updateAllTasks] = useState([]);

  const [taskInputVal, updateTaskInputVal] = useState("");

  const [formSubmitBtnText, updateFormSubmitBtnText] = useState("ADD");

  const [newTaskID, updateNewTaskID] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "task_input") {
      updateTaskInputVal(value);
    }
  };

  const clearAddTaskInput = () => {
    updateTaskInputVal("");
  };

  const getAllTasks = () => {
    let myTasks;

    API.getAllTasks()
      .then((res) => {
        myTasks = res.data;
        updateAllTasks(myTasks);
      })
      .catch((err) => console.log(`err: ${err}`));
  };

  const createTask = async (task) => {
    updateNewTaskID(undefined);
    updateFormSubmitBtnText("ADD");

    try {
      await API.createTask(task);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }

    getAllTasks();
    clearAddTaskInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTaskID !== undefined) {
      completeTask(newTaskID, {name: taskInputVal});
      clearAddTaskInput();
    } else {
      const task = { name: taskInputVal };
      createTask(task);
    }
  };

  const deleteTask = (id) => {
    updateNewTaskID(undefined);
    updateFormSubmitBtnText("ADD");

    API.deleteTask(id)
      .then((res) => {
        getAllTasks();
        clearAddTaskInput();
      })
      .catch((err) => console.log(err));
  };

  const completeTask = (id, updating) => {
    updateNewTaskID(undefined);
    updateFormSubmitBtnText("ADD");
    API.completeTask(id, updating);
    getAllTasks();
  };

  const changeTask = (id) => {
    updateFormSubmitBtnText("UPDATE");
    updateNewTaskID(id);
    const { name} = allTasks.find((tsk) => tsk._id === id);
    updateTaskInputVal(name);
  };

  useEffect(() => {
    getAllTasks();
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
                      disabled={completed ? true : false}
                      method={deleteTask}
                      id={_id}
                    />
                    {}
                    <Button
                      text="complete"
                      type="button"
                      classes="task-complete-btn"
                      disabled={completed ? true : false}
                      //   completeTask={completeTask}
                      method={completeTask}
                      updating={{completed: true}}
                      id={_id}
                    />
                    <Button
                      text="change"
                      type="button"
                      classes="task-change-btn"
                      disabled={completed ? true : false}
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