import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const UpdateItem = () => {
    const { register, handleSubmit, reset } = useForm();
   const {name, category, recipe, image, price, _id} = useLoaderData()
   const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxios()
    console.log(_id)

   const onSubmit = async (data) => {
    console.log(data);
    // image upload to imagebb and get a url for this image 
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers:{
            'content-type' : 'multipart/form-data'
        }
    })
    if(res.data.success){
        // now send the menu item data send the database 
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // send data to the database 
        const menuResponse = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuResponse.data)
        if(menuResponse.data.modifiedCount > 0){
            // reset()
            //show success popup
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${data.name} is updated to the menu`,
                showConfirmButton: false,
                timer: 1500
              });

        }
    }
  };

   
    return (
        <div>
            <SectionTitle subTitle={"items"} title={"Update Item"} ></SectionTitle>
            <div>
            <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      
      {/* name field  */}
          <div className="form-control w-full my-7 ">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
            {...register("name", { required: true })}
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>

          <div className=" md:flex gap-5 my-7">
            {/* for category  */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Select a Category</span>
            </label>
            <select 
            defaultValue={category}
            {...register("category", { required: true })}
            className="select select-bordered w-full">
            <option disabled value="default">Select a Category</option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          </div>

            {/* for price  */}
            <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
            {...register("price")}
              type="text"
              defaultValue={price}
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full "
            />
          </div>
            </div>

            {/* for textarea recipe details  */}
            <div className="form-control">
            <label className="label">
                <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register("recipe", { required: true })} defaultValue={recipe} className="textarea textarea-bordered h-24" placeholder="Text Here"></textarea>
            </div>   

            {/* file input  */}
            <div className="mt-5">
            <input {...register("image", { required: true })} type="file" className="file-input w-full bg-orange-200 max-w-xs" />
            </div>

                <div className="mt-5">
                    <button className="btn bg-orange-400 hover:bg-orange-500  text-white">
                       update menu item <FaUtensils className="text-2xl text-white"></FaUtensils>
                    </button>
                </div>
        </form>
      </div>
            </div>
        </div>
    );
};

export default UpdateItem;