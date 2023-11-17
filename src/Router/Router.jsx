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
import AddItems from "../Pages/DashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/DashBoard/ManageItems/ManageItems";
import UpdateItem from "../Pages/DashBoard/UpdaateItem/UpdateItem";


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
                element:<PrivetRoute><Menu></Menu></PrivetRoute>
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
            // normal users routes 
            {
                path:'cart',
                element:<MyCart></MyCart>
            },

            //admin only routes
            {
                path: 'allUsers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'addItems',
                element: <PrivetRoute><AdminRoute><AddItems></AddItems></AdminRoute></PrivetRoute>
            },
            {
                path:'manageItems',
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path:'updateItem/:id',
                element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
                
            }
        ]
    }
])

export default router;