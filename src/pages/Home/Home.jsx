import "./Home.css"
import Banner from "./Banner"

function Home() {
  return (
    <>
      <section className="py-10 z-10 [height:100dvh] flex items-center justify-center bg-accent">
        <Banner />
      </section>
    </>
  )
}

export default Home