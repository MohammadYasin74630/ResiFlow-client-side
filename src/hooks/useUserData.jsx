import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"
import { toast } from "sonner"

function useUserData() {

  const { user, loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const error = (msg) => toast.error(msg)
  const email = user?.email || user?.providerData[0]?.email
  const success = !loading && email


  const { isLoading, data, refetch } = useQuery(
    {
      enabled: !!success,
      queryKey: [user?.email, "userRole"],
      queryFn: async () => {
        try {
          const { data } = await axiosSecure.get(`/user/${email}`);
          if (data.error) error(data.error)
          return data
        }
        catch (err) {
          if (err.status === 403) return error("Invalid Email !")
          error(err.message)
        }
      }
    }
  )

  return { isLoading, data, refetch }
}

export default useUserData