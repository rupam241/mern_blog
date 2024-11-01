import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // For success feedback
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submitting
    setSuccessMessage(null); // Reset success message

    if (!formData.email || !formData.password) {
      return setError("Please fill out all fields");
    }

    try {
      setLoading(true); // Start loading
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check if the sign-in was successful
      if (!res.ok) {
        return setError(data.message || "Signin failed. Please try again.");
      }

      setSuccessMessage(`${formData.email} logged in successfully!`);
      navigate('/'); // Redirect to home on success

    } catch (error) {
      console.error("Signin error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="" className="font-bold dark:text-white text-4xl">
            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rupam's
            </span>
            <span className="text-gray-500 text-md">Blog</span>
          </Link>
          <p className="text-sm mt-5">
            If you want to read the article, please sign in with your email and password or with Google.
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 text-xl" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                id="email"
                className="w-full p-2 pr-10 rounded border border-gray-500 outline-0"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full p-2 pr-10 rounded border border-gray-500 outline-0"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-lg flex items-center justify-center">
              {loading ? (
                <>
                  <Spinner className="w-5 h-5" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In" // Changed from "Sign Up" to "Sign In"
              )}
            </button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span> Dont Have an account? </span>
            <Link to="/signin" className="text-blue-500">Sign up</Link>
          </div>

          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-5" color="success">
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
