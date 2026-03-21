const Footer = () => {
  return (
    <footer className="site-footer bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-glb-accent">Grand Line Bazaar</h5>
            <p className="small text-secondary mb-0">
              Your trusted source for authenticated Devil Fruits — from Paramecia
              oddities to Logia legends. Sail with confidence.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-uppercase text-muted small">Contact</h6>
            <p className="small mb-1">
              <i className="fas fa-envelope me-2 text-glb-accent" aria-hidden />
              <a href="mailto:crew@grandlinebazaar.test" className="text-white text-decoration-none">
                crew@grandlinebazaar.test
              </a>
            </p>
            <p className="small mb-0">
              <i className="fas fa-phone me-2 text-glb-accent" aria-hidden />
              <span>+63 900 000 0000</span>
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-uppercase text-muted small">Follow the crew</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white" aria-label="Facebook">
                <i className="fab fa-facebook fa-lg" />
              </a>
              <a href="https://twitter.com" className="text-white" aria-label="Twitter">
                <i className="fab fa-twitter fa-lg" />
              </a>
              <a href="https://instagram.com" className="text-white" aria-label="Instagram">
                <i className="fab fa-instagram fa-lg" />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-secondary my-3" />
        <p className="text-center small text-secondary mb-0">
          &copy; {new Date().getFullYear()} Grand Line Bazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
