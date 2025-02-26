import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { Riple } from "react-loading-indicators";
import { Tooltip } from "react-tooltip";

function UserRequests() {

    const { loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: myRequests = [] } = useQuery({
        queryKey: ['my-requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-requests`)

            return data
        }
    })

    if (isError || myRequests?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Requests Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | My Requests</title>
            <h3 className="mt-16 mb-6 text-2xl font-bold px-4 text-center">Requests History</h3>

            {
                myRequests.length > 0 ? <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-2 sm:w-11/12 mx-auto">

                    {
                        myRequests.map(
                            request => <div className="bg-base-200 p-4 rounded-sm shadow-sm" key={request._id}>
                                <div className="relative">
                                    <img className="rounded-sm shadow-sm" src={request.apartmentInfo.apartmentImage} alt="" width="832" height="448" />
                                    <p className="absolute bottom-1 left-1 bg-accent text-base-100 px-3 rounded-full text-sm font-medium">{request.apartmentInfo.apartmentNo}</p>
                                </div>
                                <div className="space-y-1 mt-2">
                                    <p>Rent: <span className="font-medium">${request.apartmentInfo.rent}</span></p>
                                    <p>Available: <span className="font-medium">{request.apartmentInfo.rented ? "no" : "yes"}</span></p>
                                    <p>Requested on:
                                        <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(request?.createdAt || Date.now()).toDateString() + ", " + new Date(request?.createdAt || Date.now()).toLocaleTimeString()} className="font-medium"> {new Date(request?.createdAt || Date.now()).toLocaleDateString()}</span>
                                    </p>
                                    <p>Reviewed on:
                                        {
                                            request?.rejectedAt || request?.acceptedAt ? <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(request?.rejectedAt || request?.acceptedAt || Date.now()).toDateString() + ", " + new Date(request?.rejectedAt || request?.acceptedAt || Date.now()).toLocaleTimeString()} className="font-medium"> {new Date(request?.rejectedAt || request?.acceptedAt || Date.now()).toLocaleDateString()}</span> : " pending"
                                        }

                                    </p>
                                    <p>Status: <span className="font-medium">{request.status}</span></p>
                                </div>
                            </div>
                        )
                    }

                </div> : <p className='text-xl text-center text-warning'>No apartment requests found. Submit a request to get started!</p>
            }
            <Tooltip className="!bg-warning" id="date-tooltip" />
        </>
    )
}

export default UserRequests