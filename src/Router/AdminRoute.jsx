import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <h3 className="text-center text-3xl mt-36"> Loading .......</h3>
    }

    if(user && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace ></Navigate>
};

export default AdminRoute;