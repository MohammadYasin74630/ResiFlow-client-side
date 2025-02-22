import { useContext } from "react"
import useUserData from "../../hooks/useUserData"
import { AuthContext } from "../../utils/AuthProvider"
import { Riple } from 'react-loading-indicators';
import { Info, KeyRound, UserRoundPen, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import profile from "../../assets/profile.webp"
import { Tooltip } from "react-tooltip";

function MyProfile() {

    const { loading, logout } = useContext(AuthContext)
    const { loading: userDataLoading, data: userData } = useUserData()
    const navigate = useNavigate()
    const error = (msg) => toast.error(msg)

    if (userData?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Apartments Failed !</p>

    if (loading || userDataLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <div className="max-w-96 mt-40 m-1 min-[420px]:mx-auto bg-base-100 p-2 lg:p-4 rounded-sm shadow-sm">
                <div className="relative z-10 rounded-sm overflow-hidden -mt-16 border border-base-300">
                    <img className="w-full object-cover" src={userData?.apartment?.apartmentImage} alt="" width="832" height="448" />
                    {
                        userData?.apartment?.acceptedAt && <p className="absolute bottom-0 z-10 bg-base-content text-base-100 w-full rounded-sm font-medium p-1"><span className="max-[300px]:hidden">Agreement Accepted </span>Date: <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(userData?.apartment?.acceptedAt || Date.now()).toDateString()}>{new Intl.DateTimeFormat('en-GB').format(new Date(userData?.apartment?.acceptedAt || Date.now()))}</span></p>
                    }
                </div>

                <div className="flex flex-wrap gap-2 py-2">
                    <img className="w-2/4 object-cover rounded-sm border border-base-300" src={userData?.profileImg || profile} alt="" />
                    <div className="font-medium flex-1 space-y-1 text-base-100">
                        <p className="bg-base-content/50 p-3 rounded-sm">Room: {userData?.apartment?.apartmentNo || "none"}</p>
                        <p className="bg-base-content/50 p-3 rounded-sm">Rent: {userData?.apartment ? `$${userData?.apartment?.rent}` : "none"}</p>
                        <p className="bg-base-content/50 p-3 rounded-sm">Floor: {userData?.apartment?.floorNo || "none"}</p>
                        <p className="bg-base-content/50 p-3 rounded-sm">{userData?.apartment ? userData?.apartment?.blockName.replace(" ", ": ") : "Block: none"}</p>
                    </div>
                </div>

                <div className="py-2 text-center">
                    <div className="badge badge-primary badge-outline capitalize">{userData?.role || "none"}</div>
                    <p className="font-bold text-lg my-1 capitalize">{userData?.name}</p>
                    <p className="mb-3 font-medium text-base-content/80 line-clamp-1">{userData?.email.split(/\b/).map(
                        (itm, idx) => <span key={idx}>{itm}<wbr /></span>
                    ) || "none"}</p>

                    <button className="bg-neutral/50 p-1 rounded-sm text-base-100 ">
                        <UserRoundPen />
                    </button>

                    <Link to="/forgot-password" state={{ email: userData?.email }}>
                        <button className="bg-neutral p-1 rounded-sm text-base-100 cursor-pointer active:scale-90 transition-[scale] mx-1">
                            <KeyRound />
                        </button>
                    </Link>

                    <button className="bg-neutral p-1 rounded-sm text-base-100 cursor-pointer active:scale-90 transition-[scale]" onClick={() => {
                        logout()
                            .then(() => navigate("/"))
                            .catch((err) => error(err.message))
                    }}>
                        <LogOut />
                    </button>

                </div>

            </div >
            <Tooltip className="!bg-warning" id="date-tooltip" />
            <div className="h-screen"></div>
        </>
    )
}

export default MyProfile