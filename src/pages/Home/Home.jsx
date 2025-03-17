import "./Home.css"
import Banner from "./Banner"
import About from "./About"
import Contact from "./Contact"
import Coupons from "./Coupons"
import { useEffect } from "react"
import AgreementSystemInfo from "./AgreementSystemInfo"
import Policies from "./Policies"
import NewsLetterForm from "./NewsLetterForm"

function Home() {

  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y mandatory";
    return () => {
      document.documentElement.style.scrollSnapType = "none";
    };
  }, []);

  return (
    <>
      <title>ResiFlow | Home</title>
      <section className="section py-10 z-10 [min-height:100dvh] flex items-center justify-center bg-gradient-to-r from-accent to-primary">
        <Banner />
      </section>
      <section className="section about-section py-10 z-50 [min-height:100dvh] flex items-center justify-center text-base-100 bg-gradient-to-r from-primary to-secondary">
        <About />
      </section>
      <section className="section py-10 z-50 [min-height:100dvh] flex flex-col items-center justify-center text-base-100 bg-gradient-to-r from-primary to-accent">
        <Policies />
      </section>
      <section className="section py-10 z-50 [min-height:100dvh] flex flex-col items-center justify-center text-base-100 bg-gradient-to-r from-secondary to-primary">
        <Contact />
      </section>
      <section className="section py-10 z-50 [min-height:100dvh] flex flex-col items-center justify-center bg-gradient-to-r from-accent to-primary">
        <AgreementSystemInfo />
      </section>
      <section className="section py-10 z-50 [min-height:100dvh] flex flex-col items-center justify-center bg-gradient-to-r from-secondary to-primary">
        <Coupons />
      </section>
      <section className="section py-10 z-50 [min-height:100dvh] flex flex-col items-center justify-center bg-gradient-to-r from-primary to-accent">
        <NewsLetterForm />
      </section>
    </>
  )
}

export default Home