import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Tasks from "../pages/Tasks/Tasks";
import AddTask from "../pages/AddTask/AddTask";
import Login from "../pages/Login/Login";
import ManageTask from "../pages/ManageTask/ManageTask";
import UpdateModal from "../components/Modal/UpdateModal";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
        path: "/tasks",
        element: <ProtectedRoute><Tasks></Tasks></ProtectedRoute>,
    },
    {
        path: "/add-task",
        element: <ProtectedRoute><AddTask></AddTask></ProtectedRoute>,
    },
    {
      path: "/manage-task",
      element: <ProtectedRoute><ManageTask></ManageTask></ProtectedRoute>
    },
    {
      path: "/update-task",
      element: <ProtectedRoute><UpdateModal></UpdateModal></ProtectedRoute>
    }
  ]);

  export default router;