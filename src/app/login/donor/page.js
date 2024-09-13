"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // For password-based authentication
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log("SignIn Data:", data);
      console.log("SignIn Error:", signInError);

      if (signInError) throw signInError;

      if (data) {
        const { data: userData, error: fetchError } = await supabase
          .from("donors")
          .select("*")
          .eq("email", email)
          .single();

        console.log("User Data:", userData);
        console.log("Fetch Error:", fetchError);

        if (fetchError) throw fetchError;

        if (userData) {
          alert("Login successful");
          // e.g., router.push('/home');
        } else {
          alert("User not found. Please register.");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 form-container">
      <form className="mx-auto w-50">
        <h1 className="h3 mb-3 fw-normal text-center">Donor Login</h1>

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
          © 2024 | <a href="/register/donor">Not a member? Register now</a>
        </p>
      </form>
    </div>
  );
};

export default DonorLogin;
