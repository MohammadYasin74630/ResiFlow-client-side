import { useState } from 'react';
import ReactiveButton from 'reactive-button';
import { toast } from 'sonner';
import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

function DiscountForm({ coupon, enableLoading, disableLoading, axiosSecure, refetch }) {

    const [btnLoading, setBtnLoading] = useState("idle");
    const warn = (msg) => toast.warning(msg)
    const error = (msg) => toast.error(msg)


    const resetForm = (form) => {

        form.code.value = ""
        form.discountPercentage.value = ""
        form.description.value = ""
        form.shown.checked = false

        form.code.style.border = ""
        form.discountPercentage.style.border = ""
        form.description.style.border = ""
    }

    const submitHandler = async (e) => {

        e.preventDefault()
        let formAlright = true;
        const form = e.target
        const couponCode = form.code
        const discountPercentage = form.discountPercentage
        const couponDescription = form.description
        const shown = form.shown

        if (!couponCode.value) {
            warn("plz enter a discount code")
            couponCode.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (/^[a-zA-Z0-9]{3,20}$/.test(couponCode.value)) {
            couponCode.style.border = "1px solid var(--color-success)"
        }
        else {
            warn("plz enter a discount code without space or any special characters")
            couponCode.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }

        if (!discountPercentage.value) {
            warn("plz enter a discount percentage")
            discountPercentage.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (parseInt(discountPercentage.value) < 0) {
            warn("plz enter a positive discount percentage")
            discountPercentage.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (parseInt(discountPercentage.value) === 0) {
            warn("plz enter a discount percentage !!!")
            discountPercentage.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else if (parseInt(discountPercentage.value) > 100) {
            warn("plz enter a discount percentage lower than 100")
            discountPercentage.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            discountPercentage.style.border = "1px solid var(--color-success)"
        }

        if (!couponDescription.value) {
            warn("plz enter a discount description")
            couponDescription.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            couponDescription.style.border = "1px solid var(--color-success)"
        }


        if (formAlright) {

            setBtnLoading("loading");
            coupon && enableLoading()

            const body = {
                couponCode: couponCode.value,
                discountPercentage: parseInt(discountPercentage.value),
                couponDescription: couponDescription.value,
                shown: shown.checked
            }

            try {
                const result = await axiosSecure.post(`/coupon`, body)

                !coupon && resetForm(form)
                coupon && disableLoading()
                setBtnLoading("success")
                refetch()

                if (result.data.error) {
                    return Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: result.data.error,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-error)`,
                        color: "var(--color-base-100)",
                        background: "var(--color-primary)",
                    });
                }
                if (result.data.upsertedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added Successfully",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-success)`,
                        color: "var(--color-neutral-content)",
                        background: "var(--color-primary)",
                    });
                }
                if (result.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated Successfully",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        iconColor: `var(--color-success)`,
                        color: "var(--color-neutral-content)",
                        background: "var(--color-primary)",
                    });
                }
            }
            catch (err) {

                setBtnLoading("error")

                return error(err.message)
            }

        }
    }

    return (
        <>
            <div className='max-w-xs p-2 md:p-4 rounded-sm'>

                <h3 className='text-center pb-2 text-xl font-bold border-b-2 border-base-300'>{coupon ? "Update" : "Add"} Coupon</h3>

                <form onSubmit={submitHandler} noValidate>

                    <fieldset disabled={btnLoading === "loading"}>
                        <div className="relative pt-7 mb-1">
                            <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer disabled:opacity-50" type="text" name="code" autoComplete="off" spellCheck={false} defaultValue={coupon?.couponCode} disabled={coupon?.couponCode} />

                            <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">CODE</span>
                        </div>

                        <div className="relative pt-7 mb-1">
                            <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type="number" name="discountPercentage" autoComplete="off" spellCheck={false} min={0} max={100} defaultValue={coupon?.discountPercentage} />

                            <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">PERCENTAGE</span>
                        </div>

                        <div className="relative pt-7 mb-1">
                            <TextareaAutosize className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" name="description" autoComplete="off" spellCheck={false} defaultValue={coupon?.couponDescription} />

                            <span className="absolute top-[19px] left-[11px] z-10 transition-all peer-focus:top-[4px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:scale-y-[.5]">DESCRIPTION</span>
                        </div>

                        <div className="mb-2 text-center">

                            <label htmlFor='shown' className='mr-4 select-none'>VISIBLE:</label>
                            <label className="swap swap-flip ">
                                <input type="checkbox" name='shown' id="shown" defaultChecked={coupon?.shown} />

                                <div className="swap-on bg-success text-white font-medium py-1 px-3 rounded-sm">Yess</div>
                                <div className="swap-off bg-error text-white font-medium py-1 px-3 rounded-sm">Noo</div>
                            </label>
                        </div>


                        <ReactiveButton
                            className='sm:!w-72 !bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                            disabled={btnLoading === "loading"}
                            type='submit'
                            buttonState={btnLoading}
                            idleText="Submit"
                            loadingText="Loading"
                            successText="Done"
                            width={'100%'}
                        />
                    </fieldset>

                </form>

            </div>
        </>
    )
}

export default DiscountForm