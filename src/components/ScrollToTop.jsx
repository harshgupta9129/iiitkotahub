import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly move the window to the top-left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the URL path changes

  return null;
}