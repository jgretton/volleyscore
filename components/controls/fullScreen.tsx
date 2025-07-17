"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="group focus-visible:ring-opacity-50 relative hidden items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 transition-all hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden sm:inline-flex dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900"
    >
      {isFullscreen ? (
        <div className="">
          <ArrowsPointingInIcon className="h-5 w-5" aria-hidden="true" />
          {/* <span className="sr-only">Exit Full Screen</span> */}
          <span className="pointer-events-none invisible absolute top-full right-full w-fit rounded-lg bg-gray-50 px-4 py-2 text-center opacity-0 transition-all duration-1000 group-hover:visible group-hover:opacity-100 dark:bg-slate-700">
            Exit fullscreen
          </span>
        </div>
      ) : (
        <div className=" ">
          <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden="true" />
          {/* <span className="sr-only">Enter Full Screen</span> */}
          <span className="pointer-events-none invisible absolute top-full right-full w-full min-w-fit rounded-lg bg-gray-50 px-4 py-2 text-center opacity-0 transition-all duration-1000 group-hover:visible group-hover:opacity-100 dark:bg-slate-700">
            Enter fullscreen
          </span>
        </div>
      )}
    </button>
  );
};

export default FullScreen;
