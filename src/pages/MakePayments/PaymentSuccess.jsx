import { Check } from 'lucide-react';

function PaymentSuccess({ stepNum, apartmentData }) {

    return (
        <>
            <h3 className='text-center mb-3 pb-2 text-xl font-bold border-b-2 border-base-300'>PAYMENT DONE</h3>
            <div className='text-center space-y-4'>
                <p className='bg-success text-base-100 w-max rounded-full mx-auto'><Check size={90} /></p>
                <p className='font-bold'>Rent Paid Successfully</p>
                <p className='font-medium text-base-content/80'>Your rent of ${apartmentData?.rent || 0} has been received. Thank you!</p>
                <button className='btn btn-accent text-base-100 mt-2' onClick={() => stepNum(1)}>GO BACK</button>
            </div>
        </>
    )
}

export default PaymentSuccess