"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Poppins, Rubik } from "next/font/google";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import useThemeStore from "@/store/themeStore";

const pop = Poppins({
  variable: "--font-Poppins",
  weight: "600",
  subsets: ["latin"],
});

const rub = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const { login } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const checkProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getData/checkdata`,
        { cache: "no-cache", credentials: "include" }
      );

      const data = await res.json();

      if (data?.user) {
        const { handle, picture, description, links } = data.user;
        if (handle) setHandle(handle);
        if (picture) setPicture(picture);
        if (description) setDescription(description);
        if (Array.isArray(links) && links.length > 0) {
          const formattedLinks = links.map((item) => ({
            link: item.url || "",
            linktext: item.title || "",
          }));
          setLinks(formattedLinks);
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      toast.error("Error loading profile.");
    }
  };

  useEffect(() => {
    if (login) checkProfile();
  }, [login]);

  const handleChange = (index, link, linktext) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => {
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const deleteLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const submitLinks = async () => {
    const formattedLinks = links
      .filter((item) => item.link.trim() && item.linktext.trim())
      .map((item) => ({
        url: item.link,
        title: item.linktext,
      }));

    if (!handle || !picture || formattedLinks.length === 0) {
      toast.error("Handle, picture, and at least one link are required.");
      return;
    }

    const raw = JSON.stringify({
      links: formattedLinks,
      handle,
      picture,
      description,
    });

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/updateProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      credentials: "include",
    });

    toast.success("Profile updated successfully!");
  };

  return (
    <>
      {/* Background */}
      <div className={`absolute -z-10 top-0 left-0 h-full w-screen ${isDarkMode ? 'bg-gradient-to-br from-[#0f0f11] via-[#18181b] to-[#1e1e20]' : 'bg-gradient-to-br from-[#ababab] via-[#bebebe] to-[#3e3e41]'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:25px_25px]" />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-screen px-4 py-10">
        <div className={`rounded-2xl backdrop-blur-xl bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] p-6 md:p-10 w-full max-w-3xl ${isDarkMode ? "text-white" : 'text-black'} flex flex-col gap-8 shadow-xl shadow-black/40 transition-all duration-300 hover:shadow-gray-500/10`}>
          <h1
            className={`text-3xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-blue-900 to-slate-500 bg-clip-text text-transparent ${pop.className}`}
          >
            Create Your LinkTree
          </h1>

          <ToastContainer />

          {/* Step 1 */}
          <section className="flex flex-col gap-3">
            <h2 className={`${rub.className} text-lg font-medium text-center`}>
              Step 1: Claim Your Handle
            </h2>
            <input
              onChange={(e) => setHandle(e.target.value)}
              value={handle || ""}
              className="bg-white/90 text-zinc-950 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              type="text"
              placeholder="Choose handle"
            />
          </section>

          {/* Step 2 */}
          <section className="flex flex-col gap-3">
            <h2 className={`${rub.className} text-lg font-medium text-center`}>
              Step 2: Add Your Links
            </h2>

            {links.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-3 items-center bg-white/5 rounded-xl p-3 transition-all hover:bg-white/10"
              >
                <input
                  value={item.link}
                  onChange={(e) =>
                    handleChange(index, e.target.value, item.linktext)
                  }
                  className="bg-white text-zinc-900 px-4 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-green-400 outline-none"
                  type="text"
                  placeholder="Enter link URL"
                />
                <input
                  value={item.linktext}
                  onChange={(e) =>
                    handleChange(index, item.link, e.target.value)
                  }
                  className="bg-white text-zinc-900 px-4 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-green-400 outline-none"
                  type="text"
                  placeholder="Enter link title"
                />
                <button
                  type="button"
                  onClick={() => deleteLink(index)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <Image
                    src="/Delete.svg"
                    alt="Delete icon"
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addLink}
              className="text-white bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm px-5 py-3 mt-2 font-medium shadow-md hover:shadow-gray-600/50 transition-all"
            >
              + Add Link
            </button>
          </section>

          {/* Step 3 */}
          <section className="flex flex-col gap-3">
            <h2 className={`${rub.className} text-lg font-medium text-center`}>
              Step 3: Add a Profile Picture & Description
            </h2>
            <input
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="bg-white/90 h-10 px-4 py-2 rounded-lg text-zinc-950 w-full focus:ring-2 focus:ring-green-400 outline-none transition-all"
              placeholder="Enter URL to your image"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/90 px-4 py-2 rounded-lg text-zinc-950 w-full focus:ring-2 focus:ring-green-400 outline-none transition-all"
              placeholder="Add description here"
              rows={3}
            />
            <button
              disabled={
                !picture || !handle || links[0].linktext.trim() === ""
              }
              onClick={submitLinks}
              className="disabled:bg-gray-500 disabled:cursor-not-allowed py-3 px-3 text-sm bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg font-medium mt-2 hover:from-green-600 hover:to-green-500 transition-all duration-300 cursor-pointer"
            >
              Generate
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratePageContent />
    </Suspense>
  );
}
