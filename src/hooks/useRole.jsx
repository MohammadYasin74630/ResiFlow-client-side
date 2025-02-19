import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"
import { toast } from "sonner"

function useRole() {

  const { user, loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const error = (msg) => toast.error(msg)
  const success = !loading && user?.email

  const { isLoading, data } = useQuery(
    {
      enabled: !!success,
      queryKey: [user?.email, "userRole"],
      queryFn: async () => {
        try {
          const { data } = await axiosSecure.get(`/role/${user?.email}`);
          return data.role
        }
        catch (err) {
          if (err.status === 403) return error("Invalid Email !")
          error(err.message)
        }
      }
    }
  )

  return (
    { isLoading, data }
  )
}

export default useRole