"use client";

import useThemeStore from "@/store/themeStore";

const BackgroundWrapper = ({ children }) => {
  const { isDarkMode } = useThemeStore();
  return (
    <>
      <div
        className={`absolute inset-0 -z-10 h-full w-full ${
          isDarkMode ? "bg-black" : "bg-white"
        } ${isDarkMode ? 'bg-[radial-gradient(#1f1e25_1px,transparent_1px)]' : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]'} [background-size:16px_16px]`}
      ></div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen inset-0 -z-50 duration-700 ease-out transition-opacity ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `${
            isDarkMode
              ? "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)"
              : "white"
          }`,
        }}
      />
      {children}
    </>
  );
};

export default BackgroundWrapper;
