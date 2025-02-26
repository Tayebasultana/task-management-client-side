import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { authContext } from "../../AuthProvider/AuthProvider";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(authContext);

    // Redirect if user is not logged in
    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirect to login page if user is not logged in
        }
    }, [user, navigate]);

    // Check if user exists and access the email
    const email = user ? user.email : null;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate title length
        if (title.length > 50) {
            setError("Title cannot exceed 50 characters");
            return;
        }

        // Ensure email exists before proceeding
        if (!email) {
            setError("User is not authenticated.");
            return;
        }

        // Prepare task data
        const newTask = {
            title,
            description,
            category,
            timestamp: new Date().toISOString(),
            email: email,
        };

        // Post task using axiosPublic
        axiosPublic.post("/tasks", newTask) 
            .then((res) => {
                console.log(res.data); // Log the response
                console.log("Task added successfully");
                toast.success('Task created successfully!');
                navigate("/tasks"); // Navigate to tasks page after success
            })
            .catch((error) => {
                setError("Error creating task. Please try again.");
                console.error(error);
            });
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="container mx-auto py-28">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg ">
            <h2 className="text-center text-3xl font-semibold mb-6">Add New Task</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength="50"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optional)</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="200"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        placeholder="Enter task description (optional)"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>
        </div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default AddTask;
