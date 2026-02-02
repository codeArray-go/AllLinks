"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import UseLoader from "@/store/loaderStore";
import { ToastContainer, toast } from "react-toastify";
import useThemeStore from "@/store/themeStore";

const Page = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [time, setTime] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isDarkMode } = useThemeStore();

  const { showLoader, hideLoader } = UseLoader();

  // 5 minute countdown for otp
  useEffect(() => {
    if (!isVerifying || time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVerifying, time]);

  // Formating time in mm:ss format
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Request OTP.
  const handleEmailVerification = async () => {
    showLoader();
    try {
      if (email) {
        setIsSubmiting(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/send-otp`,
          { email }
        );
        setIsVerifying(true);
        return alert("OTP sended succesfully to filled E-mail.");
      } else {
        alert("Fill E-mail first then request for OTP. 😏");
      }
    } catch (err) {
      alert("Failed to send otp");
      hideLoader();
    } finally {
      setTime(300);
      setIsSubmiting(false);
      hideLoader();
    }
  };

  // Verify OTP
  const handleOtpVerification = async () => {
    try {
      const cleanOtp = otp.trim();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/verify-otp`,
        { email, otp: cleanOtp }
      );
      alert(res.data.message);
      setOtp("");
      setTime(0);
      setIsDisabled(false);
      setSubmited(true);
      setIsVerifying(false);
    } catch (err) {
      hideLoader();
      return alert(err.response?.data?.message || "Verification failed");
    }
  };

  // Login and signIn process from here
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  // Handle Signup of user
  const handleSignup = async (e) => {
    e.preventDefault();
    showLoader();

    const formData = new FormData(e.target);

    // Crating payload
    const payload = {};
    for (let [key, value] of formData.entries()) {
      payload[key] = value.replace(/\s+/g, "");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Account created successfylly");
        setIsLogin(true);
      } else {
        alert(data.message || "SignUp Failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      hideLoader();
    }
  };

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/generate");
    }
  }, [isAuthenticated, router]);

  // Handle Login of User
  const handleLogin = async (e) => {
    e.preventDefault();
    showLoader();

    const formData = new FormData(e.target);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        useAuthStore.getState().login(data.user.username);
        showLoader();
        toast.success("User Loged In Successfully");
      } else {
        hideLoader();
        toast.error(data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login krne me error aa rha hai bhai: ", err);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "text-white" : "text-gray-700"
      } mx-auto px-4 sm:px-6 lg:px-8 h-screen`}
    >
      <ToastContainer />
      {isLogin ? (
        <>
          {/* Heading */}
          <h1
            className={`text-center font-extrabold tracking-tight
      text-2xl sm:text-3xl md:text-4xl
      py-6 sm:py-8
      transition-colors duration-300
      ${isDarkMode ? "text-white" : "text-zinc-900"}
      NunitoEB
    `}
          >
            Login to generate your own Link Tree
          </h1>

          {/* Card */}
          <div
            className={`
      w-full max-w-md mx-auto rounded-2xl
      p-6 sm:p-8
      backdrop-blur-xl
      transition-all duration-300
      ${
        isDarkMode
          ? "bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          : "bg-white border border-zinc-200 shadow-xl"
      }
    `}
          >
            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-semibold
            ${isDarkMode ? "text-white" : "text-zinc-800"}
          `}
                >
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="email123@gmail.com"
                  required
                  className={`
            w-full rounded-lg px-4 py-2.5 text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${
              isDarkMode
                ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
            }
          `}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-semibold
            ${isDarkMode ? "text-white" : "text-zinc-800"}
          `}
                >
                  Password
                </label>

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="•••••••••"
                  required
                  className={`
            w-full rounded-lg px-4 py-2.5 pr-11 text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${
              isDarkMode
                ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
            }
          `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`
            absolute right-3 top-[38px]
            transition-colors
            ${
              isDarkMode
                ? "text-gray-600 hover:text-black"
                : "text-gray-500 hover:text-gray-800"
            }
          `}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
          w-full rounded-lg py-2.5 text-sm font-semibold
          text-white
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          focus:outline-none focus:ring-4 focus:ring-blue-300
          transition-all duration-300
        "
              >
                Login
              </button>

              {/* Switch */}
              <p
                onClick={toggleLogin}
                className={`
          text-center text-sm cursor-pointer
          transition-colors duration-200
          ${
            isDarkMode
              ? "text-blue-300 hover:text-blue-200"
              : "text-blue-700 hover:text-blue-600"
          }
        `}
              >
                Don&apos;t have an account?{" "}
                <span className="font-semibold">Create one</span>
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Heading */}
          <h1
            className={`
      text-center font-extrabold tracking-tight
      text-2xl sm:text-3xl md:text-4xl
      pb-6 sm:pb-8 NunitoEB
      transition-colors duration-300
      ${isDarkMode ? "text-white" : "text-zinc-900"}
    `}
          >
            Create a Fresh Account
          </h1>

          {/* Card */}
          <div
            className={`
      w-full max-w-2xl mx-auto
      rounded-2xl p-6 sm:p-8
      backdrop-blur-xl transition-all duration-300
      ${
        isDarkMode
          ? "bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          : "bg-white border border-zinc-200 shadow-xl"
      }
    `}
          >
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Username & Age */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className={`block mb-2 text-sm font-semibold ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    placeholder="your username"
                    required
                    className={`
              w-full rounded-lg px-4 py-2.5 text-sm
              transition-all duration-200 focus:outline-none focus:ring-2
              ${
                isDarkMode
                  ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                  : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
              }
            `}
                  />
                </div>

                <div>
                  <label
                    className={`block mb-2 text-sm font-semibold ${
                      isDarkMode ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    placeholder="your age"
                    required
                    className={`
              w-full rounded-lg px-4 py-2.5 text-sm
              transition-all duration-200 focus:outline-none focus:ring-2
              ${
                isDarkMode
                  ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                  : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
              }
            `}
                  />
                </div>
              </div>

              {/* Email Verification */}
              <div>
                <label
                  className={`block mb-2 text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}
                >
                  Email Address
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={email}
                    readOnly={submited || isVerifying}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="your@email.com"
                    required
                    className={`
              flex-1 rounded-lg px-4 py-2.5 text-sm
              transition-all duration-200 focus:outline-none focus:ring-2
              disabled:opacity-60
              ${
                isDarkMode
                  ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                  : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
              }
            `}
                  />

                  {submited ? (
                    <span className="flex items-center font-semibold text-green-500">
                      Verified ✅
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleEmailVerification}
                      className={`
                px-5 py-2.5 rounded-lg text-sm font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                transition-all duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
                    >
                      {isSubmiting ? "Sending OTP…" : "Verify Email"}
                    </button>
                  )}
                </div>

                {/* OTP */}
                {isVerifying && (
                  <>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className={`
                  flex-1 rounded-lg px-4 py-2.5 text-sm
                  transition-all duration-200 focus:outline-none focus:ring-2
                  ${
                    isDarkMode
                      ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                      : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
                  }
                `}
                      />
                      <button
                        type="button"
                        onClick={handleOtpVerification}
                        className="
                  px-5 py-2.5 rounded-lg text-sm font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-700 hover:to-indigo-700
                  transition-all duration-300
                "
                      >
                        Submit OTP
                      </button>
                    </div>

                    <p className="mt-3 text-sm text-center">
                      Time left:&nbsp;
                      <span
                        className={
                          time <= 30 ? "text-red-500" : "text-green-500"
                        }
                      >
                        {formatTime(time)}
                      </span>
                      &nbsp;|&nbsp;
                      <span
                        onClick={handleEmailVerification}
                        className="cursor-pointer text-blue-600 hover:underline"
                      >
                        Resend OTP
                      </span>
                    </p>
                  </>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  className={`block mb-2 text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  required
                  className={`
            w-full rounded-lg px-4 py-2.5 pr-11 text-sm
            transition-all duration-200 focus:outline-none focus:ring-2
            ${
              isDarkMode
                ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
            }
          `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  className={`block mb-2 text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  required
                  className={`
            w-full rounded-lg px-4 py-2.5 pr-11 text-sm
            transition-all duration-200 focus:outline-none focus:ring-2
            ${
              isDarkMode
                ? "bg-white text-black placeholder-gray-500 focus:ring-white/60"
                : "bg-zinc-50 text-black placeholder-gray-400 focus:ring-blue-600"
            }
          `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isDisabled}
                className="
          w-full rounded-lg py-2.5 text-sm font-semibold text-white
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          transition-all duration-300
          disabled:opacity-60 disabled:cursor-not-allowed
        "
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center pt-6 text-sm">
            Already have an account?{" "}
            <span
              onClick={toggleLogin}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Page;
