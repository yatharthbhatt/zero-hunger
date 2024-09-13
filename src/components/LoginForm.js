"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase"; // Adjust import path as needed

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle sending OTP
  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/sendOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, action: "login" }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsOtpSent(true);
      console.log("OTP sent successfully");
    } else {
      console.error("Failed to send OTP");
    }

    setLoading(false);
  };

  // Handle OTP verification
  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, userType }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setIsOtpVerified(true);
      console.log("OTP verified successfully");
    } else {
      console.error("Failed to verify OTP");
    }

    setLoading(false);
  };

  // Function to fetch current location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form>
      <img
        className="mb-4"
        src="/docs/5.3/assets/brand/bootstrap-logo.svg"
        alt="Logo"
        width="72"
        height="57"
      />
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingName"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="floatingName">Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="tel"
          className="form-control"
          id="floatingPhone"
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="floatingPhone">Phone number</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingLocation"
          placeholder="Location"
          value={location}
          readOnly
        />
        <label htmlFor="floatingLocation">Location</label>
      </div>

      {!isOtpSent ? (
        <button
          className="btn btn-primary w-100 py-2"
          type="button"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingOtp"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label htmlFor="floatingOtp">OTP</label>
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}

      <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
    </form>
  );
};

export default LoginForm;
