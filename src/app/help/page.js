"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send the data to an API
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-for-help">
      <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold">Contact us</h1>
        <div className="col-lg-5 mx-auto">
          <p className="lead mb-4">
            Feel free to contact us with any questions or concerns. You can use
            the form on our website or email us directly on
            contact@zero-hunger.com. We appreciate your interest and look
            forward to hearing from you.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="contact">
        <div className="contact-top">
          <div className="name">
            <div className="title">Name</div>
            <div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="phone">
            <div className="title">Phone Number</div>
            <div>
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="email">
            <div className="title">Email</div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="contact-bottom">
          <div className="title">Your Message</div>
          <textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
