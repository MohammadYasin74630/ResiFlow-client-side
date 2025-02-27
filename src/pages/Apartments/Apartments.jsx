import { useContext, useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { DollarSign, Info, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Riple } from 'react-loading-indicators';
import { AuthContext } from '../../utils/AuthProvider';
import useUserData from '../../hooks/useUserData';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Swal from 'sweetalert2';

function Apartments() {

    const [searchParams, setSearchParam] = useSearchParams()

    const minParam = searchParams.get("min");
    const maxParam = searchParams.get("max");
    const pageParam = searchParams.get("page");

    const [range, setRange] = useState(minParam && maxParam ? [parseInt(minParam), parseInt(maxParam)] : [])
    const [page, setPage] = useState(pageParam || 1)
    const [limit,] = useState(searchParams.get("limit") || 6)

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)
    const { isLoading: userDataLoading, data: userData, refetch: refetchUserData } = useUserData()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { data: price } = useQuery({
        queryKey: ["priceRange"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/rent-range`)
            if (range.length === 0) setRange([data.min, data.max])
            return data
        }
    })

    const { isLoading, isError, data: apartments, refetch } = useQuery({
        queryKey: ["apartments"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/apartments?min=${range[0] ? range[0] : ""}&max=${range[1] ? range[1] : ""}&limit=${limit}&page=${page}`)

            return data
        }
    })

    const prevPage = () => {
        if (page > 1) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", parseInt(page) - 1);
            setSearchParam(newParams)
            setPage(prev => parseInt(prev) - 1)
            refetch()
        }
    }

    const nextPage = () => {
        if (page < Math.ceil(apartments.totalDocs / limit)) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", parseInt(page) + 1);
            setSearchParam(newParams)
            setPage(prev => parseInt(prev) + 1)
            refetch()
        }
    }

    const rangeFilter = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("min", range[0]);
        newParams.set("max", range[1]);
        newParams.set("page", 1);
        setSearchParam(newParams)
        setPage(1)
        refetch()
    }

    useEffect(
        () => {
            if (minParam && maxParam) {
                setRange(
                    [
                        parseInt(minParam),
                        parseInt(maxParam)
                    ]
                )
                if (pageParam) {
                    setPage(parseInt(pageParam))
                    refetch()
                } else {
                    setPage(1)
                    refetch()
                }
            }
            else if (price?.min && price?.max) {
                setRange(
                    [
                        parseInt(price?.min),
                        parseInt(price?.max)
                    ]
                )
                if (pageParam) {
                    setPage(parseInt(pageParam))
                    refetch()
                } else {
                    setPage(1)
                    refetch()
                }
            }
        }, [minParam, maxParam, pageParam]
    )

    const requestHandler = async (id) => {

        function showSwal(icon, title, msg) {
            Swal.fire({
                icon: icon,
                title: title,
                text: msg,
                iconColor: `var(--color-${icon})`,
                color: "var(--color-neutral-content)",
                background: "var(--color-primary)",
            });
        }

        async function addRequest() {
            try {
                const { data } = await axiosSecure.post(`/request-apartment/${id}`, { userId: userData._id })

                refetchUserData()

                if (data.error) {
                    showSwal(
                        "error",
                        "Unknown Error Occured !",
                        data.error
                    )
                }

                if (data.acknowledged) {
                    refetch()
                    showSwal(
                        "success",
                        "Request Submitted Successfully",
                        "Your agreement request has been sent. Check your Dashboard for status updates."
                    )
                }
            }
            catch (err) {
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

        if (user === null || userData?.role === undefined) {
            navigate('/login', { state: pathname })
        }
        else if (userData?.role === "admin") {

            showSwal(
                "error",
                "Action Not Allowed!",
                "As an admin, you're not allowed to request an apartment."
            )
        }
        else if (userData?.role === "member") {
            showSwal(
                "info",
                "Already Rented an Apartment",
                "If you need to change your apartment then please contact the admin."
            )
        }
        else if (userData?.role === "user") {
            if (userData?.apartment === undefined) {
                addRequest()
            }
            else if (userData?.apartment?.status === "pending") {

                const { data } = await refetchUserData();

                if (data?.apartment === undefined) {
                    addRequest()
                }
                else if (data?.apartment?.status === "accepted") {
                    showSwal(
                        "info",
                        "Already Rented an Apartment",
                        "If you need to change your apartment then please contact the admin."
                    )
                }
                else {
                    showSwal(
                        "info",
                        "Apartment Request Pending",
                        "You’ve already applied for an apartment, and it’s currently under review."
                    )
                }

            }
        }
    }

    if (isError || apartments?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Apartments Failed !</p>

    if (loading || isLoading || userDataLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    return (
        <>
            <title>ResiFlow | Apartments</title>

            <h3 className="mt-20 text-2xl font-bold text-center">Avalilable Apartments</h3>

            <div className='max-w-96 mx-auto space-y-5 p-1 sm:p-2'>

                <div className='mt-5 flex justify-between font-medium'>
                    <p>Min</p>
                    <p>Max</p>
                </div>

                <RangeSlider min={price?.min} max={price?.max} value={range} onInput={val => setRange(val)} onThumbDragEnd={rangeFilter} onRangeDragEnd={rangeFilter} key={`${price?.min}-${price?.max}`} />

                <div className='sm:flex gap-2 justify-between'>

                    <div className='flex items-center gap-2 bg-base-100 min-w-28 sm:w-max border border-base-content/20 font-semibold rounded-sm'>
                        <DollarSign className='border-r border-base-content/20 p-2' size={42} /> {range[0]}
                    </div>

                    <div className='flex items-center gap-2 bg-base-100 min-w-28 sm:w-max border border-base-content/20 font-semibold rounded-sm max-sm:mt-2'>
                        <DollarSign className='border-r border-base-content/20 p-2' size={42} /> {range[1]}
                    </div>

                </div>

            </div>

            <div className={`${apartments.docs.length > 0 ? "grid" : ""} sm:grid-cols-2 lg:grid-cols-3 gap-3 p-1 md:p-3 xl:w-11/12 mx-auto`}>

                {
                    apartments.docs.length > 0 ? apartments.docs.map(
                        item => <div className="bg-base-100 p-2 md:p-3 rounded-sm shadow-sm" key={item._id}>
                            <div>
                                <div className="grid grid-cols-3 gap-2 xl:gap-3 mb-2 md:mb-3">
                                    <p className="col-span-2 font-medium text-lg rounded-sm bg-base-200 border border-base-300 p-2 md:p-3">Apartment No: {item.apartmentNo}</p>
                                    <p className="font-bold text-lg rounded-sm text-center bg-base-200 border border-base-300 p-2 md:p-3">${item.rent}</p>
                                </div>
                                <img className="rounded-sm border border-base-300 object-cover" src={item.apartmentImage} alt="" width="832" height="448" />
                            </div>
                            <div className="grid grid-cols-7 gap-2 xl:gap-3">
                                <p className="col-span-2 font-medium p-2 md:p-3 rounded-sm text-start bg-base-200 border border-base-300 mt-2 md:mt-3">Floor {item.floorNo}</p>
                                <p className="col-span-2 font-medium p-2 md:p-3 rounded-sm text-start bg-base-200 border border-base-300 mt-2 md:mt-3">{item.blockName}</p>
                                <button className={`col-span-3 bg-accent text-base-100 font-bold mt-2 md:mt-3 rounded-sm cursor-pointer ${item.requested ? "" : "active:scale-90"} transition-[scale] shadow-sm disabled:bg-accent/30 disabled:cursor-not-allowed`} onClick={() => requestHandler(item._id)} disabled={item.requested}>Request</button>
                            </div>
                        </div>
                    ) : <p className='text-xl text-center text-warning'>No Apartments Available !</p>
                }

            </div>

            {
                apartments.docs.length > 0 && <div className='flex items-center gap-2 w-max mx-auto my-4'>
                    <button className={`${page > 1 ? "bg-accent" : "bg-accent/30"} rounded-full text-base-100 active:scale-90 transition-[scale] cursor-pointer`} onClick={prevPage}>
                        <CircleChevronLeft size={30} />
                    </button>
                    <p className='text-xl'>{page}/{Math.ceil(apartments.totalDocs / limit)}</p>
                    <button className={`${page < Math.ceil(apartments.totalDocs / limit) ? "bg-accent" : "bg-accent/30"} rounded-full text-base-100 active:scale-90 transition-[scale] cursor-pointer`} onClick={nextPage}>
                        <CircleChevronRight size={30} />
                    </button>
                </div>
            }

        </>
    )
}

export default Apartments