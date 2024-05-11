import Main from "../Layouts/Main";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import MyQueries from "../Pages/MyQueries/MyQueries";
import AddQueries from "../Pages/AddQueries/AddQueries";
import Queries from "../Pages/Queries/Queries";
import QueryDetails from "../Pages/QueryDetails/QueryDetails";
import UpdateQueries from "../Pages/MyQueries/UpdateQueries";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/my-queries",
                element: <MyQueries></MyQueries>
            },
            {
                path: "/add-queries",
                element: <AddQueries></AddQueries>
            },
            {
                path: "/queries",
                element: <Queries></Queries>,
                // loader: () => fetch(`${import.meta.env.VITE_API_URL}/queries`)
            },
            {
                path: "/query/:id",
                element: <QueryDetails></QueryDetails>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`)
            },
            {
                path: "/update/:id",
                element: <UpdateQueries></UpdateQueries>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`)
            },
        ]
    },
]);

export default router;