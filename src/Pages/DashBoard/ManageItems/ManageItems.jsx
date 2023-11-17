import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, loading, refetch] = useMenu()
    const axiosSecure = useAxios()


    const handelDelete = (item) =>{
        // console.log(item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
            if (result.isConfirmed) {
                
             const res = await axiosSecure.delete(`/menu/${item._id}`)

                    if(res.data.deletedCount > 0){
                         Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                        });
                        refetch()
                    }                            
            }
            });
    }

  
    return (
        <div>
            <SectionTitle subTitle={"Hurry up"} title={"manage items"}></SectionTitle>

            <div>
            <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="w-full bg-orange-300 text-white rounded-lg  text-xl">
            <tr>
              <th>
              Items
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                menu?.map((item, idx) =>  <tr key={item._id}>
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
                    <td>$ {item.price}</td>
                    <th>
                      <Link to={`/dashBoard/updateItem/${item._id}`}>
                      <button className="btn p-2"> <FaEdit className="text-xl text-orange-500"></FaEdit> </button>
                      </Link>
                    </th>
                    <th>
                      <button onClick={() =>handelDelete(item)} className="btn  p-2"> <FaTrashAlt className="text-xl text-red-500"></FaTrashAlt> </button>
                    </th>
                  </tr>)
            }
           
          </tbody>
        </table>
      </div>
            </div>
        </div>
    );
};

export default ManageItems;