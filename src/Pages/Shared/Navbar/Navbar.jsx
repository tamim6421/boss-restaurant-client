import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const {logOut, user} = useAuth()
  const handelLogout = () =>{
    logOut()
    .then( () =>{

    })
    .catch(error =>{
      console.log(error)
    })
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-orange-400 font-semibold text-xl" : "text-white text-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-orange-400 font-semibold text-xl" : "text-white text-lg"
          }
        >
         Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/orderFood/salad"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-orange-400 font-semibold text-xl" : "text-white text-lg"
          }
        >
          Order Food
        </NavLink>
      </li>
     
      {
        
        user? <>
        <p className="text-center mt-4">{user.displayName}</p>
        <button onClick={handelLogout} className="btn btn-ghost">Logout</button>  </> : <> <li>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-orange-400 font-semibold text-xl" : "text-white text-lg"
          }
        >
          Login
        </NavLink>
      </li> </>
      }
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-40 max-w-[1250px]  bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">BOSS RESTAURANT</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-neutral">get started</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
