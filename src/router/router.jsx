import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Register></Register>,
    },
  ]);

  export default router;