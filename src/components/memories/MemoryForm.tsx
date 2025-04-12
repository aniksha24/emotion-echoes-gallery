
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { emotionOptions, Emotion } from "@/lib/types";
import EmotionTag from "./EmotionTag";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Download, Save } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MemoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const navigate = useNavigate();
  const pdfPreviewRef = useRef<HTMLDivElement>(null);

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

  const exportToPdf = async () => {
    if (!pdfPreviewRef.current) return;
    
    setIsPdfLoading(true);
    try {
      const canvas = await html2canvas(pdfPreviewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${title || 'memory'}.pdf`);
      
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsPdfLoading(false);
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
          
          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Memory"}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" type="button" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xl">
                <SheetHeader>
                  <SheetTitle>Memory Preview</SheetTitle>
                  <SheetDescription>
                    Review your memory before exporting it as a PDF.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 mb-4 overflow-y-auto max-h-[70vh]">
                  <div ref={pdfPreviewRef} className="bg-white p-8 rounded-lg shadow">
                    <div className="mb-6 border-b pb-4">
                      <h2 className="text-2xl font-bold mb-1">{title || "Untitled Memory"}</h2>
                      <p className="text-muted-foreground">{new Date(date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    
                    {imageUrl && (
                      <div className="mb-6">
                        <img 
                          src={imageUrl} 
                          alt={title} 
                          className="w-full max-h-60 object-contain rounded-md"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="whitespace-pre-line">{description || "No description provided."}</p>
                    </div>
                    
                    {selectedEmotions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Emotions</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedEmotions.map((emotion) => (
                            <EmotionTag key={emotion.id} emotion={emotion} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={exportToPdf} disabled={isPdfLoading} className="w-full">
                    {isPdfLoading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default MemoryForm;
