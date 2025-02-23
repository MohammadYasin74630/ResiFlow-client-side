import { useContext, useRef, useState } from 'react';
import forgotImg from "../../assets/forgotApartment.webp"
import ReactiveButton from 'reactive-button';
import { Link, NavLink, useLocation } from 'react-router';
import { toast } from 'sonner';
import { AuthContext } from '../../utils/AuthProvider';

function ForgotPassword() {
    const { state } = useLocation()
    const [btnLoading, setBtnLoading] = useState("idle");
    const [email, setEmail] = useState({ active: false, value: state?.email || "" })
    const formRef = useRef()
    const check = useRef({})
    const { forgotPassword } = useContext(AuthContext);
    const success = (msg) => toast.success(msg)
    const warn = (msg) => toast.warning(msg)
    const error = (msg) => toast.error(msg)

    if (email.active) {
        const email = formRef.current.email;

        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            email.style.border = "1px solid var(--color-success)";
            check.current.emailAlright = true;
        }
        else {
            email.style.border = "1px solid var(--color-error)";
            check.current.emailAlright = false;
        }

    }


    const resetForm = () => {
        setEmail({ active: false, value: "" })
        formRef.current.email.style.border = ""
    }

    const submitHandler = async (e) => {

        e.preventDefault()
        const form = e.target
        const email = form.email

        if (!email.value) {
            warn("plz enter a email")
            email.style.border = "1px solid var(--color-error)"
            check.current.emailAlright = false;
        }
        else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            email.style.border = "1px solid var(--color-success)"
        }

        if (check.current.emailAlright) {

            setBtnLoading("loading");

            try {

                await forgotPassword(email.value)

                resetForm()
                setBtnLoading("success")
                window.location.replace('https://mail.google.com/')
                success("Email Sent Successfully")
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
            <title>ResiFlow | Forgot Password</title>
            <div className='max-w-5xl my-20 mx-auto p-2 md:p-4 rounded-sm min-[640px]:grid grid-cols-2 gap-2 overflow-hidden'>

                <div className='max-sm:hidden'>
                    <img className='rounded-sm h-full object-cover' src={forgotImg} alt="" width="768" height="576" />
                </div>

                <div className='bg-base-100 p-3 rounded-sm' >

                    <h3 className='text-center mb-4 pb-2 text-xl font-bold border-b-2 border-base-300'>Reset Password</h3>

                    <p className='mb-1 mt-5 text-center font-medium text-base-content/90'>Enter the email address you registered with and we'll send you and email to reset your password</p>

                    <form onSubmit={submitHandler} ref={formRef} noValidate>

                        <fieldset disabled={btnLoading === "loading"}>

                            <div className="relative pt-7 mb-1">
                                <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type="email" name="email" value={email.value} onChange={e => setEmail({ ...email, value: e.target.value })} onFocus={() => setEmail({ ...email, active: true })} autoComplete="off" spellCheck={false} />

                                <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">EMAIL</span>
                            </div>

                            <p className='my-5 leading-tight text-sm font-medium text-base-content/80'>
                                <strong>Note:</strong> When resetting password, Please ensure your password meets this site's validation requirements; otherwise, you won't be able to log in with that password.
                            </p>

                            <ReactiveButton
                                className='!bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
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

                    <p className='text-center my-4'>
                        {
                            btnLoading === "loading" ? <>
                                <Link className='font-medium text-primary/50 cursor-not-allowed'>Back to Login</Link>
                            </> : <>
                                <NavLink className='font-medium text-primary' to='/login'>Back to Login</NavLink>
                            </>
                        }
                    </p>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword