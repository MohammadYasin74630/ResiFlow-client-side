import { useContext, useState } from "react"
import ApartmentForm from "./ApartmentForm"
import PaymentForm from "./PaymentForm";
import useUserData from "../../hooks/useUserData";
import { AuthContext } from "../../utils/AuthProvider";
import { Riple } from "react-loading-indicators";
import { Info } from "lucide-react";
import PaymentSuccess from "./PaymentSuccess";

function MakePayments() {

    const [step, setStep] = useState(1);
    const [showDirection, setShowDirection] = useState("");
    const [closeDirection, setCloseDirection] = useState("")
    const { user, loading } = useContext(AuthContext)
    const { isLoading, data: userData } = useUserData()
    const [apartmentData, setApartmentData] = useState()

    const stepNum = (num) => {
        if (num > 3 || num < 1) return
        if (step === num) return
        let direction = step > num ? "next" : "prev"
        setCloseDirection(direction)
        setTimeout(() => {
            setCloseDirection("")
            setShowDirection(direction)
            setStep(num)
        }, 500);
    }

    if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (!user || userData?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching User Data Failed !</p>

    return (
        <>
            <title>ResiFlow | Make Payments</title>
            <div className="max-w-lg mx-auto my-20 bg-base-100 shadow-sm max-sm:max-w-[97%]">

                <div className="w-max mx-auto !pt-6">
                    <ul className="steps" >
                        <button data-content="?" className={`step ${step > 0 ? "step-primary" : ""}`} >
                            Step 1
                        </button>
                        <button data-content="!" className={`step ${step > 1 ? "step-primary" : ""}`} >
                            Step 2
                        </button>
                        <button data-content="✓" className={`step ${step > 2 ? "step-primary" : ""}`} >
                            Step 3
                        </button>
                    </ul>
                </div>
                <div className="overflow-hidden">

                    {
                        step === 1 ? <div className={`p-4 animate__animated ${showDirection === "prev" ? "animate__slideInRight" : showDirection === "next" ? "animate__slideInLeft" : ""} ${closeDirection === "prev" ? "animate__slideOutLeft" : closeDirection === "next" ? "animate__slideOutRight" : ""} animate__faster shadow-sm`}>
                            <ApartmentForm stepNum={stepNum} isLoading={isLoading} userData={userData} setApartmentData={setApartmentData} />
                        </div> : null
                    }
                    {
                        step === 2 ? <div className={`p-4 animate__animated  ${showDirection === "prev" ? "animate__slideInRight" : showDirection === "next" ? "animate__slideInLeft" : ""} ${closeDirection === "prev" ? "animate__slideOutLeft" : closeDirection === "next" ? "animate__slideOutRight" : ""} animate__faster shadow-sm`}>
                            <PaymentForm stepNum={stepNum} isLoading={isLoading} userData={userData} apartmentData={apartmentData} setApartmentData={setApartmentData} />
                        </div> : null
                    }
                    {
                        step === 3 ? <div className={`p-4 animate__animated  ${showDirection === "prev" ? "animate__slideInRight" : showDirection === "next" ? "animate__slideInLeft" : ""} ${closeDirection === "prev" ? "animate__slideOutLeft" : closeDirection === "next" ? "animate__slideOutRight" : ""} animate__faster shadow-sm `}>
                            <PaymentSuccess stepNum={stepNum} apartmentData={apartmentData} />
                        </div> : null
                    }
                </div>

            </div>

        </>
    )
}

export default MakePayments