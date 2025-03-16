import checkInOut from "../../assets/policies/checkInOut.webp"
import security from "../../assets/policies/security.webp"
import parking from "../../assets/policies/parking.webp"
import pet from "../../assets/policies/pet.webp"
import quite from "../../assets/policies/Quiet Hours.webp"
import emergency from "../../assets/policies/emergencyDrill.webp"
import comminuty from "../../assets/policies/communityMeetings.webp"
import visitor from "../../assets/policies/VisitorRegistration.webp"
import renovation from "../../assets/policies/Renovations.webp"
import { useInView } from "react-intersection-observer"

function Policies() {

    const { ref, inView } = useInView();

  return (
    <>
    <h3 className="text-base-100 text-xl font-bold my-10">POLICIES</h3>
    
    <div className="grid min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2" ref={ref}>
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={checkInOut} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={security} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={parking} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={pet} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={quite} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={emergency} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={comminuty} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={visitor} />
        <img className={`max-w-48 outline-8 rounded-full hover:scale-200 hover:z-10 transition-[scale] lg:hidden ${inView ? "animate__animated animate__zoomIn " : "opacity-0"}`} src={renovation} />
    </div>
    </>
  )
}

export default Policies