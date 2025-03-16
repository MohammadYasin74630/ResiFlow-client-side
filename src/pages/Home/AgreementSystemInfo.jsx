import { useInView } from "react-intersection-observer"

function AgreementSystemInfo() {

    const { ref, inView } = useInView();

    return (
        <>
            <div className={`text-base-100 grid lg:grid-cols-2 gap-1 md:p-4 ${inView ? "animate__animated animate__fadeIn animate__slow" : "opacity-0"}`} ref={ref}>

                <div className="space-y-2 max-md:ml-3">
                    <h2 className="text-xl font-bold">ONLINE AGREEMENT SYSTEM</h2>
                    <p className="max-w-[55ch] text-base-300 font-medium mt-1">Our Online Agreement System ensures a seamless and transparent rental experience with ease.</p>
                    <p className="text-lg font-bold mt-4">Steps:</p>
                </div>

                <div className="flex max-[500px]:flex-col md:gap-4">
                    <p className="text-2xl text-base-content/75 font-bold bg-base-100 h-14 w-14 min-w-14 mt-6 max-md:ml-3 rounded-full flex items-center justify-center">
                        <span>1</span>
                    </p>
                    <div className={`p-4 `}>
                        <h3 className="text-lg font-bold">Apartment Request</h3>
                        <p className="max-w-[55ch] text-base-300 font-medium mt-1">Prospective tenants start by submitting a request for an apartment through our platform.</p>
                    </div>
                </div>

                <div className="flex max-[500px]:flex-col md:gap-4">
                    <p className="text-2xl text-base-content/75 font-bold bg-base-100 h-14 w-14 min-w-14 mt-6 max-md:ml-3 rounded-full flex items-center justify-center">
                        <span>2</span>
                    </p>
                    <div className={`p-4 `}>
                        <h3 className="text-lg font-bold">Member Dashboard Access</h3>
                        <p className="max-w-[55ch] text-base-300 font-medium mt-1">Once approved by admin, the user gains access to a Member Dashboard, where they can manage their rental agreement and make payments.</p>
                    </div>
                </div>

                <div className="flex max-[500px]:flex-col md:gap-4">
                    <p className="text-2xl text-base-content/75 font-bold bg-base-100 h-14 w-14 min-w-14 mt-6 max-md:ml-3 rounded-full flex items-center justify-center">
                        <span>3</span>
                    </p>
                    <div className={`p-4 `}>
                        <h3 className="text-lg font-bold">Flexible Rent Payment</h3>
                        <p className="max-w-[55ch] text-base-300 font-medium mt-1">Member can pay rent for any month, whether it's a past due amount or an advance payment for upcoming months.</p>
                    </div>
                </div>

                <div className="flex max-[500px]:flex-col md:gap-4">
                    <p className="text-2xl text-base-content/75 font-bold bg-base-100 h-14 w-14 min-w-14 mt-6 max-md:ml-3 rounded-full flex items-center justify-center">
                        <span>4</span>
                    </p>
                    <div className={`p-4 `}>
                        <h3 className="text-lg font-bold">Late Payments & Eviction Policy</h3>
                        <p className="max-w-[55ch] text-base-300 font-medium mt-1">If a tenant fails to pay rent for three consecutive months, the admin has the authority to initiate an eviction process via the Admin Dashboard.</p>
                    </div>
                </div>

                <div className="flex max-[500px]:flex-col md:gap-4">
                    <p className="text-2xl text-base-content/75 font-bold bg-base-100 h-14 w-14 min-w-14 mt-6 max-md:ml-3 rounded-full flex items-center justify-center">
                        <span>5</span>
                    </p>
                    <div className={`p-4 `}>
                        <h3 className="text-lg font-bold">Discount & Coupon System</h3>
                        <p className="max-w-[55ch] text-base-300 font-medium mt-1">Our platform features a coupon-based discount system that allows tenants to apply special offers on their rent payments.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AgreementSystemInfo