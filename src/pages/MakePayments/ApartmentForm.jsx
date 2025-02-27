import ReactiveButton from "reactive-button"
import { toast } from "sonner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Riple } from "react-loading-indicators";
import { Info } from "lucide-react";

function ApartmentForm({ stepNum, userData, setApartmentData }) {

    const warn = (msg) => toast.warning(msg)
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, data: months } = useQuery({
        queryKey: [new Date().getFullYear(), "paid-months"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/paid-months/${new Date().getFullYear()}`)

            return data
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        let formAlright = true;
        const form = e.target
        const email = form.email
        const apartmentNo = form.apartmentNo
        const floorNo = form.floorNo
        const blockNo = form.blockNo
        const rent = form.rent
        const month = form.month

        if (!email.value) {
            warn("plz enter the email")
            email.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            email.style.border = "1px solid var(--color-success)"
        }

        if (!apartmentNo.value) {
            warn("plz enter the apartment no")
            apartmentNo.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            apartmentNo.style.border = "1px solid var(--color-success)"
        }

        if (!floorNo.value) {
            warn("plz enter the floor number")
            floorNo.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            floorNo.style.border = "1px solid var(--color-success)"
        }

        if (!blockNo.value) {
            warn("plz enter the block number")
            blockNo.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            blockNo.style.border = "1px solid var(--color-success)"
        }

        if (!rent.value) {
            warn("plz enter the rent amount")
            rent.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (parseInt(rent.value) < 0) {
            warn("plz enter the positive rent amount")
            rent.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (parseInt(rent.value) === 0) {
            warn("plz enter the rent amount !!!")
            rent.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            rent.style.border = "1px solid var(--color-success)"
        }

        if (!month.value) {
            warn("plz select the month you want to pay rent for")
            month.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            month.style.border = "1px solid var(--color-success)"
        }

        if (formAlright) {
            const obj = {
                email: email.value,
                apartmentNo: apartmentNo.value,
                floorNo: floorNo.value,
                blockNo: blockNo.value,
                rent: rent.value,
                month: month.value
            }
            setApartmentData(obj)
            stepNum(2)
        }
    }

    if (isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (isError || months?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Paid month List Failed !</p>

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <h3 className='text-center mb-3 pb-2 text-xl font-bold border-b-2 border-base-300'>SELECT MONTH</h3>

                <fieldset disabled>

                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="email" name="email" autoComplete="off" spellCheck={false} defaultValue={userData?.email} />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">EMAIL</span>
                    </div>

                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="text" name="apartmentNo" autoComplete="off" spellCheck={false} defaultValue={userData?.apartment?.apartmentNo} />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">APARTMENT NO</span>
                    </div>

                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="number" name="floorNo" autoComplete="off" spellCheck={false} defaultValue={userData?.apartment?.floorNo
                        } />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">FLOOR NO</span>
                    </div>

                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="text" name="blockNo" autoComplete="off" spellCheck={false} defaultValue={userData?.apartment?.blockName.split(" ")[1]} />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">BLOCK NO</span>
                    </div>

                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="number" name="rent" autoComplete="off" spellCheck={false} defaultValue={userData?.apartment?.rent} />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">RENT</span>
                    </div>

                </fieldset>

                <div className="relative pt-7 mb-4">
                    <select className="select select-primary w-full h-[46px] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" name="month" defaultValue="">
                        <option value=""></option>
                        <option value="january" disabled={months.includes("january")}>January</option>
                        <option value="february" disabled={months.includes("february")}>February</option>
                        <option value="march" disabled={months.includes("march")}>March</option>
                        <option value="april" disabled={months.includes("april")}>April</option>
                        <option value="may" disabled={months.includes("may")}>May</option>
                        <option value="june" disabled={months.includes("june")}>June</option>
                        <option value="july" disabled={months.includes("july")}>July</option>
                        <option value="august" disabled={months.includes("august")}>August</option>
                        <option value="september" disabled={months.includes("september")}>September</option>
                        <option value="october" disabled={months.includes("october")}>October</option>
                        <option value="november" disabled={months.includes("november")}>November</option>
                        <option value="december" disabled={months.includes("december")}>December</option>
                    </select>

                    <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">MONTH</span>
                </div>

                <ReactiveButton
                    className='!bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                    type='submit'
                    idleText="Next"
                    loadingText="Loading"
                    successText="Done"
                    width={'100%'}
                />

            </form>
        </>
    )
}

export default ApartmentForm