"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="hidden relative group sm:inline-flex transition-all  items-center gap-3 rounded-lg px-4 py-2 dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-white bg-gray-100 hover:bg-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
    >
      {isFullscreen ? (
        <div className="">
          <ArrowsPointingInIcon className="h-5 w-5" aria-hidden="true" />
          {/* <span className="sr-only">Exit Full Screen</span> */}
          <span className="group-hover:visible group-hover:opacity-100 opacity-0 transition-all duration-1000 invisible absolute pointer-events-none right-full dark:bg-slate-700 bg-gray-50 top-full px-4 py-2 text-center rounded-lg w-fit">
            Exit fullscreen
          </span>
        </div>
      ) : (
        <div className=" ">
          <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden="true" />
          {/* <span className="sr-only">Enter Full Screen</span> */}
          <span className="group-hover:visible group-hover:opacity-100 opacity-0 transition-all duration-1000 invisible absolute pointer-events-none right-full dark:bg-slate-700 bg-gray-50 top-full px-4 py-2 text-center rounded-lg min-w-fit w-full">
            Enter fullscreen
          </span>
        </div>
      )}
    </button>
  );
};

export default FullScreen;
