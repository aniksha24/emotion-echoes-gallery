
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { emotionOptions, Emotion } from "@/lib/types";
import EmotionTag from "./EmotionTag";
import { toast } from "sonner";

const MemoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleEmotion = (emotion: Emotion) => {
    const isSelected = selectedEmotions.some(e => e.id === emotion.id);
    
    if (isSelected) {
      setSelectedEmotions(selectedEmotions.filter(e => e.id !== emotion.id));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedEmotions.length === 0) {
      toast.error("Please select at least one emotion");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would save to your backend
      const newMemory = {
        id: Date.now().toString(),
        title,
        description,
        date,
        imageUrl: imageUrl || undefined,
        emotions: selectedEmotions,
        userId: JSON.parse(localStorage.getItem("user") || "{}").id || "1"
      };
      
      // Save to local storage for demo purposes
      const existingMemories = JSON.parse(localStorage.getItem("memories") || "[]");
      localStorage.setItem("memories", JSON.stringify([newMemory, ...existingMemories]));
      
      toast.success("Memory saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving memory:", error);
      toast.error("Failed to save memory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create a New Memory</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your memory a title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this memory..."
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emotions">How did you feel?</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {emotionOptions.map((emotion) => (
                <EmotionTag
                  key={emotion.id}
                  emotion={emotion}
                  onClick={() => toggleEmotion(emotion)}
                  selected={selectedEmotions.some(e => e.id === emotion.id)}
                  selectable
                />
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Memory"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default MemoryForm;
