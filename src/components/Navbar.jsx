import { NavLink, useLocation, useNavigate } from "react-router"
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from "../assets/logo.webp"
import aparment from "../assets/building.webp"
import login from "../assets/password.webp"
import profile from "../assets/profile.webp"
import { useContext, useState } from "react";
import { AuthContext } from '../utils/AuthProvider'

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [order, setOrder] = useState(parseInt(localStorage.getItem("navOrder")) || 4)

  const increaseOrder = () => {
    setOrder(prev => {
      localStorage.setItem("navOrder", prev + 2)
      return prev + 2
    })
  }

  const decreaseOrder = () => {
    setOrder(prev => {
      localStorage.setItem("navOrder", prev - 2)
      return prev - 2
    })
  }

  return (
    <div className="flex mt-1 sticky top-1 -mb-14 z-50 pointer-events-none">
      <div className="flex-1 bg-transparent order-3"></div>

      <div className={`flex items-center pointer-events-auto`} style={{ order: order }}>
        <button
          className={`cursor-pointer text-warning disabled:text-base-300`}
          onClick={decreaseOrder}
          disabled={order === 2}>
          <ChevronLeft />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4 pl-3 pr-2 py-1 rounded-full text-lg shadow-sm z-10 bg-base-100">

          <NavLink className="border inline-block rounded-full" to="/">
            <div className="w-9 h-9 rounded-full">
              <img className="translate-x-[1px]s translate-y-[2.2px] scale-125" src={logo} />
            </div>
          </NavLink>

          <NavLink className="p-[6px] rounded-full" to="/apartments">
            <img className="w-8 h-8 rounded-full" src={aparment} />
          </NavLink>

          {
            user ? <div className="relative cursor-pointer p-[6px] rounded-full focus-within:bg-accent group" tabIndex={0}>
              <img className="w-8 h-8 rounded-full overflow-hidden object-cover border border-base-300" src={user?.photoURL || profile} referrerPolicy="no-referrer" alt="" />

              <div className="absolute bottom-40 -right-4 max-w-56 whitespace-nowrap rounded-lg p-2 bg-base-100 shadow-md group-focus-within:-bottom-[150px] transition-[bottom] -z-10">
                <h3 className="capitalize line-clamp-1 font-medium mb-1 bg-secondary text-white rounded-sm p-2 text-sm cursor-default">{user?.displayName || "no name"}</h3>

                <NavLink className="btn btn-accent text-white mb-1 w-full" to="/dashboard">
                  Dashboard
                </NavLink> <br />

                <button className="btn btn-accent text-white w-full" onClick={() => {
                  logout()
                  pathname !== "/" && navigate("/")
                }}>
                  Logout <LogOut size={16} />
                </button>
              </div>
            </div> : <NavLink className="p-[6px] rounded-full" to="/login">
              <img className="w-8 h-8 rounded-full" src={login} />
            </NavLink>
          }

        </div>

        <button
          className={`cursor-pointer text-warning disabled:text-base-300`}
          onClick={increaseOrder}
          disabled={order === 6}>
          <ChevronRight />
        </button>
      </div>

      <div className="flex-1 order-5"></div>
    </div>
  )
}

export default Navbar