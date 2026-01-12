import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import loginButton from "../assets/login.png";

const Login = ({ onClose }) => {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! You can now Login")
      setMode("login");

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("", err);
    } finally {
      setLoading(false);
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert(`Welcome back, ${data.user.name}!`);
      onClose(); // Close modal

      localStorage.setItem("token", data.token);

      // Optionally, save user info in localStorage/session
      localStorage.setItem("user", JSON.stringify(data.user));

      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-[Qanect] flex items-center text-2xl mb-2">ChessPU<img src={loginButton} alt="Login" className="w-5 h-5 mt-1" />Z</h1>
            <button onClick={onClose} className="text-gray-500 text-xl">
              ×
            </button>
          </div>

          {mode === "login" ? (
            <>
              {/* This is Login page */}
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />

                <button onClick={handleLogin} disabled={loading} className="w-full bg-gray-900 text-white rounded py-2">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* This is Sign Up page */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />

                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full bg-gray-900 text-white rounded py-2">
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2 border rounded py-2 hover:bg-gray-50">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600 mt-4">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span className="text-blue-600 cursor-pointer" onClick={() => setMode("signup")}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;