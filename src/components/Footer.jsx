
function Footer() {
  return (
    <section className="section bg-primary text-neutral-content py-10 !min-h-0 z-50">
      <footer className="footer max-w-[1600px] mx-auto grid grid-cols-3 max-sm:w-11/12 w-10/12">
        <nav>
          <h6 className="footer-title text-base-100">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-base-100">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-base-100">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </section>
  )
}

export default Footer