import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';


 const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxios = () => {
   const{logOut} = useAuth()
   const navigate = useNavigate()
   // use for every secure api 
   
      axiosSecure.interceptors.request.use(function(config){
         const token = localStorage.getItem('access-token')
         // console.log('stop by interceptors', token)
         config.headers.authorization = `Bearer ${token}`
         return config
      }, function (error) {
         return Promise.reject(error);
      });

      //intercept 401 and 403 api 
      axiosSecure.interceptors.response.use(function (response) {
         return response;

       }, async  (error) => {
         const status = error.response.status
         // console.log('status error in the interceptors', status)
         //for 401 and 402 logout the users and move to the login page 
         if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
         }
         return Promise.reject(error);
       });

  
   return axiosSecure
};

export default useAxios;