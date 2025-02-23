import { useQuery } from "@tanstack/react-query"
import { Info, Copy } from "lucide-react"
import { Riple } from "react-loading-indicators"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import useAxiosPublic from "../../hooks/useAxiosPublic"
import { toast } from "sonner";

function Coupons() {

    const { ref, inView } = useInView();

    const axiosPublic = useAxiosPublic()
    const error = (msg) => toast.error(msg)

    const { data: coupons, isLoading, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {

            try {
                const { data } = await axiosPublic.get("/coupons?limit=12")

                return data
            }
            catch (err) {
                error(err.message)
            }
        }
    })

    if (isError) return <p className='flex gap-2 text-error'><Info /> Fetching coupons Failed !</p>

    if (isLoading) return <Riple color="#fab600" size="medium" text="" textColor="" />

    return (
        <>
            {
                coupons.length > 0 ? <>
                    <h3 className="text-neutral-content text-xl font-bold max-sm:mt-10 my-5 mx-4"> Exclusive Discounts with Rental Coupons!</h3>

                    <div className={`grid min-[550px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[1100px] p-4 overflow-hidden`} ref={ref}>

                        {
                            coupons?.map((coupon, idx) => <Coupon key={coupon._id} coupon={coupon} idx={idx} inView={inView} />)
                        }

                    </div>
                </> : <p className='text-warning text-xl font-bold'>No Coupons found !</p>
            }
        </>

    )
}

function Coupon({ coupon, idx, inView }) {

    const [delayedClass, setDelayedClass] = useState("invisible")

    useEffect(
        () => {
            if (inView) {
                const id = setTimeout(
                    () => setDelayedClass("animate__animated animate__fadeIn"), idx * 100
                )
                return () => clearTimeout(id)
            } else {
                setDelayedClass("invisible")
            }
        }, [inView]
    )

    return <div className={`p-4 bg-base-100 rounded-sm flex flex-col gap-2 ${delayedClass}`}>
        <div className="flex items-center justify-between">
            <p className="text-lg text-accent">{coupon.couponCode}</p>
            <Copy size={20} />
        </div>
        <p className="font-medium flex-grow md:line-clamp-2">{coupon.couponDescription
        }</p>
        <progress className="progress progress-accent max-w-56 w-full" value={coupon.discountPercentage} max="100"></progress>
    </div>
}

export default Coupons