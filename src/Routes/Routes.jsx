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
import PrivateRoute from "./PrivateRoute";
import MyRecommendations from "../Pages/MyRecommendations/MyRecommendations";
import RecommendationMine from "../Pages/RecommendationMine/RecommendationMine";

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
                element: <PrivateRoute><MyQueries></MyQueries></PrivateRoute>
            },
            {
                path: "/add-queries",
                element: <PrivateRoute><AddQueries></AddQueries></PrivateRoute>
            },
            {
                path: "/queries",
                element: <Queries></Queries>,
                // loader: () => fetch(`${import.meta.env.VITE_API_URL}/queries`)
            },
            {
                path: "/query/:id",
                element: <PrivateRoute><QueryDetails></QueryDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`, { credentials: 'include' })
            },
            {
                path: "/update/:id",
                element: <PrivateRoute><UpdateQueries></UpdateQueries></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/query/${params.id}`, { credentials: 'include' })
            },
            {
                path: "/my-recommendation",
                element: <PrivateRoute><MyRecommendations></MyRecommendations></PrivateRoute>
            },
            {
                path: "/recommendation-me",
                element: <PrivateRoute><RecommendationMine></RecommendationMine></PrivateRoute>
            }
        ]
    },
]);

export default router;