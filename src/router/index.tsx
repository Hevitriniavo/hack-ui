import { createBrowserRouter } from "react-router-dom";
import privateRoute from "./privateRoute";
import PrivateRoute from "../ui/layouts/PrivateLayoute";
import { HomeView } from "../views/HomeView";
import { NotFoundView } from "../views/NotFoundView";
import { LoginView } from "../views/auth/LoginView";
import { RegisterView } from "../views/auth/RegisterView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeView />,
     },
     {
        path: "/login",
        element: <>
          <LoginView />
        </>
     },
     {
        path: "/register",
        element: <>
          <RegisterView />
        </>
     },
     {
        path: "/admin",
        element: <PrivateRoute />,
        children: [
            ... privateRoute
        ]
     },
     {
        path: "/*",
        element:  <NotFoundView /> 
     }
]);

export default router;



