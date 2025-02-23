import { CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import FileInput from '../Register/FileInput';
import userLogo from "../../assets/user.webp"
import ReactiveButton from 'reactive-button';
import { toast } from 'sonner';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function UpdateProfile({ user, setUser, updateUserInfo }) {

    const [btnLoading, setBtnLoading] = useState("idle");
    const [name, setName] = useState({ active: false, value: user?.displayName || "" })
    const [file, setFile] = useState({ active: false, image: null })
    const formRef = useRef()
    const check = useRef({ nameAlright: true })
    const axiosPublic = useAxiosPublic()
    const success = (msg) => toast.success(msg)
    const warn = (msg) => toast.warning(msg)
    const error = (msg) => toast.error(msg)

    const removeImg = () => {
        setFile({ ...file, image: null })
    }

    const resetForm = () => {
        setName({ active: false, value: user?.displayName || "" })
        setFile({ active: false, image: null })

        formRef.current.username.style.border = ""
        formRef.current.image.parentElement.style.border = ""
    }

    const submitHandler = async (e) => {

        e.preventDefault()

        const username = e.target.username

        if (!username.value) {
            warn("plz enter a username")
            username.style.border = "1px solid var(--color-error)"
            check.current.nameAlright = false;
        }
        else if (/^[a-zA-Z0-9_ ]{3,50}$/.test(name.value)) {
            username.style.border = "1px solid var(--color-success)"
        }

        if (check.current.nameAlright) {

            setBtnLoading("loading");

            const body = {
                name: name.value
            }

            try {

                if (file.image) {

                    const { data } = await axiosPublic.post(import.meta.env.VITE_imgbb_endpoint,
                        { image: file.image },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )

                    body.profileImg = data.data.display_url;
                }

                body.email = user.email

                await updateUserInfo(body.name, body.profileImg)

                setUser(prev => ({ ...prev, displayName: body.name, photoURL: body.profileImg }))

                body.lastLoginAt = new Date(parseInt(user.metadata.lastLoginAt))

                const result = await axiosPublic.post("/user", body)

                resetForm()
                setBtnLoading("success")
                if (result.data.error) return error(result.data.error)
                if (result.data.acknowledged) return success("Updated Successfully")
            }
            catch (err) {

                setBtnLoading("error")

                if (err.message.includes("/")) {
                    return error(/\/(.+\w+)/.exec(err.message)[1].replaceAll("-", " "))
                }

                return error(err.message)
            }

        }
    }

    return (
        <>
            <div className='max-w-xs p-2 md:p-4 rounded-sm bg-base-100' >

                <h3 className='text-center mb-4 pb-2 text-xl font-bold border-b-2 border-base-300'>Update Account</h3>

                <div className='flex flex-wrap gap-2'>
                    <div className='flex-shrink-0 relative'>
                        <img className='w-20 h-20 object-cover rounded-sm' src={file.image?.previewUrl || user?.photoURL || userLogo} alt="" />
                        {
                            file.image ? <button className='absolute -top-2 -right-2 bg-error text-base-100 rounded-full cursor-pointer disabled:cursor-not-allowed' disabled={btnLoading === "loading"} onClick={removeImg}>
                                <CircleX />
                            </button> : null
                        }
                    </div>
                    <div className='mt-auto '>
                        <p className='font-semibold capitalize line-clamp-1'>{user?.displayName || "Anon"}</p>
                        {user?.email.split(/\b/).map(
                            (itm, idx) => <span key={idx}>{itm}<wbr /></span>
                        ) || "none"}
                    </div>
                </div>

                <form onSubmit={submitHandler} ref={formRef} noValidate>

                    <fieldset disabled={btnLoading === "loading"}>
                        <div className="relative pt-7 mb-1">
                            <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type="text" name="username" value={name.value} onChange={e => setName({ ...name, value: e.target.value })} onFocus={() => setName({ ...name, active: true })} autoComplete="off" spellCheck={false} />

                            <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">USERNAME</span>
                        </div>

                        <div className="relative pt-7 mb-6 group">
                            <FileInput file={file} setFile={setFile} formRef={formRef} check={check} btnLoading={btnLoading} />

                            <span className="absolute bottom-[35px] left-[11px] z-10 transition-all group-focus-within:bottom-[49px] group-focus-within:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">PICTURE</span>
                        </div>

                        <ReactiveButton
                            className='sm:!w-72 !bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                            disabled={btnLoading === "loading"}
                            type='submit'
                            buttonState={btnLoading}
                            idleText="Update"
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

export default UpdateProfile