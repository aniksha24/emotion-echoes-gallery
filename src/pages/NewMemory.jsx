
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const NewMemory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emotion, setEmotion] = useState("");
  const [emotions, setEmotions] = useState([]);
  
  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddEmotion = () => {
    if (emotion.trim()) {
      setEmotions([...emotions, { id: Date.now().toString(), name: emotion.trim() }]);
      setEmotion("");
    }
  };

  const handleRemoveEmotion = (emotionId) => {
    setEmotions(emotions.filter(e => e.id !== emotionId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || emotions.length === 0) {
      alert("Please fill in all fields and add at least one emotion");
      return;
    }
    
    // Create new memory object
    const newMemory = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      emotions,
      createdAt: new Date().toISOString()
    };
    
    // Get existing memories from localStorage
    const existingMemories = JSON.parse(localStorage.getItem("memories") || "[]");
    
    // Add new memory to the beginning of the array
    const updatedMemories = [newMemory, ...existingMemories];
    
    // Save to localStorage
    localStorage.setItem("memories", JSON.stringify(updatedMemories));
    
    alert("Memory created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">EmotionEchoes</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Memory</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Memory Title
                </label>
                <Input 
                  id="title"
                  placeholder="Enter a title for your memory"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Memory Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your memory..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Emotions
                </label>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter an emotion"
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddEmotion}>
                    Add
                  </Button>
                </div>
                
                {emotions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {emotions.map((e) => (
                      <div 
                        key={e.id} 
                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1"
                      >
                        <span>{e.name}</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveEmotion(e.id)} 
                          className="text-blue-600 hover:text-blue-800"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {emotions.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Add at least one emotion to tag your memory
                  </p>
                )}
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button type="submit">
                  Save Memory
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewMemory;
