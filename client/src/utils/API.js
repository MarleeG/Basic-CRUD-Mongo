import axios from "axios";

export default {
  getAllTasks: function () {
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
  deleteTask: (id) => {
    return axios.delete(`/api/all/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};