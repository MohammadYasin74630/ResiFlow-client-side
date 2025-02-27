import { useContext } from "react"
import { Reoverlay } from 'reoverlay';
import UpdateUserModal from "../../components/UpdateUserModal";
import useUserData from "../../hooks/useUserData"
import { AuthContext } from "../../utils/AuthProvider"
import { Riple } from 'react-loading-indicators';
import { Info, KeyRound, UserRoundPen, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import profile from "../../assets/profile.webp"
import { Tooltip } from "react-tooltip";

function MyProfile() {

    const { loading, user, setUser, updateUserInfo, logout } = useContext(AuthContext)
    const { loading: userDataLoading, data: userData } = useUserData()
    const navigate = useNavigate()
    const error = (msg) => toast.error(msg)

    const updateProfile = () => {
        Reoverlay.showModal(UpdateUserModal, { user, setUser, updateUserInfo })
    }

    if (userData?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Apartments Failed !</p>

    if (loading || userDataLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
        <title>ResiFlow | My Profile</title>
            <div className="max-w-96 mt-28 m-1 min-[420px]:mx-auto bg-base-100 p-2 lg:p-4 rounded-sm shadow-sm">
                <div className="relative z-10 rounded-sm overflow-hidden -mt-16 border border-base-300">
                    <img className="w-full object-cover shadow-sm" src={userData?.apartment?.apartmentImage} alt="" width="832" height="448" />
                    {
                        userData?.apartment?.acceptedAt && <p className="absolute bottom-0 z-10 bg-base-content/60 text-base-100 w-full rounded-sm text-sm font-medium p-1"><span className="max-[300px]:hidden">Agreement Accepted </span>Date: <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(userData?.apartment?.acceptedAt || Date.now()).toDateString()}>{new Intl.DateTimeFormat('en-GB').format(new Date(userData?.apartment?.acceptedAt || Date.now()))}</span></p>
                    }
                </div>

                <div className="flex flex-wrap gap-1 py-1">
                    <img className="w-2/4 object-cover rounded-sm border border-base-300" src={user?.photoURL || userData?.profileImg || profile} alt="" />
                    <div className="font-medium flex-1 mt-[1px] space-y-1 text-base-100">
                        <p className="bg-accent p-3 rounded-sm ">Room: <span className={`${userData?.apartment?.status === "pending" && "opacity-50 align-middle "}`}>{userData?.apartment?.apartmentNo || "none"}</span></p>
                        <p className="bg-accent p-3 rounded-sm">Rent: <span className={`${userData?.apartment?.status === "pending" && "opacity-50 align-middle"}`}>{userData?.apartment ? `$${userData?.apartment?.rent}` : "none"}</span></p>
                        <p className="bg-accent p-3 rounded-sm">Floor: <span className={`${userData?.apartment?.status === "pending" && "opacity-50 align-middle"}`}>{userData?.apartment?.floorNo || "none"}</span></p>
                        <p className="bg-accent p-3 rounded-sm">{userData?.apartment ? <>{userData?.apartment?.blockName.split(" ")[0]}: <span className={`${userData?.apartment?.status === "pending" && "opacity-50 align-middle"}`}>{userData?.apartment?.blockName.split(" ")[1]}</span></> : "Block: none"}</p>
                    </div>
                </div>

                <div className="py-2 text-center">
                    <div className="badge badge-primary badge-outline capitalize">{userData?.role || "none"}</div>
                    <p className="font-bold text-lg my-1 capitalize">{user?.displayName || userData?.name}</p>
                    {
                        userData?.email ? <p className="mb-3 font-medium text-base-content/80 line-clamp-1">
                            {userData?.email.split(/\b/).map(
                                (itm, idx) => <span key={idx}>{itm}<wbr /></span>
                            )}
                        </p> : <p>none</p>
                    }

                    <button className="bg-neutral p-1 rounded-sm text-neutral-content cursor-pointer active:scale-90 transition-[scale] mx-1" onClick={updateProfile}>
                        <UserRoundPen />
                    </button>

                    <Link to="/forgot-password" state={{ email: userData?.email }}>
                        <button className="bg-neutral p-1 rounded-sm text-neutral-content cursor-pointer active:scale-90 transition-[scale] mx-1">
                            <KeyRound />
                        </button>
                    </Link>

                    <button className="bg-neutral p-1 rounded-sm text-neutral-content cursor-pointer active:scale-90 transition-[scale]" onClick={() => {
                        logout()
                            .then(() => navigate("/"))
                            .catch((err) => error(err.message))
                    }}>
                        <LogOut />
                    </button>

                </div>

            </div >
            <Tooltip className="!bg-warning z-50" id="date-tooltip" />
        </>
    )
}

export default MyProfile