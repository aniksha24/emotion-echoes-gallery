
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { BookHeart, Heart, Bookmark, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary/20 to-accent/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <BookHeart className="h-12 w-12 text-primary" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Capture Your Emotional Journey
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
                Store your memories with their emotions. Create a beautiful scrapbook of your life's most meaningful moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild size="lg">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">
                Remember Every Emotion
              </h2>
              <p className="text-muted-foreground mt-2">
                Your emotional scrapbook helps you track your feelings and memories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Emotional Tagging</h3>
                <p className="text-muted-foreground">
                  Tag your memories with emotions to help you remember how you felt.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-secondary/10 rounded-full">
                  <Bookmark className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Save Memories</h3>
                <p className="text-muted-foreground">
                  Store photos, notes, and other mementos in your digital scrapbook.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Calendar className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Timeline View</h3>
                <p className="text-muted-foreground">
                  See your emotional journey over time with our beautiful timeline.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Start Your Emotional Journey Today
              </h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Join thousands of others who are documenting their emotional journeys.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/signup">Create Your Scrapbook</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookHeart className="h-5 w-5 text-primary" />
              <span className="font-medium">EmotionEchoes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2023 EmotionEchoes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
