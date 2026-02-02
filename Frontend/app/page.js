"use client";

import { Rubik } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import useThemeStore from "@/store/themeStore";
import Image from "next/image";

const rub = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    if (isAuthenticated) {
      router.push(`/generate?handle=${text}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="py-10 px-4 sm:px-8 lg:px-16 xl:px-20 bg-transparent">
      <section className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Top Text Section */}
        <div className="flex flex-col items-center gap-6 text-center w-full md:w-3/4">
          <h1
            className={`NunitoEB font-extrabold ${
              isDarkMode ? "text-white" : "text-slate-700"
            } text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight`}
          >
            <span className="text-blue-800">A Unified </span>
            link to all,
            <br className="hidden md:block" />
            essential resource.
          </h1>

          <p
            className={`${
              isDarkMode ? "text-white" : "text-gray-800"
            } text-base sm:text-lg md:text-xl ${
              rub.className
            } tracking-[.36px]`}
          >
            Easily consolidate your digital presence with a single, organized
            link. Share your content, tools, and profiles from platforms like
            GitHub, LinkedIn, YouTube, and more — all in one accessible
            location.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="w-full sm:w-72 bg-gray-300 px-4 py-3 rounded-lg font-medium 
                      focus:outline-4 focus:outline-gray-600"
              placeholder="Enter your handle..."
            />
            <button
              onClick={createTree}
              type="button"
              className={`text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
                        focus:ring-4 focus:outline-none focus:ring-gray-100 
                        dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
                        dark:text-white dark:hover:bg-gray-700 font-semibold rounded-lg 
                        text-sm px-6 py-3 inline-flex items-center ${rub.className}`}
            >
              Claim Your LinkStack
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`${
            isDarkMode ? "bg-gray-200" : "bg-gray-400"
          } w-full h-[1px]`}
        />

        {/* Bottom Content Section */}
        <div
          className="flex flex-col-reverse lg:flex-row w-full gap-10 lg:gap-16 
                      items-center justify-center text-center lg:text-left"
        >
          {/* Left Image */}
          <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[450px] flex justify-center">
            <Image
              src="/Developer.png"
              alt="illustration"
              width={450}
              height={450}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center lg:items-start">
            <h2
              className={`${rub.className} ${
                isDarkMode ? "text-white" : "text-slate-700"
              } font-semibold 
                          text-2xl sm:text-3xl md:text-4xl leading-snug`}
            >
              Ready to begin? Click to generate a single, unified link for all
              your content.
            </h2>
            <button
              onClick={createTree}
              type="button"
              className={`text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
                        focus:ring-4 focus:outline-none focus:ring-gray-100 
                        dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
                        dark:text-white dark:hover:bg-gray-700 font-semibold rounded-lg 
                        text-sm px-6 py-3 inline-flex items-center ${rub.className}`}
            >
              Click to start
              <svg
                className="w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
