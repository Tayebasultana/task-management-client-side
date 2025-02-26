import { useEffect, useState, useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Tasks = () => {
    const { user } = useContext(authContext); 
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch tasks when component is mounted
    useEffect(() => {
        if (user && user.email) {
            const fetchTasks = async () => {
                try {
                    const response = await axiosPublic.get(`/tasks/${user.email}`);
                    const tasksData = response.data;

                    // Categorize tasks based on their category
                    const categorizedTasks = {
                        todo: tasksData.filter(task => task.category === "To-Do"),
                        inProgress: tasksData.filter(task => task.category === "In Progress"),
                        done: tasksData.filter(task => task.category === "Done"),
                    };

                    // Update state with categorized tasks
                    setTasks(categorizedTasks);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    setError("Error fetching tasks");
                    setLoading(false);
                }
            };

            fetchTasks();
        } else {
            console.log("User not logged in or email not available");
            setLoading(false);
        }
    }, [user]); 

    const updateTaskCategory = async (id, newCategory) => {
        try {
            console.log("Updating task:", id, newCategory); // Log the data being sent
            const response = await axiosPublic.patch(`/tasks/${id}`, {
                category: newCategory,
            });
    
            console.log("Update response:", response.data); // Log the response
    
            // If the update is successful, fetch tasks again
            if (response.data.modifiedCount > 0) {
                const fetchTasks = async () => {
                    try {
                        const response = await axiosPublic.get(`/tasks/${user.email}`);
                        const tasksData = response.data;
    
                        // Categorize tasks based on their category
                        const categorizedTasks = {
                            todo: tasksData.filter(task => task.category === "To-Do"),
                            inProgress: tasksData.filter(task => task.category === "In Progress"),
                            done: tasksData.filter(task => task.category === "Done"),
                        };
    
                        // Update state with categorized tasks
                        setTasks(categorizedTasks);
                    } catch (error) {
                        console.error("Error fetching tasks:", error);
                        setError("Error fetching tasks");
                    }
                };
    
                fetchTasks(); // Fetch tasks again after updating the category
            }
        } catch (error) {
            console.error("Error updating task category:", error);
            setError("Error updating task category");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-20">
                <h2 className="text-3xl font-bold text-center">Task Board</h2>

                {/* Show loading state */}
                {loading && <p className="text-center">Loading tasks...</p>}

                {/* Show error state */}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 min-h-96">
                    {/* To-Do Section */}
                    <div className="bg-blue-200 p-4">
                        <h4 className="text-2xl text-black p-7 font-bold">To-Do</h4>
                        {tasks.todo.length === 0 ? (
                            <p>No tasks in this category. Add some tasks to get started!</p>
                        ) : (
                            tasks.todo.map((task) => (
                                <div key={task._id} className="bg-white p-4 mb-4 rounded shadow">
                                    <h5 className="font-semibold">{task.title}</h5>
                                    <p>{task.description}</p>
                                    <button 
                                        onClick={() => updateTaskCategory(task._id, "In Progress")} 
                                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                                    >
                                        Start Working
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* In Progress Section */}
                    <div className="bg-blue-200 p-4">
                        <h4 className="text-2xl text-black p-7 font-bold">In Progress</h4>
                        {tasks.inProgress.length === 0 ? (
                            <p>No tasks in this category. Start working on some tasks!</p>
                        ) : (
                            tasks.inProgress.map((task) => (
                                <div key={task._id} className="bg-white p-4 mb-4 rounded shadow">
                                    <h5 className="font-semibold">{task.title}</h5>
                                    <p>{task.description}</p>
                                    <button 
                                        onClick={() => updateTaskCategory(task._id, "Done")} 
                                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                                    >
                                        Complete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Done Section */}
                    <div className="bg-blue-200 p-4">
                        <h4 className="text-2xl text-black p-7 font-bold">Done</h4>
                        {tasks.done.length === 0 ? (
                            <p>No tasks in this category. Complete some tasks to see them here!</p>
                        ) : (
                            tasks.done.map((task) => (
                                <div key={task._id} className="bg-white p-4 mb-4 rounded shadow">
                                    <h5 className="font-semibold">{task.title}</h5>
                                    <p>{task.description}</p>
                                    <button 
                                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                                    >
                                        Congrats!! Keep Working
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Tasks;