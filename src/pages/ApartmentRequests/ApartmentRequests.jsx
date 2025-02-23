import { Check, Info, X } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import { Riple } from 'react-loading-indicators';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { Flipper, Flipped } from 'react-flip-toolkit'

function ApartmentRequests() {

    const { loading } = useContext(AuthContext)
    const [btnLoading, setBtnLoading] = useState({})
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: requests = [], refetch } = useQuery({
        queryKey: ['apartment-requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/apartment-requests`)

            return data
        }
    })

    const flipLock = `${requests.map(member => member._id).join(",")}`

    const accept = async (reqId, userId) => {

        try {
            setBtnLoading(prev => ({ ...prev, [reqId]: true }))

            const { data } = await axiosSecure.post(`/apartment-request/${reqId}`, { status: "accepted", userId })

            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[reqId];
                return { ...obj }
            })

            if (data?.error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    iconColor: `var(--color-error)`,
                    color: "var(--color-base-100)",
                    background: "var(--color-primary)",
                });
            }

            if (data?.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Accepted Agreement",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    iconColor: `var(--color-success)`,
                    color: "var(--color-base-100)",
                    background: "var(--color-primary)",
                });
            }
        }
        catch (err) {
            
            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[reqId];
                return { ...obj }
            })

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                iconColor: `var(--color-error)`,
                color: "var(--color-base-100)",
                background: "var(--color-primary)",
            });
        }
    }

    const reject = async (reqId) => {

        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                text: "You want to reject this agreement!",
                showCancelButton: true,
                confirmButtonText: "Yes, reject it!",
                iconColor: `var(--color-warning)`,
                color: "var(--color-base-100)",
                background: "var(--color-primary)",
                confirmButtonColor: "var(--color-error)",
            })

            if (result.isConfirmed) {

                setBtnLoading(prev => ({ ...prev, [reqId]: true }))

                const { data } = await axiosSecure.post(`/apartment-request/${reqId}`, { status: "rejected" })

                setBtnLoading(prev => {
                    const obj = { ...prev };
                    delete obj[reqId];
                    return { ...obj }
                })

                if (data?.error) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: data.error,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-error)`,
                        color: "var(--color-base-100)",
                        background: "var(--color-primary)",
                    });
                }

                if (data?.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rejected Agreement",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-success)`,
                        color: "var(--color-base-100)",
                        background: "var(--color-primary)",
                    });
                }
            }
        }
        catch (err) {
            
            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[reqId];
                return { ...obj }
            })

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                iconColor: `var(--color-error)`,
                color: "var(--color-base-100)",
                background: "var(--color-primary)",
            });
        }
    }

    if (isError || requests?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Apartment Requests Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | Apartment Requests</title>

            <div className="mt-20 p-2 md:p-4">

                <h3 className="mb-6 text-2xl font-bold ">Apartment Requests</h3>
                <div>

                    {
                        requests.length > 0 ? <Flipper flipKey={flipLock} spring="gentle">
                            <div className="overflow-x-auto overflow-y-hidden border border-base-200 rounded-sm">
                                <table className="table table-xs">
                                    <thead>

                                        <tr className='h-8'>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Floor</th>
                                            <th>Block</th>
                                            <th>Room</th>
                                            <th>Rent</th>
                                            <th>Applied</th>
                                            <th>Staus</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            requests.map(
                                                (rqst, idx) => <Flipped flipId={rqst._id} key={rqst._id}>
                                                    <tr className={`${idx % 2 == 0 ? "bg-base-200" : ""}`} >
                                                        <th>{idx + 1}</th>
                                                        <td>{rqst?.userData?.name}</td>
                                                        <td>{rqst?.userData?.email}</td>
                                                        <td>{rqst?.apartmentData?.floorNo}</td>
                                                        <td>{rqst?.apartmentData?.blockName}</td>
                                                        <td>{rqst?.apartmentData?.apartmentNo}</td>
                                                        <td>${rqst?.apartmentData?.rent}</td>
                                                        <td>
                                                            <span data-tooltip-id="table-tooltip" data-tooltip-html={new Date(rqst?.createdAt || Date.now()).toDateString() + ", " + new Date(rqst?.createdAt || Date.now()).toLocaleTimeString()}>{new Intl.DateTimeFormat('en-GB').format(new Date(rqst?.createdAt || Date.now()))}</span>
                                                        </td>
                                                        <td>{rqst?.status}</td>
                                                        <td className='flex gap-1'>
                                                            <button
                                                                className='hover:text-base-100 hover:bg-success hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                onClick={() => accept(rqst?._id, rqst?.userData?._id)}
                                                                disabled={btnLoading?.[rqst?._id]}
                                                            >
                                                                <Check size={20} />
                                                            </button>

                                                            <button
                                                                className='hover:text-base-100 hover:bg-error hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                onClick={() => reject(rqst?._id)}
                                                                disabled={btnLoading?.[rqst?._id]}
                                                            >
                                                                <X size={20} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </Flipped>
                                            )
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </Flipper> : <p className='text-xl text-center text-warning'>No apartment requests have been received yet!</p>
                    }

                </div>

            </div>

            <Tooltip className="!bg-warning" id="table-tooltip" />
        </>
    )
}

export default ApartmentRequests