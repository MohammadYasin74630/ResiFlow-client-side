import apartments from "../../assets/apartments.webp"
import available from "../../assets/available.webp"
import unavailable from "../../assets/unavailable.webp"
import pending from "../../assets/pending.webp"
import users from "../../assets/users.webp"
import members from "../../assets/members.webp"
import { Riple } from "react-loading-indicators"
import { Info } from "lucide-react"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useContext } from "react"
import { AuthContext } from "../../utils/AuthProvider"
import { useQuery } from "@tanstack/react-query"

function AdminStats() {

    const { loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/stats`)

            return data
        }
    })

    if (isError || stats?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Stats Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    const totalLoggedInUser = stats.totalUsers + stats.totalMembers

    return (
        <>
            <title>ResiFlow | Apartment Stats</title>
            <h3 className="mt-16 mb-6 text-2xl font-bold px-4 text-center">Apartment Stats</h3>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-2 sm:w-11/12 mx-auto">

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `100%` }}>
                    <img className="w-16 mx-auto" src={apartments} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.totalApartments || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.totalApartments || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">TOTAL APARTMENTS</h3>
                </div>

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `${Math.round((stats.availableApartments / stats.totalApartments) * 100) || 100}%` }}>
                    <img className="w-16 mx-auto" src={available} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.availableApartments || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.availableApartments || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">AVAILABLE APARTMENTS</h3>
                </div>

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `${Math.round((stats.unavailableApartments / stats.totalApartments) * 100) || 100}%` }}>
                    <img className="w-16 mx-auto" src={unavailable} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.unavailableApartments || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.unavailableApartments || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">UNAVAILABLE APARTMENTS</h3>
                </div>

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `${Math.round((stats.pendingRequests / stats.totalApartments) * 100) || 100}%` }}>
                    <img className="w-16 mx-auto" src={pending} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.pendingRequests || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.pendingRequests || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">PENDING REQUESTS</h3>
                </div>

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `${Math.round((stats.totalUsers / totalLoggedInUser) * 100) || 100}%` }}>
                    <img className="w-16 mx-auto" src={users} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.totalUsers || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.totalUsers || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">TOTAL USER</h3>
                </div>

                <div className="relative z-20 text-center bg-base-200 rounded-sm p-4 shadow-sm before:content-[''] before:bg-accent before:block before:w-[var(--before-width)] before:h-full before:absolute before:top-0 before:left-0 before:-z-10" style={{ "--before-width": `${Math.round((stats.totalMembers / totalLoggedInUser) * 100) || 100}%` }}>
                    <img className="w-16 mx-auto" src={members} alt="" />
                    <div className="relative">
                        <p className="text-7xl font-extrabold relative -z-20 ">{stats?.totalMembers || 0}</p>
                        <p className="text-7xl font-extrabold text-base-100 absolute top-0 left-1/2 -translate-x-1/2 [-webkit-text-fill-color:_transparent] [-webkit-text-stroke:_5px_var(--color-base-100)] [-webkit-text-stroke-width:_2px_!important]">{stats?.totalMembers || 0}</p>
                    </div>
                    <h3 className="font-semibold dynamic-text mt-2">TOTAL MEMBERS</h3>
                </div>

            </div>
        </>
    )
}

export default AdminStats