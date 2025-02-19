import { Link } from "react-router"
import errorImg from "../../assets/error.webp"
import "./Error.css"

function Error() {
    return (
        <>
            <title>ResiFlow | Page Not Found</title>
            <div className="relative mt-[70px] m-4 rounded-md overflow-hidden">
                <img className="w-full min-h-96 mix-blend-overlay object-cover" src={errorImg} alt="" width="832" height="448" />

                <div className="error-container anton-regulars absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-center">
                    <h3 className="text-8xl font-bold -ml-3" >404</h3>
                    <h3 className="text-8xl font-bold -mt-9">Error</h3>
                    <p className="text-lg font-bold my-1">This page is missing or you typed the link incorrectly</p>
                    <Link className='font-medium text-primary underline' to="/">Back To Home</Link>
                </div>
            </div>
        </>
    )
}

export default Error