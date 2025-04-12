
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <AuthLayout 
      title="Begin Your Journey" 
      subtitle="Create an account to start capturing your emotional memories."
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
