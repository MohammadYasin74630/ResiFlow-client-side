import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { Riple } from "react-loading-indicators";
import { Tooltip } from "react-tooltip";

function AllMembers() {

    const { loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: allMembers = [] } = useQuery({
        queryKey: ['all-members'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/neighbors`)

            return data
        }
    })

    if (isError || allMembers?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Requests Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | All Members</title>
            <h3 className="mt-16 mb-6 text-2xl font-bold px-4 text-center">All Members</h3>

            {
                allMembers.length > 0 ? <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-2 sm:w-11/12 mx-auto">

                    {
                        allMembers.map(
                            member => <div className="bg-base-200 p-4 rounded-sm shadow-sm overflow-hidden" key={member._id}>
                                <div className="flex items-center gap-2">
                                    <img className="w-14 h-14 object-cover rounded-full shrink-0" src={member.userInfo.profileImg} alt="" />
                                    <div>
                                        <h3 className="font-bold capitalize">{member.userInfo.name}</h3>
                                        <p className="font-medium text-base-content/80 line-clamp-1">
                                            {
                                                member.userInfo.email.split(/\b/).map(
                                                    (itm, idx) => <span key={idx}>{itm}<wbr /></span>
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>
                                <p className="my-3 font-medium text-base-content/80">Joined on:
                                    <span className="font-semibold text-base-content" data-tooltip-id="date-tooltip" data-tooltip-html={new Date(member?.acceptedAt || Date.now()).toDateString() + ", " + new Date(member?.acceptedAt || Date.now()).toLocaleTimeString()}> {new Date(member?.acceptedAt || Date.now()).toLocaleDateString()}</span>
                                </p>
                                <div className="relative">
                                    <img className="rounded-sm shadow-sm" src={member.apartmentInfo.apartmentImage} alt="" />

                                    <div className="absolute top-1 left-1 flex flex-wrap gap-2 text-base-100 font-medium text-sm">
                                        <p className="bg-accent px-3 py-0.5 rounded-full">Floor: {member.apartmentInfo.floorNo}</p>
                                        <p className="bg-accent px-3 py-0.5 rounded-full">Block: {member.apartmentInfo.blockName.split(" ")[1]}</p>
                                        <p className="bg-accent px-3 py-0.5 rounded-full">room: {member.apartmentInfo.apartmentNo}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div> : <p className='text-xl text-center text-warning'>No apartments have been rented yet!</p>
            }
            <Tooltip className="!bg-warning" id="date-tooltip" />
        </>
    )
}

export default AllMembers