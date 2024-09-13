"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

const ReceiverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // For password-based authentication
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      // Check if the user exists in the database
      const { data: userData, error: fetchError } = await supabase
        .from("receivers")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError) throw fetchError;

      if (userData) {
        alert("Login successful");
      } else {
        alert("User not found. Please register.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 form-container">
      <form className="mx-auto w-50">
        <h1 className="h3 mb-3 fw-normal text-center">Receiver Login</h1>

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
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button
          className="btn btn-outline-light w-100 py-2 mb-3"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 mb-3 text-body-secondary text-center">
          © 2024 | <a href="/register/receiver">Not a member? Register now</a>
        </p>
      </form>
    </div>
  );
};

export default ReceiverLogin;
