import { Eye, EyeClosed, Github } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import loginImg from "../../assets/login.webp"
import ReactiveButton from 'reactive-button';
import { Link, NavLink, useLocation, useNavigate, useNavigationType } from 'react-router';
import { toast } from 'sonner';
import { AuthContext } from '../../utils/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2'

function Login() {
    const [googleLoading, setGoogleLoading] = useState("idle");
    const [githubLoading, setGithubLoading] = useState("idle");
    const [btnLoading, setBtnLoading] = useState("idle");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState({ active: false, value: "" })
    const [password, setPassword] = useState({ active: false, value: "" })
    const formRef = useRef()
    const check = useRef({})
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { state } = useLocation()
    const navigationType = useNavigationType();
    const { login, googleLogin, githubLogin } = useContext(AuthContext);
    const success = (msg) => toast.success(msg)
    const warn = (msg) => toast.warning(msg)
    const error = (msg) => toast.error(msg)

    useEffect(
        () => {

            window.scrollTo(0, 0); // not working in firefox

            if (state === "/apartments" && navigationType === 'PUSH') {
                Swal.fire({
                    icon: "warning",
                    title: "Plz Login !",
                    html: "You need to login to request apartment",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    iconColor: "var(--color-warning)",
                    color: "var(--color-neutral-content)",
                    background: "var(--color-primary)",
                })
            }

            return () => Swal.close()
        }, []
    )

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

    if (password.active) {
        const password = formRef.current.password;

        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)) {
            password.style.border = "1px solid var(--color-success)";
            check.current.passwordAlright = true;
        }
        else {
            password.style.border = "1px solid var(--color-error)";
            check.current.passwordAlright = false;
        }

    }

    const resetForm = () => {
        setEmail({ active: false, value: "" })
        setPassword({ active: false, value: "" })

        formRef.current.email.style.border = ""
        formRef.current.password.style.border = ""
    }

    const submitHandler = async (e) => {

        e.preventDefault()
        const form = e.target
        const email = form.email
        const password = form.password

        if (!email.value) {
            warn("plz enter a email")
            email.style.border = "1px solid var(--color-error)"
            check.current.emailAlright = false;
        }
        else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            email.style.border = "1px solid var(--color-success)"
        }

        if (!password.value) {
            warn("plz enter a password")
            password.style.border = "1px solid var(--color-error)"
            check.current.passwordAlright = false;
        }
        else if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)) {
            password.style.border = "1px solid var(--color-success)"
        }

        if (check.current.emailAlright && check.current.passwordAlright) {

            setBtnLoading("loading");

            const body = {
                email: email.value,
                password: password.value
            }

            try {

                await login(body.email, body.password)

                resetForm()
                setBtnLoading("success")
                navigate("/")
                success("Login Successfully")
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

    const googleIn = async () => {

        try {
            setGoogleLoading("loading")
            const body = {}

            const { user } = await googleLogin()
            body.name = user.displayName
            body.email = user?.email || user?.providerData[0]?.email
            body.profileImg = user.photoURL
            body.lastLoginAt = new Date(parseInt(user.metadata.lastLoginAt))

            const result = await axiosPublic.post("/user", body)

            setGoogleLoading("success")
            navigate("/")
            if (result.data.error) return error(result.data.error)
            if (result.data.acknowledged) return success("Login Successfully")
        }
        catch (err) {

            setGoogleLoading("error")

            if (err.message.includes("/")) {
                return error(/\/(.+\w+)/.exec(err.message)[1].replaceAll("-", " "))
            }

            return error(err.message)
        }
    }

    const githubIn = async () => {

        try {
            setGithubLoading("loading")
            const body = {}
            const { user } = await githubLogin()

            body.name = user.displayName
            body.email = user?.email || user?.providerData[0]?.email
            body.profileImg = user.photoURL
            body.lastLoginAt = new Date(parseInt(user.metadata.lastLoginAt))

            const result = await axiosPublic.post("/user", body)

            setGithubLoading("success")
            navigate("/")

            if (result.data.error) return error(result.data.error)
            if (result.data.acknowledged) return success("Login Successfully")
        }
        catch (err) {

            setGithubLoading("error")

            if (err.message.includes("/")) {
                return error(/\/(.+\w+)/.exec(err.message)[1].replaceAll("-", " "))
            }

            return error(err.message)
        }
    }

    return (
        <>
            <title>ResiFlow | Login</title>
            <div className='max-w-5xl my-20 mx-auto p-2 md:p-4 rounded-sm min-[640px]:grid grid-cols-2 gap-2 overflow-hidden'>

                <div className='max-sm:hidden'>
                    <img className='rounded-sm h-full object-cover' src={loginImg} alt="" width="576" height="768" />
                </div>

                <div className='bg-base-100 p-3 rounded-sm' >

                    <h3 className='text-center mb-4 pb-2 text-xl font-bold border-b-2 border-base-300'>Login</h3>

                    <ReactiveButton
                        className='!bg-neutral-content/30 !text-base-content !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                        disabled={googleLoading === "loading"}
                        idleText={
                            <span className='flex items-center gap-1 w-max mx-auto'>
                                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg> Login Via Google
                            </span>
                        }
                        buttonState={googleLoading}
                        loadingText="Loading"
                        width={'100%'}
                        onClick={googleIn}
                    />

                    <div className='my-3'></div>

                    <ReactiveButton
                        className='!bg-gray-600 !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                        disabled={githubLoading === "loading"}
                        idleText={
                            <span className='flex items-center gap-1 w-max mx-auto'>
                                <Github size={20} /> Login Via Github
                            </span>
                        }
                        buttonState={githubLoading}
                        width={'100%'}
                        onClick={githubIn}
                    />

                    <div className="divider">OR</div>

                    <form onSubmit={submitHandler} ref={formRef} noValidate>

                        <fieldset disabled={btnLoading === "loading"}>

                            <div className="relative pt-7 mb-1">
                                <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type="email" name="email" value={email.value} onChange={e => setEmail({ ...email, value: e.target.value })} onFocus={() => setEmail({ ...email, active: true })} autoComplete="off" spellCheck={false} />

                                <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">EMAIL</span>
                            </div>

                            <div className="relative pt-7 mb-4">
                                <input className="w-full p-[10px] rounded-sm border-primary focus:outline-none disabled:cursor-not-allowed peer" type={showPassword ? "text" : "password"} name="password" value={password.value} onChange={e => setPassword({ ...password, value: e.target.value })} onFocus={() => setPassword({ ...password, active: true })} autoComplete="false" />

                                <span className="absolute bottom-[35px] left-[11px] z-10 transition-all peer-focus:bottom-[49px] peer-focus:left-0 text-sm before:content-['.'] before:bg-base-100 before:w-full before:absolute before:-z-10 before:translate-y-[.6px] before:scale-y-[.5]">PASSWORD</span>

                                <div className='absolute top-10 right-2 select-none cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                                    {
                                        showPassword ? <Eye /> : <EyeClosed />
                                    }
                                </div>

                            </div>

                            {
                                showPassword ? <div className='my-4 text-sm'>
                                    <h3 className={`text-md text-warning`}>Password must include:</h3>
                                    <li className={`${/(?=.*[A-Z]).+/.test(password.value) ? "text-success" : "text-error"}`}>one uppercase letter (A-z)</li>
                                    <li className={`${/(?=.*[a-z]).+/.test(password.value) ? "text-success" : "text-error"}`}>one lowercase letter (a-z)</li>
                                    <li className={`${/(?=.*\d).+/.test(password.value) ? "text-success" : "text-error"}`}>one digit (0-9)</li>
                                    <li className={`${/(?=.*[@$!%*?&]).+/.test(password.value) ? "text-success" : "text-error"}`}>one special character (@$!%*?&)</li>
                                    <li className={`${/.{8,}/.test(password.value) ? "text-success" : "text-error"}`}>must have a minimum length of 8</li>
                                </div> : null
                            }

                            <ReactiveButton
                                className='!bg-primary !rounded-sm !font-medium !p-2 disabled:!cursor-not-allowed'
                                disabled={btnLoading === "loading"}
                                type='submit'
                                buttonState={btnLoading}
                                idleText="Log in"
                                loadingText="Loading"
                                successText="Done"
                                width={'100%'}
                            />
                        </fieldset>

                    </form>

                    <NavLink className='font-medium text-primary text-center block mt-4' to='/forgot-password'>Forgot Password</NavLink>

                    <p className='text-center my-4'>
                        {
                            btnLoading === "loading" || googleLoading === "loading" || githubLoading === "loading" ? <>
                                Don't have an account ? <Link className='font-medium text-primary/50 cursor-not-allowed'>Register</Link>
                            </> : <>
                                Don't have an account ? <NavLink className='font-medium text-primary' to='/register'>Register</NavLink>
                            </>
                        }
                    </p>

                </div>
            </div>
        </>
    )
}

export default Login