import { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { authContext } from "../../AuthProvider/AuthProvider"; 
import Swal from "sweetalert2";
import axios from "axios";
import UpdateModal from "../../components/Modal/UpdateModal";

const ManageTask = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(authContext); // Get user from authContext
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Fetch all tasks when the component is mounted
    useEffect(() => {
        if (user && user.email) { // Check if user and user.email exist
            const fetchTasks = async () => {
                try {
                    const response = await axiosPublic.get(`/tasks/${user.email}`);
                    setTasks(response.data); 
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
    }, [axiosPublic, user]); // Add user to dependency array

    // Function to handle task deletion
    const handleDeleteTask = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // If confirmed, delete the task
                try {
                    const response = await axiosPublic.delete(`/tasks/${id}`);
                    if (response.data.deletedCount > 0) {
                        // Remove the deleted task from the state
                        setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success",
                        });
                        alert("Task deleted successfully!");
                    }
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting your task.",
                        icon: "error",
                    });
            }
        } else {
            // If user clicked cancel
            console.log("Task deletion was canceled");
            Swal.fire({
                title: "Canceled",
                text: "Your task was not deleted.",
                icon: "info",
            });
           }
        });
    };


    // Function to handle task update
    const openUpdateModal = (task) => {
        setSelectedTask(task); // Set the selected task to be updated
        setIsModalOpen(true);  // Open the modal
    };
    
    const closeUpdateModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedTask(null);  // Clear the selected task
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            console.log("Updating task with ID:", id);
            console.log("Updated task data:", updatedTask);
    
            const response = await axiosPublic.patch(`/task/${id}`, updatedTask);
            if (response.data.modifiedCount > 0) {
                setTasks((prevTasks) =>
                    prevTasks.map(task =>
                        task._id === id ? { ...task, ...updatedTask } : task
                    )
                );
                Swal.fire({
                    title: "Updated!",
                    text: "Your task has been updated.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue updating your task.",
                icon: "error",
            });
        }
    };
    
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4 py-20 text-center min-h-screen">
                <h1 className="text-4xl">Manage Task</h1>
                <p className="text-xl font-bold my-4">Manage your tasks here</p>

                {/* Show loading state */}
                {loading && <p className="text-center">Loading tasks...</p>}

                {/* Show error state */}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Display tasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                        <div key={task._id} className="card bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.description}</p>
                                <p className="font-bold">Category: {task.category}</p>
                                <div className="card-actions justify-end">
                                    {/* Update Button */}
                                    <button
                                        onClick={() => openUpdateModal(task)}
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="btn btn-ghost"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* modal */}
            {isModalOpen && (
            <UpdateModal
                task={selectedTask}
                onClose={closeUpdateModal}
                onUpdate={handleUpdateTask}
            />
        )}
            <Footer />
        </div>
    );
};

export default ManageTask;