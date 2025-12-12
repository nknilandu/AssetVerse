import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [stateLoading, setStateLoading] = useState(false);

  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setStateLoading(true);
    forgotPassword(data.email)
      .then(() => {
        toast.success("Successfully email sent!");
        setStateLoading(false);

        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setStateLoading(false);
      });
  };

  return (
    <div className="h-screen w-full flex items-center px-4 py-10 bg-base-200">
      <title>Forgot Password | AssetVerse</title>
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold mb-2">Forgot Your Password?</h1>
          <p className=" text-sm leading-relaxed text-base-content/30">
            Don't worry. We will send a password reset link to your email.
            Please check your inbox or spam box to find mail.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-2">
            {/* Email Field */}
            <div>
              <label className="block text-sm label mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input text-sm w-full py-2 mb-1 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />

              {/* error message */}
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={stateLoading}
            className={`w-full p-2 mt-2 bg-primary hover:bg-primary/50 text-white font-md rounded-lg transition-colors ${
              stateLoading ? "bg-primary/50" : "bg-primary"
            }`}
          >
            {stateLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send a mail"
            )}
          </button>

          <div className="text-center mt-3">
            <p className="text-base-content/50">
              Login into another account?{" "}
              <Link
                to={stateLoading || "/login"}
                className="hover:text-primary text-secondary font-semibold transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 space-y-2 mt-10">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href="" className="hover:underline">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="" className="hover:underline">
              Terms of Service
            </a>
            <span>•</span>
            <a href="" className="hover:underline">
              Help Center
            </a>
          </div>

          <p>AssetVerse | © 2025 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
