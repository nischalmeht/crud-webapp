import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useAuthStore } from "../Store/authStore";

const Todo = () => {
    // const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState(0);
    const {setTasks,tasks}=useAuthStore()
    const addTask = async() => {
        // await setTasks("hello")
        
        // if (tasks.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            // setTask("");
        // }
    };
    useEffect(() => {
        const cookies = document?.myCookie; // returns a string like "myCookie=value; another=123"
        console.log('Cookies:', cookies);
      }, []);
   
    

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((t, i) => {
            if (i === index) {
                if (!t.completed) setCompletedTasks(completedTasks + 1);
                else setCompletedTasks(completedTasks - 1);
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        setTasks(updatedTasks);
    };

    // const progress = tasks.length
    //     ? Math.round((completedTasks / tasks.length) * 100)
    //     : 0;

    return (
        <>
        
        <div className="p-5 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Todo List</h2>
            <div className="mt-5">
                {/* <div className="h-5 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-teal-400 transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-center mt-2">{progress}% Completed</p> */}
            </div>
            <div className="mb-3 flex">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                    className="p-2 flex-grow border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={addTask}
                    className="ml-2 p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                    Add
                </button>
            </div>
            <Dashboard tasks={tasks}/>
        </div>
        </>
    );
};

export default Todo;