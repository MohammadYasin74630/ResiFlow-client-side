import security from "../../assets/policeman.webp"
import elevator from "../../assets/elevator.webp"
import wifi from "../../assets/wifi.webp"
import pet from "../../assets/pet.webp"
import locker from "../../assets/locker.webp"
import fireproof from "../../assets/fireproof.webp"
import { Building2, CarFront, UsersRound, CalendarSync } from 'lucide-react';
import { useEffect, useRef, useState } from "react"
import CountUp from 'react-countup';
import Typewriter from "react-ts-typewriter";
import { Tooltip } from 'react-tooltip'
import { Fade } from "react-awesome-reveal";

function About() {

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);


    return (
        <>
            <div className="grid lg:grid-cols-2 max-w-[1200px] mx-auto ">

                <div className="details space-y-4 p-4">
                    <Fade cascade damping={0.2}>
                        <h3 className="text-xl font-extrabold">ABOUT THE BUILDING</h3>
                        <p className={`max-w-[70ch] font-medium leading-relaxed`}>Welcome to ResiFlow, a luxurious Eco-Friendly residential <span
                            data-tooltip-id="about-tooltip"
                            data-tooltip-content="12 apartments per floor"
                            className="border-b border-dotted"
                        >building</span> designed to offer an unparalleled living <span
                            data-tooltip-id="about-tooltip"
                            data-tooltip-content="30,000 sq. ft. of shared amenities"
                            className="border-b border-dotted"
                        >experience</span>. Carefully located close to <span
                            data-tooltip-id="about-tooltip"
                            data-tooltip-content="2-Minute Walk to the nearest park"
                            className="border-b border-dotted"
                        >parks</span>, top <span
                            data-tooltip-id="about-tooltip"
                            data-tooltip-content="10-Minute Drive to top-rated schools"
                            className="border-b border-dotted"
                        >schools</span>, and <span
                            data-tooltip-id="about-tooltip"
                            data-tooltip-content="15-Minute Walk to the nearest shopping mall"
                            className="border-b border-dotted"
                        >shopping</span> centers.</p>
                    </Fade>

                    <div ref={ref} >
                        <strong className="mb-4 block">OUR SERVICES:</strong>

                        <div className="grid min-[500px]:grid-cols-2 gap-2 text-base-300">
                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={security} alt="" />
                                {isVisible ? <Typewriter text="24/7 Security Staff" cursor={false} /> : null}

                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={wifi} alt="" />
                                {isVisible ? <Typewriter text="Free Wi-Fi Spots" cursor={false} /> : null}

                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={elevator} alt="" />
                                {isVisible ? <Typewriter text="High-speed elevators" cursor={false} /> : null}

                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={locker} alt="" />
                                {isVisible ? <Typewriter text="Safe Lockers storage" cursor={false} /> : null}

                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={fireproof} alt="" />
                                {isVisible ? <Typewriter text="Modern Safety systems" cursor={false} /> : null}
                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <img className="w-10" src={pet} alt="" />
                                {isVisible ? <Typewriter text="Pet-friendly Areas" cursor={false} /> : null}
                            </div>
                        </div>

                    </div>

                </div>

                <div className="space-y-5 p-4">
                    <h3 className="text-xl font-extrabold">OTHER STATS</h3>

                    <div className="text-accent-content grid min-[500px]:grid-cols-2 gap-4">
                        <div className="bg-base-200 p-2 rounded-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <Building2 className="inline" />
                                <span className="font-medium">Renters</span>
                            </div>

                            <span className="text-5xl font-extrabold">
                                <CountUp end={84} enableScrollSpy={true} />+
                            </span>
                            <p className="font-medium line-clamp-1 mt-1">Premium Apartments</p>
                        </div>

                        <div className="bg-base-200 p-2 rounded-sm">

                            <div className="flex items-center gap-2 mb-1">
                                <CarFront className="inline" />
                                <span className="font-medium">Cars</span>
                            </div>

                            <span className="text-5xl font-extrabold">
                                <CountUp end={100} enableScrollSpy={true} />+
                            </span>
                            <p className="font-medium line-clamp-1 mt-1">Vehicles Parking Capacity</p>
                        </div>

                        <div className="bg-base-200 p-2 rounded-sm">

                            <div className="flex items-center gap-2 mb-1">
                                <UsersRound className="inline" />
                                <span className="font-medium">Guest</span>
                            </div>

                            <span className="text-5xl font-extrabold">
                                <CountUp end={100} enableScrollSpy={true} />+
                            </span>
                            <p className="font-medium line-clamp-1 mt-1">Spaces in Community Hall</p>
                        </div>

                        <div className="bg-base-200 p-2 rounded-sm">

                            <div className="flex items-center gap-2 mb-1">
                                <CalendarSync className="inline" />
                                <span className="font-medium">Backup</span>
                            </div>

                            <span className="text-5xl font-extrabold">
                                <CountUp end={100} enableScrollSpy={true} />%
                            </span>
                            <p className="font-medium line-clamp-1 mt-1">Electricity, Gas & Water Supply</p>
                        </div>
                    </div>
                </div>

            </div>

            <Tooltip className="!bg-warning" id="about-tooltip" />
        </>
    )
}

export default About