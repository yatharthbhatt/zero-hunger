"use client";
import React from "react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation after a small delay to ensure smoothness
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  return (
    <div
      className={`px-4 py-5 my-1 text-center center-hero ${
        isVisible ? "fade-in" : ""
      }`}
    >
      <h1 className="display-5 fw-bold Home-page-join">
        Do a Noble Deed Today !!{" "}
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="join-us-text mb-4">
          Join us today to Become a Food Donor !!{" "}
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-outline-light btn-lg px-4">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
