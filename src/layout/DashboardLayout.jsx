import { House, Hotel, SquareChartGantt, Menu, BookUser, BadgeAlert, CreditCard, BadgeDollarSign, UsersRound, Megaphone, Handshake, CirclePercent } from 'lucide-react';
import { NavLink, Outlet } from "react-router"
import logo from "../assets/logo (3).webp"
import useUserData from '../hooks/useUserData';

function DashboardLayout() {

    const { data, isLoading } = useUserData()

    const menu = <>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/">
                <House /> Home
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/apartments">
                <Hotel /> Apartments
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard">
                <SquareChartGantt /> Dashboard
            </NavLink>
        </li>
    </>

    const userLinks = <>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/my-profile">
                <BookUser /> My Profile
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/anouncements">
                <BadgeAlert /> Announcements
            </NavLink>
        </li>
    </>

    const memberLinks = <>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/my-profile">
                <BookUser /> My Profile
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/make-payment">
                <CreditCard /> Make Payments
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/payment-history">
                <BadgeDollarSign /> Payment History
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/anouncements">
                <BadgeAlert /> Announcements
            </NavLink>
        </li>
    </>

    const adminLinks = <>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/my-profile">
                <BookUser /> My Profile
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/manage-members">
                <UsersRound /> Manage Members
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/make-anouncements">
                <Megaphone /> Make Announcements
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/agreement-requests">
                <Handshake /> Agreement Requests
            </NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => `my-1 py-2 ${isActive ? "active text-base-100 font-bold" : ""}`} to="/dashboard/manage-coupons">
                <CirclePercent /> Manage Coupons
            </NavLink>
        </li>
    </>

    return (
        <>
            <div>
                <div className="drawer sm:drawer-open">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className='flex justify-between p-2 sticky top-0 bg-base-100 shadow-sm sm:hidden'>
                            <img className='w-20' src={logo} alt="" />

                            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                                <Menu />
                            </label>
                        </div>
                        <Outlet />
                    </div>
                    <div className="drawer-side z-10">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-64 lg:w-80 p-4">
                            <h3 className='text-center font-bold text-lg bg-primary text-base-100 p-3 rounded-sm'>Dashboard</h3>

                            <div className="divider font-medium my-6">ALL MENU</div>

                            {menu}

                            <div className="divider font-medium uppercase my-6">{data?.role}</div>
                            {
                                !isLoading && (data?.role === "user" ? userLinks : data?.role === "member" ? memberLinks : data?.role === "admin" ? adminLinks : <p className='text-center text-error'>Role Not Found !</p>)
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout