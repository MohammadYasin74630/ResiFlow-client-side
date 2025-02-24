import { useState } from 'react';
import ReactiveButton from 'reactive-button';
import { toast } from 'sonner';
import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

function AnnouncementForm({ anouncement, enableLoading, disableLoading, axiosSecure, refetch }) {

    const [btnLoading, setBtnLoading] = useState("idle");
    const warn = (msg) => toast.warning(msg)
    const error = (msg) => toast.error(msg)


    const resetForm = (form) => {

        form.title.value = ""
        form.description.value = ""

        form.title.style.border = ""
        form.description.style.border = ""
    }

    const submitHandler = async (e) => {

        e.preventDefault()
        let formAlright = true;
        const form = e.target
        const title = form.title
        const description = form.description

        if (!title.value) {
            warn("plz enter a announcement title")
            title.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            title.style.border = "1px solid var(--color-success)"
        }

        if (!description.value) {
            warn("plz enter a announcement description")
            description.style.border = "1px solid var(--color-error)"
            formAlright = false;
        }
        else {
            description.style.border = "1px solid var(--color-success)"
        }


        if (formAlright) {

            setBtnLoading("loading");
            anouncement && enableLoading()

            const body = {
                id: anouncement?._id,
                title: title.value,
                description: description.value,
                announcedAt: anouncement?.announcedAt
            }

            try {
                const result = await axiosSecure.post(`/anouncement`, body)

                !anouncement && resetForm(form)
                anouncement && disableLoading()
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

                <h3 className='text-center pb-2 text-xl font-bold border-b-2 border-base-300'>{anouncement ? "Update" : "Add"} Announcement</h3>

                <form onSubmit={submitHandler} noValidate>

                    <fieldset disabled={btnLoading === "loading"}>
                        <div className="relative pt-7 mb-1">
                            <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type="text" name="title" autoComplete="off" spellCheck={false} defaultValue={anouncement?.title} />

                            <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">TITLE</span>
                        </div>

                        <div className="relative pt-7 mb-4">
                            <TextareaAutosize className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" name="description" autoComplete="off" spellCheck={false} defaultValue={anouncement?.description} />

                            <span className="absolute top-[19px] left-[11px] z-10 transition-all peer-focus:top-[4px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:scale-y-[.5]">DESCRIPTION</span>
                        </div>

                        <ReactiveButton
                            className='min-[350px]:!w-72 !bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
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

export default AnnouncementForm