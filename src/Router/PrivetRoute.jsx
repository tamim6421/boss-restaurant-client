
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <h3 className="text-center text-3xl mt-36"> Loading .......</h3>
    }

    if(user){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace ></Navigate>
};

export default PrivetRoute;