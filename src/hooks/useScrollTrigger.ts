import { useState, useEffect } from "react";
export const useScrollTrigger = (Y: number = 400): boolean => {
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!isTriggered && window.pageYOffset > Y) {
        setIsTriggered(true);
      } else if (isTriggered && window.pageYOffset <= Y) {
        setIsTriggered(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTriggered, Y]);

  return isTriggered;
};
