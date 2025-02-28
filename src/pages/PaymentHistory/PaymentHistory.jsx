import { Info } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import { Riple } from 'react-loading-indicators';
import { Tooltip } from 'react-tooltip';
import { Flipper, Flipped } from 'react-flip-toolkit'

function PaymentHistory() {

    const { loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { isLoading, isError, data: histories = [] } = useQuery({
        queryKey: ["payment-history"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/payment-history");
            return data
        }
    })

    if (isError || histories?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Payment History Failed !</p>

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    const flipLock = `${histories.map(history => history._id).join(",")}`

    return (
        <>
            <title>ResiFlow | Payment History</title>
            <div className="mt-20 p-2 md:p-4">

                <h3 className="mb-6 text-2xl font-bold ">Payment History</h3>

                {
                    histories.length > 0 ? <Flipper flipKey={flipLock} spring="gentle">
                        <div className="overflow-x-auto overflow-y-hidden">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Payment Date</th>
                                        <th>Rent</th>
                                        <th>Year</th>
                                        <th>Coupon</th>
                                        <th>Amount</th>
                                        <th>Transaction Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        histories?.map(
                                            (itm, idx) => <Flipped flipId={itm._id} key={itm._id}>
                                                <tr>
                                                    <td>
                                                        {idx + 1}
                                                    </td>
                                                    <td >
                                                        <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(itm?.createdAt || Date.now()).toDateString() + ", " + new Date(itm?.createdAt || Date.now()).toLocaleTimeString()}>{new Date(itm?.createdAt || Date.now()).toLocaleDateString()}</span>
                                                    </td>
                                                    <td>
                                                        {itm.paidMonth}
                                                    </td>
                                                    <td>
                                                        {parseInt(itm.year)}
                                                    </td>
                                                    <td>
                                                        {itm.couponCode}
                                                    </td>
                                                    <td>
                                                        {itm.totalRent}
                                                    </td>
                                                    <td>
                                                        {itm.paymentId}
                                                    </td>
                                                </tr>
                                            </Flipped>
                                        )
                                    }

                                </tbody>

                            </table>
                        </div>
                    </Flipper> : <p className='text-xl text-center text-warning'>No rent has been paid yet. Please complete your monthly rent payment.</p>
                }


            </div>

            <Tooltip className="!bg-warning" id="date-tooltip" />
        </>
    )
}

export default PaymentHistory