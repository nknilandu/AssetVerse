import { useContext, useState } from "react";
import { AiOutlineAim } from "react-icons/ai";
import { FiBox } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { LuLightbulb, LuShieldCheck, LuUsers } from "react-icons/lu";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import { MdInfoOutline, MdOutlineLock } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const EmployeeRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [stateLoading, setStateLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  // create user
  const onSubmit = (data) => {
    setStateLoading(true);
    createUser(data.email, data.password).then((res) => {
      // success
      const user = res.user;
      setUser(user);

      //upload logo and get link
      const profileImg = data.file[0];
      const formData = new FormData();
      formData.append("image", profileImg);

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
            photoURL: photoLink,
            email: data.email,
            password: data.password,
            dateOfBirth: data.date,
            role: "employee",
            createdAt: new Date(),
          };

          //update user profile
          updateUserProfile({
            displayName: data.name,
            photoURL: photoLink,
          })
            .then(() => {
              toast.success("profile updated");

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
                    // failed
                    toast.error("Failed to save user");
                  }
                  setStateLoading(false);
                });
            })
            .catch((e) => {
              // error
              console.log(e.message);
              toast.error(e.message);

              setStateLoading(false);
            });
        })
        .catch(() => {
          toast.error("could not update profile");
        });
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center px-4 py-20 bg-base-200">
      <title>Employee Registration | AssetVerse</title>
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          {/* form */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Create Employee Account
              </h1>
              <p className="text-sm leading-relaxed text-base-content/30 max-w-10/12 mx-auto">
                Join AssetVerse to request and manage company assets across all
                your affiliated organizations
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
                  <label className="block label mb-1">Date of Birth</label>
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
                {/* logo Field */}
                <div>
                  <label className="block label mb-1">Profile Logo</label>
                  <input
                    {...register("file", {
                      required: "profile logo is required",
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
                ) : errors.email ? (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                ) : errors.password ? (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                ) : null}

                {/* ======================== */}
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
                <Link to={stateLoading || "/hr-registration"}>
                  <div className=" border border-base-content/20 hover:border-primary hover:bg-primary/10 transition-all rounded-lg px-2 py-2 w-full flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                      <LuShieldCheck size={20} className="text-info mr-2" />
                      <p className="text-md font-semibold">
                        Are you an HR Manager?
                      </p>
                    </div>
                    <p className="text-sm text-base-content/50">
                      Register your company and start managing assets
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
          <div className="flex-1">
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
                <MdInfoOutline size={20} className="text-info" />
                <p className="font-semibold">How It Works</p>
              </div>
              <p className="text-sm mt-2 text-base-content/50">
                After registration, you'll be able to request assets from your
                company's inventory. All requests require HR approval to ensure
                proper asset tracking and accountability.
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <RiBuilding2Line />
                  </div>
                  <div>
                    <p className="font-semibold">Automatic Company Linking</p>
                    <p className="text-sm text-base-content/50">
                      Your email domain will automatically link you to your
                      company
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <LuUsers />
                  </div>
                  <div>
                    <p className="font-semibold">Multi-Company Support</p>
                    <p className="text-sm text-base-content/50">
                      Work with multiple organizations? No problem - manage all
                      affiliations in one account
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-orange-400">
                    <FiBox />
                  </div>
                  <div>
                    <p className="font-semibold">Asset Request Process</p>
                    <p className="text-sm text-base-content/50">
                      Submit asset requests that require HR approval before
                      assignment
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div className="mt-1 text-orange-400">
                    <AiOutlineAim />
                  </div>
                  <div>
                    <p className="font-semibold">Track Your Assets</p>
                    <p className="text-sm text-base-content/50">
                      View all assigned assets across your affiliated companies
                      in one place
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-base-content/10 my-5"></div>
              <div className="flex gap-2">
                <MdOutlineLock size={28} className="text-success " />
                <p className="text-sm text-base-content/50">
                  Your information is secure and will only be used for asset
                  management purposes within your affiliated companies.
                </p>
              </div>

              <div className="flex gap-2 mt-3">
                <LuLightbulb size={60} className="text-success -mt-4" />
                <p className="text-sm text-base-content/50">
                  Once you create your account, you'll be able to browse your
                  company's asset inventory and submit requests for the
                  equipment you need. Your HR team will review and approve
                  requests to ensure proper asset allocation.
                </p>
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

export default EmployeeRegister;
