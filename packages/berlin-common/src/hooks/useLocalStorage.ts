import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useLocalStorage = () => {
  const [isTokenValid, setIsTokenValid] = useState<any>(null);
  const { token } = useSelector((state: any) => state.login);

  useEffect(() => {
    // -------------------- Validate Token -------------------------
    const validateToken = async () => {
      try {
        if (!token) {
          setIsTokenValid(false);
        } else {
          setIsTokenValid(true);
        }
      } catch (err: any) {
        console.log("Error....");
      }
    };

    validateToken();
  }, [token]);

  return {
    isTokenValid,
    token,
  };
};

export default useLocalStorage;
