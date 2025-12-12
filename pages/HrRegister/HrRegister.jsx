import { useContext, useState } from "react";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiBox, FiFileText, FiUserPlus } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { IoFlashOutline } from "react-icons/io5";
import { LuShieldCheck, LuUser } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import { MdTrendingUp } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { BiBarChartAlt2 } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const HrRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const [stateLoading, setStateLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  // login
  const onSubmit = (data) => {
    // console.log(data);

    // loading
    setStateLoading(true);

    createUser(data.email, data.password)
      .then((res) => {
        // success
        const user = res.user;
        setUser(user);

        //upload logo and get link
        const profileImg = data.file[0];
        const formData = new FormData();
        formData.append("image", profileImg);

        // upload image to imgbb
        fetch(
          `https://api.imgbb.com/1/upload?expiration=600&key=${
            import.meta.env.VITE_IMG_CLIENT_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((result) => {
            // upload success
            const photoLink = result.data.display_url;

            const userInfo = {
              name: data.name,
              companyName: data.companyName,
              companyLogo: photoLink,
              email: data.email,
              password: data.password,
              dateOfBirth: data.date,
              role: "hr",
              packageLimit: 5,
              currentEmployees: 0,
              subscription: "basic",
              createdAt: new Date(),
            };
            

            //update user profile
            updateUserProfile({
              displayName: data.name,
              photoURL: photoLink,
            })
              .then(() => {
                toast.success("profile update");
              })
              .catch(() => {
                toast.error("could not update profile");
              });

            // add data at database
            fetch("http://localhost:2031/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  // success
                  toast.success("Successfully Account Created");
                  navigate(`${location.state ? location.state : "/"}`);
                } else {
                  // failed to add data at database
                  toast.error("Failed to save user");
                }
                setStateLoading(false);
              });
          })

          .catch((e) => {
            // failed to upload image
            toast.error("Failed to upload company logo");
            console.log(e.message);
            setStateLoading(false);
          });
      })

      .catch((e) => {
        // firebase error
        console.log(e.message);
        toast.error(e.message);
        setStateLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center px-4 bg-base-200 py-20">
      <title>HR Registration | AssetVerse</title>
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-fit mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          {/* form */}
          <div className="flex-1 max-w-md">
            {/* Header */}
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Create Your HR Manager Account
              </h1>
              <p className="text-sm leading-relaxed text-base-content/30 max-w-10/12 mx-auto">
                Set up your company profile and start managing assets
                efficiently with AssetVerse
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
              <div className="space-y-2">
                {/* name Field */}
                <div>
                  <label className="block label mb-1">Your Name</label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must contain only letters",
                      },
                    })}
                    type="text"
                    name="name"
                    placeholder="your full name"
                    className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                {/* dob Field */}
                <div>
                  <label className="block label mb-1">Your Date of Birth</label>
                  <input
                    {...register("date", {
                      required: "Date of birth is required",
                      validate: (value) => {
                        if (!value) {
                          return "Date of birth is required";
                        }
                        return true;
                      },
                    })}
                    type="date"
                    name="date"
                    className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                {/* company name Field */}
                <div>
                  <label className="block label mb-1">Company Name</label>
                  <input
                    {...register("companyName", {
                      required: "Company name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must contain only letters",
                      },
                    })}
                    type="text"
                    name="companyName"
                    placeholder="your company name"
                    className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                {/* company logo Field */}
                <div>
                  <label className="block label mb-1">Company Logo</label>
                  <input
                    {...register("file", {
                      required: "company logo is required",
                    })}
                    type="file"
                    className="file-input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
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
                    type="email"
                    name="email"
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
                {errors.name ? (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                ) : errors.date ? (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                ) : errors.companyName ? (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                ) : errors.file ? (
                  <p className="text-sm text-red-500">{errors.file.message}</p>
                ) : errors.email ? (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                ) : errors.password ? (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                ) : null}
                {/* ========= */}
              </div>

              {/* Submit login Button */}
              <button
                type="submit"
                disabled={stateLoading}
                className={`w-full p-2 mt-5 bg-primary hover:bg-primary/50 text-white font-md rounded-lg transition-colors ${
                  stateLoading ? "bg-primary/50" : "bg-primary"
                }`}
              >
                {stateLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center mt-5">
                <div className="border-t border-gray-200 flex-1"></div>
                <span className="px-4 text-base-content/50 text-sm">Or</span>
                <div className="border-t border-gray-200 flex-1"></div>
              </div>

              <div className="text-center mt-6">
                <Link to={stateLoading || "/employee-registration"}>
                  <div className=" border border-base-content/20 hover:border-primary hover:bg-primary/10 transition-all rounded-lg px-2 py-2 w-full flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                      <LuUser size={20} className="text-warning mr-2" />
                      <p className="text-md font-semibold">
                        Are you an Employee?
                      </p>
                    </div>
                    <p className="text-sm text-base-content/50">
                      Create your account to request company assets
                    </p>
                  </div>
                </Link>

                <p className="text-base-content/50 my-4">
                  Already have an account?{" "}
                  <Link to={stateLoading || "/login"}>
                    <span className="text-secondary font-semibold">Login</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          {/* ++++++++++++++++++++++++++++++++++++++++++++++++ */}
          <div className="divider divider-vertical md:divider-horizontal  md:mt-20"></div>
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

            {/* ==== */}
            <div className="my-6">
              <div className="flex items-center gap-2">
                <AiOutlineQuestionCircle size={20} className="text-info" />
                <p className="font-semibold">Why Choose AssetVerse?</p>
              </div>
              <p className="text-sm mt-2 text-base-content/50">
                As an HR Manager on AssetVerse, you'll have comprehensive
                control over your organization's asset management ecosystem.
                Here's what you can do:
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <FiUserPlus />
                  </div>
                  <div>
                    <p className="font-semibold">Employee Management</p>
                    <p className="text-sm text-base-content/50">
                      Register and onboard employees, manage user roles, and
                      maintain employee profiles with comprehensive access
                      controls.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <FiBox />
                  </div>
                  <div>
                    <p className="font-semibold">Asset Tracking & Allocation</p>
                    <p className="text-sm text-base-content/50">
                      Add, update, and assign company assets to employees. Track
                      asset lifecycle from procurement to disposal.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <FiFileText />
                  </div>
                  <div>
                    <p className="font-semibold">Compliance & Reporting</p>
                    <p className="text-sm text-base-content/50">
                      Generate detailed asset reports, maintain audit trails,
                      and ensure regulatory compliance with automatic
                      documentation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div className="mt-1 text-orange-400">
                    <RiSettings2Line />
                  </div>
                  <div>
                    <p className="font-semibold">System Configuration</p>
                    <p className="text-sm text-base-content/50">
                      Configure company settings, define asset categories, set
                      approval workflows, and customize organizational policies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div className="mt-1 text-orange-400">
                    <BiBarChartAlt2 />
                  </div>
                  <div>
                    <p className="font-semibold">Analytics & Insights</p>
                    <p className="text-sm text-base-content/50">
                      Monitor asset utilization, track depreciation, analyze
                      spending patterns, and make data-driven decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-base-content/10 my-5"></div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <IoFlashOutline size={20} className="text-success mt-3" />
                  <div>
                    <p className="text-sm font-semibold">Quick Setup</p>
                    <p className="text-sm text-base-content/50">
                      Get started in minutes with our intuitive onboarding
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LuShieldCheck size={18} className="text-success mt-3" />
                  <div>
                    <p className="text-sm font-semibold">Secure & Compliant</p>
                    <p className="text-sm text-base-content/50">
                      Enterprise-grade security with data encryption
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <MdTrendingUp size={20} className="text-success mt-3" />
                  <div>
                    <p className="text-sm font-semibold">Scalable Solution</p>
                    <p className="text-sm text-base-content/50">
                      Grow your team without worrying about limitations
                    </p>
                  </div>
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

export default HrRegister;
