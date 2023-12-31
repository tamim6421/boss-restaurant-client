import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxios()

    const { refetch, data : users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    // console.log(users)

    const handelMakeAdmin = (user) =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${user.name} is at Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                    });
         }
        })

    }

    const handelDeleteUser = (user) =>{
        // console.log(user)
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
               
                axiosSecure.delete(`/users/${user._id}`)
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
            <div className="flex justify-evenly my-4">
            <h1 className="text-2xl font-bold ">All Users: </h1>
            <h1 className="text-2xl font-bold ">Total Users: {users.length} </h1>
            </div>

            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr className="bg-orange-300 rounded-lg text-lg text-white uppercase">
        <th>Num</th>
        <th>Name</th>
        <th>Email</th>
        <th>Roll</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
        users?.map( (user, idx) => <tr key={user._id}>
            <th>{idx+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {/* make admin conditionally  */}
           { user.role === 'admin'? 'Admin' : <button 
            onClick={()=>handelMakeAdmin(user)}
             className="btn bg-orange-300  p-2"> <FaUsers className="text-xl text-white"></FaUsers> </button>}
            </td>
            <td>
                 <button onClick={() =>handelDeleteUser(user)} className="btn  p-2"> <FaTrashAlt className="text-xl text-red-500"></FaTrashAlt> </button></td>
          </tr> )
      }
    
    </tbody>
  </table>
             </div>
            </div>
        </div>
    );
};

export default AllUsers;