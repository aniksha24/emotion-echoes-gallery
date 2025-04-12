
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Dashboard = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load memories from localStorage for demo purposes
    const savedMemories = JSON.parse(localStorage.getItem("memories") || "[]");
    setMemories(savedMemories);
  }, [navigate]);
  
  const filteredMemories = memories.filter(memory => 
    memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memory.emotions.some(emotion => 
      emotion.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">EmotionEchoes</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Button>
              <Link to="/new-memory" className="text-white">New Memory</Link>
            </Button>
            <button 
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("user");
                alert("Logged out successfully");
                navigate("/");
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Memories</h1>
            <p className="text-gray-600 mt-1">
              Explore your emotional journey through your saved memories.
            </p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative w-full md:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Input
                placeholder="Search memories..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Link to="/new-memory" className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
                New Memory
              </Link>
            </Button>
          </div>
        </div>
        
        {filteredMemories.length === 0 ? (
          <div className="text-center py-20">
            {memories.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold mb-2">Start Creating Memories</h3>
                <p className="text-gray-600 mb-6">
                  You haven't added any memories yet. Create your first one!
                </p>
                <Button>
                  <Link to="/new-memory" className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    Create First Memory
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">No Results Found</h3>
                <p className="text-gray-600">
                  No memories match your search criteria.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((memory) => (
              <div key={memory.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{memory.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{new Date(memory.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2 line-clamp-3">{memory.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {memory.emotions.map((emotion) => (
                      <span 
                        key={emotion.id} 
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                      >
                        {emotion.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-sm text-gray-600">
            © 2023 EmotionEchoes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
