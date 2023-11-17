import { NavLink, Outlet } from "react-router-dom";
import { BsFillCartCheckFill, BsFillCalendar2Fill, BsFillClipboard2DataFill,BsFillBookmarkPlusFill } from "react-icons/bs";
import { MdPayment, MdMenu } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import useCart from "../../Hooks/useCart";
import { FaList, FaPhone, FaUser, FaUtensils } from "react-icons/fa";
import useAdmin from "../../Hooks/useAdmin";


const DashBoard = () => {
    const [cart] = useCart()

    //toDo: get is admin value to the database 
    const [isAdmin] = useAdmin()



    return (
        <div>
            <div className="flex flex-col md:flex-row">
                {/* dashboard sidebar  */}
                <div className="w-64 max-h-max bg-orange-300">
                    <ul className="menu space-y-5 p-4">
                       
                       {
                        isAdmin? <>
                         <li>
                            <NavLink to='/dashBoard/adminHome'> <BiHomeAlt className="text-2xl"></BiHomeAlt>Admin Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/addItems'> <FaUtensils className="text-2xl"></FaUtensils>  Add Items</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/manageItems'> <FaList className="text-2xl"></FaList> Manage Items</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/review'> <BsFillClipboard2DataFill className="text-2xl"></BsFillClipboard2DataFill>Manage Bookings</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/allUsers'> <FaUser className="text-2xl"></FaUser>All Users</NavLink>
                        </li>
                       


                        </> : 
                         <>
                          <li>
                            <NavLink to='/dashBoard/userHome'> <BiHomeAlt className="text-2xl"></BiHomeAlt>User Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/cart'> <BsFillCartCheckFill className="text-2xl"></BsFillCartCheckFill>  My Cart ({cart.length})</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/reservation'> <BsFillCalendar2Fill className="text-2xl"></BsFillCalendar2Fill> Reservation</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/review'> <BsFillClipboard2DataFill className="text-2xl"></BsFillClipboard2DataFill> Add Review</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/bookings'> <BsFillBookmarkPlusFill className="text-2xl"></BsFillBookmarkPlusFill>My Bookings</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashBoard/payment'> <MdPayment className="text-2xl"></MdPayment>Payment</NavLink>
                        </li>

                         </>
                       }

                        <div className="divider font-semibold"></div>

                        {/* shared menu items  */}
                        <li>
                            <NavLink to='/'> <BiHomeAlt className="text-2xl"></BiHomeAlt> Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu'> <MdMenu className="text-2xl"></MdMenu> Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact'> <FaPhone className="text-2xl"></FaPhone> Contact</NavLink>
                        </li>
                    </ul>
                </div>

                    {/* DashBoard content  */}
                <div className="flex-1 p-5">
                    <Outlet></Outlet>
                </div>

            </div>
            
        </div>
    );
};

export default DashBoard;