"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const ReceiverRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // For password-based authentication
  const [location, setLocation] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Function to get user's current location (latitude and longitude)
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await reverseGeocode(latitude, longitude);
            setLoadingLocation(false);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLoadingLocation(false);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
  }, []);

  // Function to reverse geocode coordinates into city name
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=YOUR_ACCESS_TOKEN`
      );
      if (response.ok) {
        const data = await response.json();
        const placeName = data.features[0]?.place_name || "Location not found";
        setLocation(placeName);
      } else {
        console.error("Failed to fetch location data.");
      }
    } catch (error) {
      console.error("Error with reverse geocoding:", error);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/otp/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, action: "register" }),
      });

      if (response.ok) {
        const data = await response.json();
        setOtpSent(true);
        setOtpId(data.otpId);
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      setError(error.message);
      console.error("OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      // Verify OTP
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otpId, otp }),
      });

      if (!response.ok) throw new Error("OTP verification failed");

      // Register the user
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Store user's data in the database
      const { data, error: upsertError } = await supabase
        .from("receivers")
        .upsert({ email, name, phone, location });

      if (upsertError) throw upsertError;

      alert("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 form-container">
      <form className="mx-auto w-50">
        <h1 className="h3 mb-3 fw-normal text-center">Receiver Register</h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Name"
            value={name}
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
            type="text"
            className="form-control"
            id="floatingPhone"
            placeholder="Phone number"
            value={phone}
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
            value={loadingLocation ? "Detecting..." : location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="floatingLocation">Location (City)</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {!otpSent ? (
          <button
            className="btn btn-outline-light w-100 py-2 mb-3"
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
              <label htmlFor="floatingOtp">Enter OTP</label>
            </div>
            <button
              className="btn btn-outline-light w-100 py-2 mb-3"
              type="button"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <p className="mt-5 mb-3 text-body-secondary text-center">
          © 2024 | <a href="/login/receiver">Already a member? Login now</a>
        </p>
      </form>
    </div>
  );
};

export default ReceiverRegister;
