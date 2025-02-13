import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Riple } from "react-loading-indicators";

function Banner() {

    const [bannerOut, setBannerOut] = useState(false)
    const [bannerIn, setBannerIn] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { data: banners, isLoading, isError } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            try {
                const data = await axiosSecure.get("/banners")
                return data.data
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    const queryClient = useQueryClient()

    const prev = () => {
        setBannerIn(true)

        setTimeout(() => {

            setBannerIn(false)

            queryClient.setQueryData(["banners"], prev => {
                if (prev.length === 0) return prev;
                const last = prev[prev.length - 1];
                const rest = prev.slice(0, prev.length - 1);
                return [last, ...rest];
            })

        }, 500);
    }

    const next = () => {
        setBannerOut(true)

        setTimeout(() => {

            setBannerOut(false)

            queryClient.setQueryData(["banners"], prev => {
                if (prev.length === 0) return prev;
                const [first, ...rest] = prev;
                return [...rest, first];
            })

        }, 500);
    }

    if (isError) return <p className='flex gap-2 text-error'><Info/> Fetching Banners Failed !</p>
    
    if (isLoading) return <Riple color="black" size="medium" text="" textColor="" />

    return (
        <>

            {
                banners?.length > 0 ? <div className='text-base-100 max-w-[850px] text-center '>

                    <div className='relative p-[1px]'>

                        <div className="mt-10 p-4 bg-base-100 mx-auto rounded-sm w-full opacity-0">
                            <div className="relative">
                                <img width={832} height={448} />
                                <p className="absolute bottom-0">test</p>
                            </div>
                        </div>

                        {
                            banners?.map(
                                (banner, idx) => <div className={`mt-10 p-1 sm:p-2 md:p-4 md:bg-base-100 mx-auto rounded-sm absolute top-0 w-full ${idx === 0 && bannerOut ? "banner-out" : idx + 1 === banners.length && bannerIn ? "banner-in" : ""}`}
                                    style={{ zIndex: `${banners.length - idx}` }}
                                    key={banner?._id}>
                                    <div className="relative rounded-sm overflow-hidden">
                                        <img className="object-cover" src={banner?.image} alt="" />
                                        <p className="absolute bottom-0 font-medium bg-black/60 max-sm:text-sm md:p-1 w-full line-clamp-1">
                                            {banner.paragraph}
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className='flex justify-center gap-2 md:my-2 z-20'>
                        <button
                            className='p-1 bg-primary rounded-full cursor-pointer active:scale-90 transition-[scale] select-none disabled:bg-base-300 disabled:text-black/30'
                            disabled={bannerIn || bannerOut}
                            onClick={prev}
                        >
                            <ArrowLeft />
                        </button>

                        <button
                            className='p-1 bg-primary rounded-full cursor-pointer active:scale-90 transition-[scale] select-none disabled:bg-base-300 disabled:text-black/30'
                            disabled={bannerOut || bannerIn}
                            onClick={next}
                        >
                            <ArrowRight />
                        </button>
                    </div>

                </div> : null
            }

        </>
    )
}

export default Banner