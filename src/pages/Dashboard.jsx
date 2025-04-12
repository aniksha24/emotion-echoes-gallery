
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import MemoryCard from "../components/memories/MemoryCard";
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
      <Navbar />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
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
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <Input
                placeholder="Search memories..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Link to="/new-memory" className="flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
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
                  <Link to="/new-memory" className="flex items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
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
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <p className="text-sm text-gray-600">
            © 2023 EmotionEchoes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
