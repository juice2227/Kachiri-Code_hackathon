import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome", { replace: true });
    }, 3000); // 3 seconds display

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#121212]">
      <div className="animate-spin-slow mb-6">
        <img src={logo} alt="App Logo" className="w-32 h-32 object-contain" />
      </div>
      <p className="mt-4 text-white/80">Loading your health companion...</p>
    </div>
  );
};

export default SplashScreen;
