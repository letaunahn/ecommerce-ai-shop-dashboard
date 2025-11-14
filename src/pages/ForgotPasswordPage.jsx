import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    setEmail("");
  };

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  if (isAuthenticated && user.role === "Admin") {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
        <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@example.com"
                className="w-full px-4 py-3 border border-gray-500 rounded-md"
              />
            </div>
            <div className="px-2 flex justify-end items-center text-sm text-gray-500">
              <Link to={"/login"} type="button" className="text-blue-600 hover:underline">Remember Password</Link>
            </div>

            <div className="px-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition" disabled={loading}>
                {
                    loading ? (
                        <>
                            <div className="w-5 h-5 border-2 bg-white border-t-transparent rounded-full animate-spin"/>
                            <span>Requesting for email...</span>
                        </>
                    ) : ("Send Reset Link")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
