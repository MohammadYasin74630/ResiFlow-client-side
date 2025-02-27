import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'sonner';

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key)

function PaymentForm({ stepNum, userData, apartmentData, setApartmentData }) {

    const [totalRent, setTotalRent] = useState(userData?.apartment?.rent);
    const axiosSecure = useAxiosSecure()
    const [intentSecret, setIntentSecret] = useState()
    const [intentLoading, setIntentLoading] = useState(false)
    const showError = (msg) => toast.error(msg)

    useEffect(() => {
        const fetchIntent = async () => {
            try {
                setIntentLoading(true)
                const { data } = await axiosSecure.post("/create-payment-intent", { totalRent })
                setIntentLoading(false)
                setIntentSecret(data.clientSecret)
            }
            catch (err) {
                setIntentLoading(false)
                showError(err.message)
            }
        }
        fetchIntent()
    }, [totalRent])


    return (
        <>
            <Elements stripe={stripePromise}>
                <div className='relative min-h-64'>
                    <CheckoutForm stepNum={stepNum} userData={userData} intentSecret={intentSecret} intentLoading={intentLoading} setIntentSecret={setIntentSecret} totalRent={totalRent} setTotalRent={setTotalRent} apartmentData={apartmentData} setApartmentData={setApartmentData} />
                </div>
            </Elements>
        </>
    )
}

export default PaymentForm