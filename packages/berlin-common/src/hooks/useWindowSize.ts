import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth);
    });
  }, []);

  return { size: size };
}

export default useWindowSize;
