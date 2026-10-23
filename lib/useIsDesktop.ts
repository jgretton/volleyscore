"use client";
import { useEffect, useState } from "react";

// xl in Tailwind. Above it the panels unfold: identity moves into a header
// row and the timeouts into a bottom row, so there is no rail left to draw.
const DESKTOP_QUERY = "(min-width: 80rem)";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
};
