import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import SocialLogin from "../../Component/SocialLogin/SocialLogin";




const Register = () => {
  const axiosPublic = useAxiosPublic()
    const {createUser, updateUserProfile} = useAuth()
    const navigate = useNavigate()
  

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit= (data) => {
        console.log(data)
        createUser(data.email, data.password)

        .then( res => {
            const user = res.user
            console.log(user)
           
            updateUserProfile(data.name, data.photoURL)
            .then( () =>{

              // send user data to the database 
              const userInfo = {
                name: data.name,
                email: data.email
              }

              axiosPublic.post('/users', userInfo )
              .then( res => {
                console.log(res.data)
                if(res.data.insertedId){
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "User Created Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
                  navigate('/')
                }
              })

              
            })
            .catch(error =>{
              console.log(error)
            })
        })

        .catch(error =>{
            console.error(error)
        })
      }

    //   console.log(watch("example")) 

    // const handelRegister = event =>{
    //     event.preventDefault()
    //     const form = event.target 
    //     const email = form.email.value 
    //     const password = form.password.value 
    //     console.log(email, password)
        
    //     signInUser(email, password)
    //     .then(res => {
    //       const user = res.user
    //       console.log(user)
    //     })
    //     .catch(error =>{
    //       console.error(error)
    //     })

    // }


    return (
    <div>
        <Helmet>
            <title>Boss | Register </title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Register!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="User Name"
                className="input input-bordered"
                
              />
              {errors.name && <span className="text-red-500">This field is required </span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
                
              />
              {errors.photoURL && <span className="text-red-500">photoURL field is required </span>}
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
               {errors.email && <span className="text-red-500">This field is required </span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                {...register("password", 
                { required: true , 
                    minLength: 6,
                     maxLength : 20,
                    pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    })}
                className="input input-bordered"
                
              />
                {errors.password?.type === "required" && (
        <p className="text-red-500" role="alert">Password is required</p>
      )}
                {errors.password?.type === "minLength" && (
        <p className="text-red-500" role="alert">Password must be 6 characters</p>
      )}
                {errors.password?.type === "maxLength" && (
        <p className="text-red-500" role="alert">Password must be less then 20 characters</p>
      )}
                {errors.password?.type === "pattern" && (
        <p className="text-red-500" role="alert">Password must be one uppercase one lowercase one number and one lowercase</p>
      )}
              <label className="label">
              
              </label>
            </div>
    
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Register" />
            </div>
          </form>
                
        <p className="pb-5 text-center">already have  an account <Link className="text-orange-500 underline" to='/login'> Login</Link> </p>

        <div className="w-full px-5">
          <SocialLogin></SocialLogin>
        </div>
        
        </div>
      </div>
    </div>
        
    </div>
    );
};

export default Register;