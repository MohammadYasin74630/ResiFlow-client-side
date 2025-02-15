import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { Info, Copy } from "lucide-react"
import { Riple } from "react-loading-indicators"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";

function Coupons() {

    const { ref, inView } = useInView();

    const axiosSecure = useAxiosSecure()

    const { data: coupons, isLoading, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {

            try {
                const { data } = await axiosSecure.get("/coupons?limit=16")

                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    if (isError) return <p className='flex gap-2 text-error'><Info /> Fetching coupons Failed !</p>

    if (isLoading) return <Riple color="#fab600" size="medium" text="" textColor="" />

    return (
        <>
            {
                coupons.length > 0 ? <>
                    <h3 className="text-base-100 text-xl font-bold max-sm:mt-10 my-5 mx-4"> Exclusive Discounts with Rental Coupons!</h3>

                    <div className={`grid min-[550px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 max-w-[1400px] p-4 overflow-hidden`} ref={ref}>

                        {
                            coupons?.map((coupon, idx, arr) => <Coupon key={coupon._id} coupon={coupon} idx={idx} coupons={arr} inView={inView} />)
                        }

                    </div>
                </> : <p className='text-warning text-xl font-bold'>No Coupons found !</p>
            }
        </>

    )
}

function Coupon({ coupon, idx, coupons, inView }) {

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

    return <div className={`p-4 bg-base-100 rounded-sm flex flex-col gap-2 ${idx + 1 === coupons?.length ? "md:hidden lg:flex xl:hidden" : ""} ${delayedClass}`}>
        <div className="flex items-center justify-between">
            <p className="text-xl text-accent">{coupon.couponCode}</p>
            <Copy size={20} />
        </div>
        <p className="font-medium flex-grow md:line-clamp-2">{coupon.couponDescription
        }</p>
        <progress className="progress progress-accent w-56" value={coupon.discountPercentage} max="100"></progress>
    </div>
}

export default Coupons