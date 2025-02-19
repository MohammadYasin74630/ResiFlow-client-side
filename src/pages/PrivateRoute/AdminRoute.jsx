import { useContext } from "react"
import { AuthContext } from "../../utils/AuthProvider"
import { Riple } from "react-loading-indicators"
import { Navigate } from "react-router"
import useRole from "../../hooks/useRole"
import { toast } from "sonner"

function AdminRoute({ children }) {

    const { user, loading } = useContext(AuthContext)
    const { data, isLoading } = useRole()
    const error = (msg) => toast.error(msg)

    if (loading || isLoading) return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Riple color="#fab600" size="medium" text="" textColor="" />
    </div>

    if (user && data === "admin") return children

    if (data === "user" || data === "member") error("Access Forbidden !")

    return <Navigate to="/" replace />
}

export default AdminRoute