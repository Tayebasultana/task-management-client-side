import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Tasks from "../pages/Tasks/Tasks";
import AddTask from "../pages/AddTask/AddTask";
import Login from "../pages/Login/Login";
import ManageTask from "../pages/ManageTask/ManageTask";
import UpdateModal from "../components/Modal/UpdateModal";

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
        element: <Tasks></Tasks>,
    },
    {
        path: "/add-task",
        element: <AddTask></AddTask>,
    },
    {
      path: "/manage-task",
      element: <ManageTask></ManageTask>
    },
    {
      path: "/update-task",
      element: <UpdateModal></UpdateModal>
    }
  ]);

  export default router;