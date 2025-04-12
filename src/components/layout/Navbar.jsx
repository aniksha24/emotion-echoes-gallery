
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userData = localStorage.getItem("user");
    
    if (isAuthenticated && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">EmotionEchoes</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/new-memory" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                New Memory
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <span>{user.name || user.email}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border hidden group-hover:block z-10">
                  <div className="py-1">
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign in</Link>
              <Button>
                <Link to="/signup" className="text-white">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
