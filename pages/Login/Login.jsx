import { useState } from "react";
import { AiOutlineAim } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuCloud, LuShieldCheck, LuShieldPlus, LuUser } from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();
  //   const useNavigate = useNavigate();
  //   console.log(location)

  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  // const checkPassword = (event) => {
  //   const password = event.target.value;

  //   if (password.length < 6) {
  //     alert("Password must be at least 6 characters long.");
  //   } else if (!/[A-Z]/.test(password)) {
  //     alert("Password must contain at least one uppercase letter.");
  //   } else if (!/[a-z]/.test(password)) {
  //     alert("Password must contain at least one lowercase letter.");
  //   } else {
  //     alert("");
  //   }
  // };

  // login
  const onSubmit = (data) => {
    console.log(data);
    // e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;

    // if (errorMsg) {
    //   toast.error("Please fix the password errors before login.");
    //   return;
    // }

    // loginUser(email, password)
    //   .then((res) => {
    //     const user = res.user;
    //     setUser(user);
    //     toast.success("Successfully Loged in.");
    //     navigate(`${location.state ? location.state : "/"}`);

    //     e.target.reset();
    //   })
    //   .catch((error) => {
    //     toast.error(error.message);
    //     console.log(error.message);
    //   });
  };

  return (
    <div className="min-h-screen w-full flex items-center px-4 py-20 bg-base-200">
      <title>Login | AssetVerse</title>
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-fit mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          {/* form */}
          <div className="flex-1 max-w-md">
            {/* Header */}
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
              <p className="text-sm leading-relaxed text-base-content/30 max-w-2/3 mx-auto">
                Sign in to your account to manage assets and streamline your
                workflow
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
              <div className="space-y-2">
                {/* Email Field */}
                <div>
                  <label className="block label mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="example@email.com"
                    className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block label mb-1">Password</label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "password field is empty",
                        minLength: {
                          value: 8,
                          message:
                            "password must contains minimum 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                          message:
                            "password must contain at least one lowercase and one uppercase letter",
                        },
                      })}
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="At least 8 characters"
                      autoComplete="current-password"
                      className="input text-sm w-full py-2 px-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />

                    {/* Eye toggle button */}
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                    >
                      {showPass ? (
                        <HiOutlineEyeSlash className="h-5 w-5" />
                      ) : (
                        <HiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {/* error msg */}
                {/* error msg */}
                {errors.email ? (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                ) : (
                  errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password">
                  <button
                    type="button"
                    className="text-primary hover:text-primary/50 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </Link>
              </div>

              {/* Submit login Button */}
              <button
                type="submit"
                className="w-full p-2 mt-2 bg-primary hover:bg-primary/50 text-white font-md rounded-lg transition-colors"
              >
                Log in
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center mt-5">
                <div className="border-t border-gray-200 flex-1"></div>
                <span className="px-4 text-base-content/50 text-sm">Or</span>
                <div className="border-t border-gray-200 flex-1"></div>
              </div>

              <div className="text-center mt-3">
                <p className="text-base-content/50 mb-4">
                  Don't you have an account?
                </p>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-3">
                  <Link to="/employee-registration">
                    <div className="flex-1 border border-base-content/20 hover:border-primary hover:bg-primary/10 transition-all rounded-lg px-2 py-4 w-full flex flex-col items-center justify-center">
                      <LuUser size={20} className="text-warning" />
                      <p className="text-md font-semibold mt-2">Employee</p>
                      <p className="text-sm text-base-content/50">
                        Create your account to request company assets
                      </p>
                    </div>
                  </Link>
                  <Link to="/hr-registration">
                    <div className="flex-1 border border-base-content/20 hover:border-primary hover:bg-primary/10 transition-all rounded-lg px-2 py-4 w-full flex flex-col items-center justify-center">
                      <LuShieldCheck size={20} className="text-info" />
                      <p className="text-md font-semibold mt-2">HR Manager</p>
                      <p className="text-sm text-base-content/50">
                        Register your company and start managing assets
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* ++++++++++++++++++++++++++++++++++++++++++++++++ */}
          <div className="divider divider-horizontal mt-20"></div>
          {/* ++++++++++++++++++++++++++++++++++++++++++ */}
          <div className="flex-1 w-md">
            <div>
              <div className="flex items-center gap-3 mt-1">
                <div className="w-8">
                  <Logo></Logo>
                </div>
                <h1 className="text-2xl font-semibold">AssetVerse</h1>
              </div>
              <p className="text-sm mt-2 text-base-content/50">
                Your Complete Asset Management Solution
              </p>
            </div>

            {/* =========== */}
            <p className="mt-5 mb-3">Trusted by Leading Organizations</p>
            <div className="flex gap-2 justify-between text-center">
              <div className="w-full flex flex-col justify-center items-center border border-base-content/20 rounded-md px-2 py-2">
                <LuShieldPlus size={20} className="text-green-600" />
                <p className="font-semibold">SSL Secured</p>
                <p className="text-sm text-base-content/50">
                  256-bit encryption
                </p>
              </div>
              {/* ====== */}
              <div className="w-full flex flex-col justify-center items-center border border-base-content/20 rounded-md px-2 py-2">
                <FiLock size={20} className="text-green-600" />

                <p className="font-semibold">GDPR Compliant</p>
                <p className="text-sm text-base-content/50">Data protection</p>
              </div>
              {/* ====== */}
              <div className="w-full flex flex-col justify-center items-center border border-base-content/20 rounded-md px-2 py-2">
                <PiCertificate size={20} className="text-green-600" />
                <p className="font-semibold ">ISO Certified</p>
                <p className="text-sm text-base-content/50">Quality assured</p>
              </div>
              {/* ====== */}
            </div>
            <div>
              <p className="text-sm my-3 text-base-content/50">
                AssetVerse revolutionizes how organizations track, manage, and
                optimize their assets. From laptops to office equipment, manage
                everything in one powerful platform.
              </p>
              <div className="flex gap-3 mt-5">
                <div className="mt-1 text-pink-500">
                  <AiOutlineAim />
                </div>
                <div>
                  <p className="font-semibold">Intuitive Asset Tracking</p>
                  <p className="text-sm text-base-content/50">
                    Track and manage all your company assets from a single,
                    easy-to-use dashboard
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="mt-1 text-green-600">
                  <IoAnalyticsOutline />
                </div>
                <div>
                  <p className="font-semibold">Real-time Analytics</p>
                  <p className="text-sm text-base-content/50">
                    Get instant insights into asset utilization, costs, and
                    lifecycle management
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="mt-1 text-blue-500">
                  <LuCloud />
                </div>
                <div>
                  <p className="font-semibold">Cloud-Based Platform</p>
                  <p className="text-sm text-base-content/50">
                    Access your asset management system anytime, anywhere, from
                    any device
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ================ */}
        </div>
        {/* ============== footer ================= */}
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
};

export default Login;
