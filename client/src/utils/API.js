import axios from "axios";

export default {
  getAllTasks: function () {
    // console.log('API: getting all tasks');
    return axios.get("/api/all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  createTask: (task) => {
    return axios.post("/api/all", task, {
        headers: {
            "Content-Type": "application/json"
        }
    });
  },
  completeTask: (id, body) => {
    return axios.put(`/api/all/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // updateTask: (id)=> {
  //     return
  // },
  deleteTask: (id) => {
    return axios.delete(`/api/all/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
