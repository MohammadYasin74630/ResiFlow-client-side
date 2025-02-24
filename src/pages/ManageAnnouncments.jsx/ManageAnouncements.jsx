import { Pencil, Info, Trash2 } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import { Riple } from 'react-loading-indicators';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { Flipper, Flipped } from 'react-flip-toolkit'
import { Reoverlay } from 'reoverlay';
import AnnouncementModal from '../../components/AnnouncementModal';

function ManageAnouncements() {

    const { loading } = useContext(AuthContext)
    const [btnLoading, setBtnLoading] = useState({})
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: anouncements = [], refetch } = useQuery({
        queryKey: ['anouncements'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/anouncements`)

            return data
        }
    })


    const flipLock = `${anouncements.map(announcement => announcement._id).join(",")}`

    const addAnnouncement = () => {
        Reoverlay.showModal(AnnouncementModal, { axiosSecure, refetch })
    }

    const updateAnnouncement = (anouncement) => {

        const enableLoading = () => {
            setBtnLoading(prev => ({ ...prev, [anouncement._id]: true }))

        }

        const disableLoading = () => {
            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[anouncement._id];
                return { ...obj }
            })

        }
        Reoverlay.showModal(AnnouncementModal, { anouncement, enableLoading, disableLoading, axiosSecure, refetch })
    }


    const deleteAnnouncement = async (anouncementId) => {

        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                text: "You want to delete this coupon!",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                iconColor: `var(--color-warning)`,
                color: "var(--color-neutral-content)",
                background: "var(--color-primary)",
                confirmButtonColor: "var(--color-error)",
            })

            if (result.isConfirmed) {

                setBtnLoading(prev => ({ ...prev, [anouncementId]: true }))

                const { data } = await axiosSecure.delete(`/anouncement/${anouncementId}`)

                setBtnLoading(prev => {
                    const obj = { ...prev };
                    delete obj[anouncementId];
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
                        color: "var(--color-neutral-content)",
                        background: "var(--color-primary)",
                    });
                }

                if (data?.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted Anouncement",
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
                delete obj[anouncementId];
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
                color: "var(--color-neutral-content)",
                background: "var(--color-primary)",
            });
        }
    }

    if (isError || anouncements?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching All coupons Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | All anouncements</title>

            <div className="mt-20 p-2 md:p-4">

                <div className='mb-6 flex flex-wrap gap-2 justify-between'>
                    <h3 className="text-2xl font-bold ">All Anouncements</h3>
                    <button className='btn' onClick={addAnnouncement}>Add</button>
                </div>
                <div>

                    {
                        anouncements.length > 0 ? <Flipper flipKey={flipLock} spring="gentle">
                            <div className="overflow-x-auto overflow-y-hidden border border-base-200 rounded-sm">
                                <table className="table table-xs">
                                    <thead>

                                        <tr className='h-8'>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Announced</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            anouncements.map(
                                                (anouncement, idx) => <Flipped flipId={anouncement._id} key={anouncement._id}>
                                                    <tr className={`${idx % 2 == 0 ? "bg-base-200" : ""}`} >
                                                        <th>{idx + 1}</th>
                                                        <td>{anouncement?.title}</td>
                                                        <td >{anouncement?.description}</td>
                                                        <td>
                                                            <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(anouncement?.announcedAt || Date.now()).toDateString() + ", " + new Date(anouncement?.announcedAt || Date.now()).toLocaleTimeString()}>{new Date(anouncement?.announcedAt || Date.now()).toLocaleDateString()}</span>
                                                        </td>
                                                        <td>
                                                            <div className='flex gap-1 items-center'>
                                                                <button
                                                                    className='hover:text-base-100 hover:bg-success hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                    onClick={() => updateAnnouncement(anouncement)}
                                                                    disabled={btnLoading?.[anouncement?._id]}
                                                                >
                                                                    <Pencil size={20} />
                                                                </button>

                                                                <button
                                                                    className='hover:text-base-100 hover:bg-error hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                    onClick={() => deleteAnnouncement(anouncement?._id)}
                                                                    disabled={btnLoading?.[anouncement?._id]}
                                                                >
                                                                    <Trash2 size={20} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </Flipped>
                                            )
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </Flipper> : <p className='text-xl text-center text-warning'>No apartment announcements have been added yet!</p>
                    }

                </div>

            </div>

            <Tooltip className="!bg-warning" id="date-tooltip" />

        </>
    )
}

export default ManageAnouncements