
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";

const MemoryForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emotion, setEmotion] = useState("");
  const [emotions, setEmotions] = useState([]);
  
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
      createdAt: new Date().toISOString(),
      date: new Date().toISOString()
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
  );
};

export default MemoryForm;
