import { MapPin, LocateFixed, Signpost, Mail, Phone, Linkedin, HandPlatter, Clapperboard, Landmark } from 'lucide-react';
import { NavLink } from "react-router"
import { Map, Marker } from "pigeon-maps"
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Contact() {

    const { ref, inView } = useInView();

    const [view, setView] = useState(["streets", "winter-v2", "toner", "positron"])

    const mapTilerProvider = (x, y, z, dpr) => {
        return `https://api.maptiler.com/maps/${view[0]}/${z}/${x}/${y}${dpr >= 2 ? "@2x" : ""}.png?key=${import.meta.env.VITE_MAPTILER_API_KEY}`;
    };

    const changeView = () => {
        setView(prev => {
            const [first, ...rest] = prev
            return [...rest, first]
        })
    }


    return (
        <>
            <div className={`flex flex-wrap gap-2 md:justify-center w-full max-sm:mt-5 ${inView ? "animate__animated animate__fadeInUp" : "invisible"} `} ref={ref}>

                <div className='p-4'>

                    <h3 className='mb-3 font-bold'>OUR ADDRESS</h3>
                    <div className='space-y-1'>
                        <div className='flex gap-2 items-center'>
                            <MapPin />
                            <p className='text-base-200 font-medium'>Skyline, 123 Luxury Avenue</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <LocateFixed />
                            <p className='text-base-200 font-medium'>Chaktai, Chittagong</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Signpost />
                            <p className='text-base-200 font-medium'>4000</p>
                        </div>
                    </div>

                </div>

                <div className='p-4'>

                    <h3 className='mb-3 font-bold'>OUR CONTACT</h3>
                    <div className='space-y-1'>
                        <div className='flex gap-2 items-center'>
                            <Mail />
                            <NavLink className='text-base-200 font-medium' to="mailto:ResiFlow@gmail.com">ResiFlow@gmail.com</NavLink>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Phone />
                            <NavLink className='text-base-200 font-medium' to="tel:+8801234567890">01234567890</NavLink>
                        </div>
                        <div className='flex gap-2 items-center -mt-[2px]'>
                            <Linkedin size={25} />
                            <NavLink className="translate-y-[2px] text-base-200 font-medium" to="https://www.linkedin.com/in/mohammad-yasin-2443872b5/" target='_blank'>Click To Message</NavLink>
                        </div>
                    </div>

                </div>

                <div className='p-4'>

                    <h3 className='mb-3 font-bold'>NEARBY LANDMARKS</h3>
                    <div className='space-y-1'>
                        <div className='flex gap-2 items-center'>
                            <HandPlatter />
                            <p className='text-base-200 font-medium'>The Gourmet Spot</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Clapperboard />
                            <p className='text-base-200 font-medium'>CineLux Multiplex</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Landmark />
                            <p className='text-base-200 font-medium'>Prestige Credit Bank</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className='h-[60vmin] w-[95%] max-w-[800px] my-4 rounded-lg overflow-hidden'>
                <Map
                    defaultCenter={[22.28380333572612, 91.78982464756086]}
                    defaultZoom={11}
                    provider={mapTilerProvider}
                >
                    <Marker
                        width={50}
                        color={"#fab600"}
                        anchor={[22.28380333572612, 91.78982464756086]}
                        onClick={changeView}
                    />
                </Map>
            </div>
        </>
    )
}

export default Contact