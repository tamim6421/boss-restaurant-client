import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxios()
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
//   console.log(totalPrice);

  const handelDelete = (id) =>{
    
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                console.log(id)
                axiosSecure.delete(`/carts/${id}`)
                .then(res =>{
                    console.log(res.data)
                    if(res.data.deletedCount > 0){
                         Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                        });
                        refetch()
                    }
                })
               
            }
            });
  }
  return (
    <div>
      <div className="flex justify-evenly mb-3 mt-10">
        <h1 className="text-2xl">Total Order : {cart.length} </h1>
        <h1 className="text-2xl">Total Price : {totalPrice} </h1>
        <button className="btn btn-accent">payment</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="w-full bg-gray-100  text-xl">
            <tr>
              <th>
              Items
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                cart?.map((item, idx) =>  <tr key={item._id}>
                    <th>
                        {idx + 1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-20 h-20">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        
                      </div>
                    </td>
                    <td>
                   {item.name}
                    </td>
                    <td>{item.price}</td>
                    <th>
                      <button onClick={() =>handelDelete(item._id)} className="btn  p-2"> <FaTrashAlt className="text-3xl text-red-500"></FaTrashAlt> </button>
                    </th>
                  </tr>)
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
