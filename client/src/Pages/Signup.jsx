import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // validate field on change
    const fieldError = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const validateField = (name, value) => {
    if (name === "name") {
      if (!value || value.trim() === "") return "Full name is required";
      return null;
    }
    if (name === "email") {
      if (!value) return "Email is required";
      const re = /^\S+@\S+\.\S+$/;
      if (!re.test(value)) return "Enter a valid email";
      return null;
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.name = validateField("name", formData.name || "");
    newErrors.email = validateField("email", formData.email || "");
    newErrors.password = validateField("password", formData.password || "");
    // remove null entries
    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data?.message || "Signup failed");
      } else {
        setError(null);
        setSuccess(true);
        // clear form
        setFormData({});
      }
    } catch (err) {
      setLoading(false);
      setError("Signup failed");
      console.error("Error during signup:", err);
    }
  };
 
  return success ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border text-center">
        <h2 className="text-2xl font-bold text-green-600">User Account has been created successfully</h2>
        <p className="mt-4 text-gray-700">You can now <Link to="/signin" className="text-indigo-600 font-medium">Sign In</Link>.</p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-transparent rounded-2xl shadow-xl p-8 border ">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mt-2">Sign up to get started</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email Address"
            id="email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            <span className="text-sm font-medium">Google</span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
            <FaFacebookF className="text-blue-600" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/signin" className="text-indigo-600 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
