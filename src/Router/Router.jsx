import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import OrderFood from "../Pages/Order/OrderFood/OrderFood";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivetRoute from "./PrivetRoute";
import DashBoard from "../Layout/DeshBoard/DashBoard";
import MyCart from "../Pages/DashBoard/MyCart/MyCart";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";


const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/menu',
                element:<Menu></Menu>
            },
            {
                path:'orderFood/:category',
                element:<OrderFood></OrderFood>
            },
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path:'register',
                element:<Register></Register>
            }
        ]
    },
    {
        path:'dashBoard',
        element:<PrivetRoute><DashBoard></DashBoard></PrivetRoute>,
        children:[
            {
                path:'cart',
                element:<MyCart></MyCart>
            },

            //admin routes
            {
                path: 'allUsers',
                element:<AllUsers></AllUsers>

            }
        ]
    }
])

export default router;