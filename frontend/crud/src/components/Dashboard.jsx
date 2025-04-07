import React from 'react'
import { useAuthStore } from '../Store/authStore';

const Dashboard = () => {
  const {setTasks,tasks}=useAuthStore();
  return (
    <>
            <ul className="list-none p-0">
                {tasks.map((t, index) => (
                    <li
                        key={index}
                        className={`mb-2 cursor-pointer ${
                            t.completed ? "line-through text-white-500" : ""
                        }`}
                        onClick={() => toggleTaskCompletion(index)}
                    >
                        {t.text}
                        <div className="inline-flex ml-40 space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedTasks = tasks.filter((_, i) => i !== index);
                                    if (t.completed) setCompletedTasks(completedTasks - 1);
                                    setTasks(updatedTasks);
                                }}
                                className="text-red-500 hover:text-red-700 mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newTask = prompt("Edit task:", t.text);
                                    if (newTask !== null && newTask.trim()) {
                                        const updatedTasks = tasks.map((task, i) =>
                                            i === index ? { ...task, text: newTask } : task
                                        );
                                        setTasks(updatedTasks);
                                    }
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
    </>
  )
}

export default Dashboard