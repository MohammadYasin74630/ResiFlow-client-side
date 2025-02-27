import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useRef, useState } from "react"
import { toast } from "sonner"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { Riple } from "react-loading-indicators"
import { Info } from "lucide-react"
import ReactiveButton from "reactive-button"

function CheckoutForm({ stepNum, userData, intentLoading, intentSecret, setIntentSecret, totalRent, setTotalRent, apartmentData, setApartmentData }) {

    const [btnLoading, setBtnLoading] = useState("idle")
    const [errorMessage, setErrorMessage] = useState()
    const couponRef = useRef()
    const axiosSecure = useAxiosSecure()
    const [discount, setDiscount] = useState()
    const showSuccess = (msg) => toast.success(msg)
    const showWarning = (msg) => toast.warning(msg)
    const showError = (msg) => toast.error(msg)
    const stripe = useStripe()
    const elements = useElements()

    const verifyCoupon = async () => {
        try {
            const code = couponRef.current.value
            if (!code) return showError("plz enter a coupon code to apply !")

            const { data } = await axiosSecure.post(`/coupon/${code}`, {
                email: userData?.email
            })

            if (data === null) return showWarning("Coupon code is not valid")
            if (data?.message) return showWarning(data.message)
            if (!data?.shown) return showWarning("This coupon has been disabled")

            setDiscount(data)
            setErrorMessage("")

            let percent = data.discountPercentage / 100

            setTotalRent(userData?.apartment?.rent - (userData?.apartment?.rent * percent))

            showSuccess(`${data.discountPercentage}% Discount applied !`)
        }
        catch (err) {
            showError(err.message)
        }
    }

    const handleSubmit = async (e) => {

        setBtnLoading("loading")

        e.preventDefault()

        if (!stripe || !elements) return
        const card = elements.getElement(CardElement);

        if (card === null) return

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setBtnLoading("error")
            setErrorMessage(error.message)
        }
        else {
            setErrorMessage("")
        }

        const { paymentIntent, error: confirmeError } = await stripe.confirmCardPayment(
            intentSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userData?.name,
                        email: userData?.email
                    }
                }
            }
        )

        if (confirmeError) {
            setBtnLoading("error")
            setErrorMessage(confirmeError.message)
        } else {
            setBtnLoading("success")
            showSuccess("Payment successfull")
            setIntentSecret("")

            try {
                setApartmentData(
                    prev => ({ ...prev, rent: totalRent })
                )
                const { data } = await axiosSecure.post(`/payment-history`, {
                    userEmail: userData.email,
                    paidMonth: apartmentData.month,
                    paymentId: paymentIntent.id,
                    couponCode: discount?.couponCode,
                    totalRent,
                    year: new Date().getFullYear()
                })
                if (data.acknowledged) stepNum(3)
            }
            catch (err) {
                showError(err.message)
            }

        }
    }


    if (intentLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (intentSecret?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching Payment Intent Failed !</p>

    return (
        <>
            <h3 className='text-center mb-3 pb-2 text-xl font-bold border-b-2 border-base-300'>MAKE PAYMENT</h3>

            {
                userData?.apartment?.rent && <p className="text-5xl text-center mb-6">${totalRent}</p>
            }

            <form onSubmit={handleSubmit}>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <p className={`text-sm ${errorMessage ? "text-error" : "opacity-0"}`}>{errorMessage || "no error"}</p>

                <div className="grid sm:grid-cols-2 items-end gap-2 mb-4">
                    <div className="relative pt-7 mb-1">
                        <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer" type="text" name="coupon" autoComplete="off" spellCheck={false} ref={couponRef} defaultValue={discount?.couponCode} />

                        <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">COUPON CODE</span>
                    </div>

                    <div className="mb-1 text-center h-[46px] grid grid-cols-2 gap-2">
                        <button className="btn btn-primary h-full" type="button" onClick={verifyCoupon}>Apply</button>

                        <ReactiveButton
                            className='!h-[46px] !bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                            disabled={!stripe || intentLoading || !intentSecret || btnLoading === "loading"}
                            type='submit'
                            buttonState={btnLoading}
                            idleText="Pay"
                            loadingText="Loading"
                            successText="Done"
                            width={'100%'}
                        />
                    </div>
                </div>

            </form>
        </>
    )
}

export default CheckoutForm