import "./Home.css"
import Banner from "./Banner"
import About from "./About"
import Contact from "./Contact"

function Home() {
  return (
    <>
      <section className="py-10 z-10 [min-height:100dvh] flex items-center justify-center bg-gradient-to-r from-accent to-primary">
        <Banner />
      </section>
      <section className="about-section py-10 z-50 [min-height:100dvh] flex items-center justify-center text-base-100 bg-gradient-to-r from-primary to-secondary">
        <About />
      </section>
      <section className="py-10 z-50 [min-height:100dvh]">
        <Contact />
      </section>
    </>
  )
}

export default Home