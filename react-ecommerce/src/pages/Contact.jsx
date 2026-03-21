const Contact = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control"></textarea>
            </div>

            <button type="button" className="btn btn-primary btn-glb-cta">
              <i className="fas fa-paper-plane me-2" aria-hidden />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
