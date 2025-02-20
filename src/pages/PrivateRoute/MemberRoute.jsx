import { useContext } from "react"
import { AuthContext } from "../../utils/AuthProvider"
import { Riple } from "react-loading-indicators"
import { useLocation } from "react-router"
import useRole from "../../hooks/useRole"
import LoginForm from "./LoginForm"

function MemberRoute({ children }) {

    const { user, loading } = useContext(AuthContext)
    const { data, isLoading } = useRole()
    const { pathname } = useLocation()

    if (loading || isLoading) return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (user && data === "member") return children

    return <>
        <title>ResiFlow | Member Route</title>
        <LoginForm pathname={pathname} />
    </>
}

export default MemberRoute