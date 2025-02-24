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
import DiscountModal from '../../components/DiscountModal';

function ManageCoupons() {

    const { loading } = useContext(AuthContext)
    const [btnLoading, setBtnLoading] = useState({})
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: coupons = [], refetch } = useQuery({
        queryKey: ['all-coupons'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-coupons`)

            return data
        }
    })


    const flipLock = `${coupons.map(coupon => coupon._id).join(",")}`

    const addDiscount = () => {
        Reoverlay.showModal(DiscountModal, { axiosSecure, refetch })
    }

    const updateCoupon = (coupon) => {

        const enableLoading = () => {
            setBtnLoading(prev => ({ ...prev, [coupon._id]: true }))

        }

        const disableLoading = () => {
            setBtnLoading(prev => {
                const obj = { ...prev };
                delete obj[coupon._id];
                return { ...obj }
            })

        }
        Reoverlay.showModal(DiscountModal, { coupon, enableLoading, disableLoading, axiosSecure, refetch })
    }


    const deleteCoupon = async (couponId) => {

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

                setBtnLoading(prev => ({ ...prev, [couponId]: true }))

                const { data } = await axiosSecure.delete(`/coupon/${couponId}`)

                setBtnLoading(prev => {
                    const obj = { ...prev };
                    delete obj[couponId];
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
                        title: "Deleted Coupon",
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
                delete obj[couponId];
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

    if (isError || coupons?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching All coupons Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | All coupons</title>

            <div className="mt-20 p-2 md:p-4">

                <div className='mb-6 flex flex-wrap gap-2 justify-between'>
                    <h3 className="text-2xl font-bold ">All Coupons</h3>
                    <button className='btn' onClick={addDiscount}>Add</button>
                </div>
                <div>

                    {
                        coupons.length > 0 ? <Flipper flipKey={flipLock} spring="gentle">
                            <div className="overflow-x-auto overflow-y-hidden border border-base-200 rounded-sm">
                                <table className="table table-xs">
                                    <thead>

                                        <tr className='h-8'>
                                            <th></th>
                                            <th>Code</th>
                                            <th>Discount</th>
                                            <th>Description</th>
                                            <th>Staus</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            coupons.map(
                                                (coupon, idx) => <Flipped flipId={coupon._id} key={coupon._id}>
                                                    <tr className={`${idx % 2 == 0 ? "bg-base-200" : ""}`} >
                                                        <th>{idx + 1}</th>
                                                        <td>{coupon?.couponCode}</td>
                                                        <td>{coupon?.discountPercentage}</td>
                                                        <td >{coupon?.couponDescription}</td>
                                                        <td>{coupon?.shown ? "Visible" : "Hidden"}</td>
                                                        <td>
                                                            <div className='flex gap-1 items-center'>
                                                                <button
                                                                    className='hover:text-base-100 hover:bg-success hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                    onClick={() => updateCoupon(coupon)}
                                                                    disabled={btnLoading?.[coupon?._id]}
                                                                >
                                                                    <Pencil size={20} />
                                                                </button>

                                                                <button
                                                                    className='hover:text-base-100 hover:bg-error hover:cursor-pointer active:scale-90 transition-[scale] p-1 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed'
                                                                    onClick={() => deleteCoupon(coupon?._id)}
                                                                    disabled={btnLoading?.[coupon?._id]}
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
                        </Flipper> : <p className='text-xl text-center text-warning'>No apartment coupons have been added yet!</p>
                    }

                </div>

            </div>

            <Tooltip className="!bg-warning" id="table-tooltip" />

        </>
    )
}

export default ManageCoupons