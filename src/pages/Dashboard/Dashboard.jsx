import { useContext } from "react"
import useUserData from "../../hooks/useUserData"
import AdminStats from "./AdminStats"
import AllMembers from "./AllMembers"
import UserRequests from "./UserRequests"
import { AuthContext } from "../../utils/AuthProvider"
import { Info } from "lucide-react"
import { Riple } from "react-loading-indicators"

function Dashboard() {

  const { loading, user } = useContext(AuthContext)
  const { isLoading, data: userData } = useUserData()


  if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
    <Riple color="#fab600" size="medium" text="" textColor="" />
  </div>

  if (!user || !userData || userData.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching User Data Failed !</p>

  return (
    <>
      {
        userData.role === "member" ? <AllMembers /> : userData.role === "admin" ? <AdminStats /> : <UserRequests />
      }
    </>
  )
}

export default Dashboard