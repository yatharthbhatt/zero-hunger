import React from "react";

const Footer = () => {
  return (
    <div className="section9">
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-lg-start">
            <h5 className="display-4 fw-bold lh-1 mb-3">Zero Hunger</h5>
            <p className="col-lg-10 fs-6">
              Join Today and help us make a difference in the world.
              <br />
              <br />
              <br />
              <span>Reach out to us</span>
              <br />
              contact@zero-hunger.com
              <br />
              <br />© 2024. All rights reserved.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 rounded-3 footer-form"
              id="newsletterForm"
            >
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="John Doe"
                  required
                />
                <label htmlFor="floatingName">Name</label>
              </div>
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-dark" type="submit">
                Sign up for Our Newsletter
              </button>
              <hr className="my-4" />
              <small className="terms">
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
