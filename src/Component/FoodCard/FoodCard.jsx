import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";


const FoodCard = ({item}) => {
    const{name, image, recipe, price, _id} = item
    const {user} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxios()
    const [, refetch] = useCart()


    const handelAddToCart = food =>{
      if(user && user.email){
        //cart send to the database
        // console.log(user.email, food)
        const cartItem = {
          cartId : _id,
          email: user.email,
          name,
          image,
          price
        }
        // send data to the database 
        axiosSecure.post('/carts', cartItem)
        .then(res =>{
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${name} added to your cart`,
              showConfirmButton: false,
              timer: 2000
            });

            // refetch the cart 
            refetch()
          }
        })
        
      }
      else{
        Swal.fire({
          title: "You are not login",
          text: "Please Login to Add cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Please, Login!"
        }).then((result) => {
          if (result.isConfirmed) {
          //  send the user to login page 
          navigate('/login', {state: {from: location}})
          }
        });
      }
    }


  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
        <p className="absolute right-2 top-0 px-4 rounded-lg bg-slate-900 p-1 text-white text-lg font-semibold"> ${price} </p>
      <div className="card-body flex flex-col items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
      
        <div className="card-actions justify-center">
          <button
          onClick={()=>handelAddToCart(item)}
          className="btn btn-outline border-0 border-b-4 bg-orange-50 border-orange-500 text-orange-500 hover:bg-orange-500">add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
