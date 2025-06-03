import { useAuthStore } from "@/zustand/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isAuth, isValidated } = useAuthStore();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else if (!isValidated) {
      navigate("/navigate");
    }
  }, [isAuth, isValidated, navigate]);

  if (!isAuth || !isValidated) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
