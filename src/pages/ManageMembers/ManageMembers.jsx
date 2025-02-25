import { Info, UserRoundX } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import { Riple } from 'react-loading-indicators';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { Flipper, Flipped } from 'react-flip-toolkit'

function ManageMembers() {

    const [btnLoading, setBtnLoading] = useState({})
    const { loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { isLoading, isError, refetch, data: members = [] } = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/members");
            return data
        }
    })

    const removeMember = async (userId) => {
        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                text: "You want to evict this member!",
                showCancelButton: true,
                confirmButtonText: "Yes, remove",
                iconColor: `var(--color-warning)`,
                color: "var(--color-neutral-content)",
                background: "var(--color-primary)",
                confirmButtonColor: "var(--color-error)",
            })

            if (result.isConfirmed) {

                setBtnLoading(prev => ({ ...prev, [userId]: true }))

                const { data } = await axiosSecure.post(`/evict/${userId}`)

                setBtnLoading(prev => {
                    const obj = { ...prev };
                    delete obj[userId];
                    return { ...obj }
                })

                if (data?.error) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: data.error,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-error)`,
                        color: "var(--color-neutral-content)",
                        background: "var(--color-primary)",
                    });
                }

                if (data?.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Removed Member",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-success)`,
                        color: "var(--color-neutral-content)",
                        background: "var(--color-primary)",
                    });
                }
            }
        }
        catch (err) {

            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[userId];
                return { ...obj }
            })

            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                toast: true,
                iconColor: `var(--color-error)`,
                color: "var(--color-neutral-content)",
                background: "var(--color-primary)",
            });
        }
    }

    if (isError || members?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Members Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    const flipLock = `${members.map(member => member._id).join(",")}`

    return (
        <>
            <title>ResiFlow | Manage Member</title>
            <div className="mt-20 p-2 md:p-4">

                <h3 className="mb-6 text-2xl font-bold ">Manage Members</h3>

                {
                    members.length > 0 ? <Flipper flipKey={flipLock} spring="gentle">
                        <div className="overflow-x-auto overflow-y-hidden">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Last Login</th>
                                        <th>Room</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        members?.map(
                                            (itm, idx) => <Flipped flipId={itm._id} key={itm._id}>
                                                <tr>
                                                    <td>
                                                        {idx + 1}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle h-12 w-12">
                                                                    <img
                                                                        src={itm.profileImg}
                                                                        alt=""
                                                                        referrerPolicy='no-referrer'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold capitalize">{itm.name}</div>
                                                                <div className="text-sm opacity-50">${itm.apartmentInfo.rent}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {itm.email}
                                                    </td>
                                                    <td>
                                                        <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(itm?.lastLoginAt || Date.now()).toDateString() + ", " + new Date(itm?.lastLoginAt || Date.now()).toLocaleTimeString()}>{new Date(itm?.lastLoginAt || Date.now()).toLocaleDateString()}</span>
                                                    </td>
                                                    <td>
                                                        {itm.apartmentInfo.apartmentNo}
                                                    </td>
                                                    <th>
                                                        <button className="btn btn-ghost btn-xs disabled:opacity-30 disabled:cursor-not-allowed"
                                                            onClick={() => removeMember(itm._id)}
                                                            disabled={btnLoading?.[itm?._id]}
                                                        >
                                                            <UserRoundX />
                                                        </button>
                                                    </th>
                                                </tr>
                                            </Flipped>
                                        )
                                    }

                                </tbody>

                            </table>
                        </div>
                    </Flipper> : <p className='text-xl text-center text-warning'>No members yet. Add some to get started!</p>
                }


            </div>

            <Tooltip className="!bg-warning" id="date-tooltip" />
        </>
    )
}

export default ManageMembers