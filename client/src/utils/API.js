import axios from 'axios';

export default {
    getAllTasks: function () {
        // console.log('API: getting all tasks');
        return axios.get("/api/all", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    createTask: (task) => {
        return axios.post('/api/all', task)
    },
    completeTask: (id)=> {
        return axios.put(`/api/all/${id}`)
    },
    // updateTask: (id)=> {
    //     return
    // },
    deleteTask: (id) =>{
        return axios.delete(`/api/all/${id}`)
    }
}