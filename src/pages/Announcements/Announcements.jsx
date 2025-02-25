import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import { Info } from "lucide-react";
import { Riple } from "react-loading-indicators";
import { Tooltip } from "react-tooltip";

function Announcements() {

  const { loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const { isLoading, isError, data: announcements = [] } = useQuery({
    queryKey: ['anouncements'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/anouncements`)

      return data
    }
  })

  if (isError || announcements?.error) return <p className='flex gap-2 text-error absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'><Info /> Fetching All coupons Failed !</p>

  if (loading || isLoading) return <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
    <Riple color="#fab600" size="medium" text="" textColor="" />
  </div>

  return (
    <>
      <h3 className="mt-16 mb-6 text-2xl font-bold px-4 text-center">Apartment Announcements</h3>

      {
        announcements.length > 0 ? <div className="grid min-[840px]:grid-cols-2 gap-4 p-4">

          {
            announcements?.map(
              (anouncement, idx) => <div className="flex flex-col bg-base-100 p-4 rounded-sm gap-2 shadow-sm" key={anouncement._id}>
                <h3 className="text-lg font-semibold">{announcements.length - idx }. {anouncement?.title}</h3>
                <p className="font-medium text-base-content/80 flex-1">{anouncement?.description}</p>
                <p className="text-sm">
                  <span className="max-[350px]:hidden">Announced</span> At: <span data-tooltip-id="date-tooltip" data-tooltip-html={new Date(anouncement?.announcedAt || Date.now()).toDateString() + ", " + new Date(anouncement?.announcedAt || Date.now()).toLocaleTimeString()}>{new Date(anouncement?.announcedAt || Date.now()).toLocaleDateString()}</span>
                </p>
              </div>
            )
          }

        </div> : <p className='text-xl text-center text-warning'>No apartment announcements found!</p>
      }

      <Tooltip className="!bg-warning" id="date-tooltip" />
    </>
  )
}

export default Announcements