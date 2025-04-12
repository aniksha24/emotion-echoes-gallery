
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import MemoryForm from "@/components/memories/MemoryForm";

const NewMemory = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4 md:px-6">
        <MemoryForm />
      </main>
    </div>
  );
};

export default NewMemory;
