"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Function to fetch user session
  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  useEffect(() => {
    fetchUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    // Cleanup on component unmount
    return () => {
      // If the authListener provides a cleanup function
      if (authListener && typeof authListener === "function") {
        authListener();
      }
    };
  }, []);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const loginType = form.loginType.value;

    // Redirect based on the selected login type
    if (loginType === "donor") {
      router.push("/login/donor");
    } else if (loginType === "receiver") {
      router.push("/login/receiver");
    }

    setShowLogin(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/"); // Redirect to home or login page
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <img
            src="/assets/_347853df-4f67-48eb-8852-c96e432dd868.jpeg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Zero-Hunger
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link href="/" className="nav-link" aria-current="page">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/help" className="nav-link">
              Help
            </Link>
            {!user ? (
              <div className="nav-item">
                <button className="btn btn-light" onClick={handleLoginClick}>
                  Login
                </button>
                {showLogin && (
                  <div
                    className="dropdown-menu show"
                    style={{ display: "block" }}
                  >
                    <form onSubmit={handleSubmit} className="px-4 py-3">
                      <div className="form-group mb-3">
                        <label htmlFor="loginType" className="form-label">
                          Login as
                        </label>
                        <select
                          id="loginType"
                          name="loginType"
                          className="form-select"
                          required
                        >
                          <option value="donor">Donor</option>
                          <option value="receiver">Receiver</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-dark">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/account" className="nav-link">
                  My Account
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
