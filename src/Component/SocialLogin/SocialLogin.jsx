import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()



    const handelGoogleSignIn = () =>{
        googleSignIn()
        .then( res =>{
            console.log(res.user)

            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName 
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    
  return (
    <div  className="px-4">
        <div className="divider"></div>
      <div className="py-3">
        <button onClick={handelGoogleSignIn} className="btn w-full">
          <FaGoogle className="text-green-500 text-3xl"></FaGoogle>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
