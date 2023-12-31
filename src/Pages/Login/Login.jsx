
import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Component/SocialLogin/SocialLogin';

const Login = () => {
  const {signInUser} = useAuth()
    const [disabled, setDisabled] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location)
const  from = location.state?.from.pathname || '/'

    useEffect( () =>{
        loadCaptchaEnginge(6); 
    } ,[])

    const handelValidate = (e) =>{
      const user_captcha_value = e.target.value
      if(validateCaptcha(user_captcha_value)){
          setDisabled(false)
          
      }else{
          alert('wrong captcha')
      }
   
  }

    const handelLogin = event =>{
        event.preventDefault()
        const form = event.target 
        const email = form.email.value 
        const password = form.password.value 
        console.log(email, password)
        
        signInUser(email, password)
        .then(res => {
          const user = res.user
          console.log(user)
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, {replace: true})
        })
        .catch(error =>{
          console.error(error)
        })

    }

  

  return (
   <>
   <Helmet>
    <title>Boss | Login</title>
   </Helmet>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">

              <LoadCanvasTemplate />

              </label>
              <input 
              onBlur={handelValidate}
                type="text"
                placeholder="type the captcha above"
                // ref = {captchaRef}
                name="captcha"
                className="input input-bordered"
                
              />
            
            </div>
            <div className="form-control mt-6">
              {/* apply disabled button  */}
              <input disabled = {false} className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>

          <div className='mb-5 text-center'>
            <h1>New Here ? please <Link to='/register'>Create an Account</Link> </h1>
          </div>

          <div className="w-full px-5">
          <SocialLogin></SocialLogin>
        </div>

        </div>
      </div>
    </div>
   </>
  );
};

export default Login;
