import Announcements from "../pages/Announcements/Announcements";
import ApartmentRequests from "../pages/ApartmentRequests/ApartmentRequests";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageAnouncements from "../pages/ManageAnnouncments.jsx/ManageAnouncements";
import ManageCoupons from "../pages/ManageCoupons/ManageCoupons";
import ManageMembers from "../pages/ManageMembers/ManageMembers";
import MyProfile from "../pages/MyProfile/MyProfile";
import AdminRoute from "../pages/PrivateRoute/AdminRoute";
import MemberRoute from "../pages/PrivateRoute/MemberRoute";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";

export const dashboardRoutes = [
    {
        path: '',
        element: <Dashboard />
    },
    {
        path: '/dashboard/my-profile',
        element: <PrivateRoute> <MyProfile /> </PrivateRoute>
    },
    {
        path: '/dashboard/anouncements',
        element: <PrivateRoute> <Announcements /> </PrivateRoute>
    },
    {
        path: '/dashboard/make-payment',
        element: <MemberRoute> <h1>make payments</h1> </MemberRoute>
    },
    {
        path: '/dashboard/payment-history',
        element: <MemberRoute> <h1>payments history</h1> </MemberRoute>
    },
    {
        path: '/dashboard/manage-members',
        element: <AdminRoute> <ManageMembers /> </AdminRoute>
    },
    {
        path: '/dashboard/make-anouncements',
        element: <AdminRoute> <ManageAnouncements /> </AdminRoute>
    },
    {
        path: '/dashboard/agreement-requests',
        element: <AdminRoute> <ApartmentRequests /> </AdminRoute>
    },
    {
        path: '/dashboard/manage-coupons',
        element: <AdminRoute> <ManageCoupons /> </AdminRoute>
    },
]