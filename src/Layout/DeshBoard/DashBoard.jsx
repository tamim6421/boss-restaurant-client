import { NavLink, Outlet } from "react-router-dom";
import { BsFillCartCheckFill, BsFillCalendar2Fill, BsFillClipboard2DataFill,BsFillBookmarkPlusFill } from "react-icons/bs";
import { MdPayment, MdMenu } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import useCart from "../../Hooks/useCart";


const DashBoard = () => {
    const [cart] = useCart()
    return (
        <div>
            <div className="flex">
                {/* dashboard sidebar  */}
                <div className="w-64 min-h-screen bg-orange-300">
                    <ul className="menu space-y-5 p-4">
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
                        <div className="divider font-semibold"></div>
                        <li>
                            <NavLink to='/'> <BiHomeAlt className="text-2xl"></BiHomeAlt> Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu'> <MdMenu className="text-2xl"></MdMenu> Menu</NavLink>
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