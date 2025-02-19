import { useContext } from "react"
import { AuthContext } from "../../utils/AuthProvider"
import { Riple } from "react-loading-indicators"
import LoginForm from "./LoginForm"
import { useLocation } from "react-router"

function PrivateRoute({ children }) {

    const { user, loading } = useContext(AuthContext)
    const { pathname } = useLocation()

    if (loading) return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (!user) return <>
        <title>ResiFlow | Protected Route</title>
        <LoginForm pathname={pathname} />
    </>

    return (
        <>
            {
                children
            }
        </>
    )
}

export default PrivateRoute