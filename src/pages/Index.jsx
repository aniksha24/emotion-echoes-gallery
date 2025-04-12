
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">EmotionEchoes</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
            <Button>
              <Link to="/signup" className="text-white">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">
                Capture Your Emotional Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-[700px] mx-auto">
                Store your memories with their emotions. Create a beautiful scrapbook of your life's most meaningful moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button>
                  <Link to="/signup" className="text-white">Get Started</Link>
                </Button>
                <Link to="/login" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">
                Remember Every Emotion
              </h2>
              <p className="text-gray-600 mt-2">
                Your emotional scrapbook helps you track your feelings and memories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Emotional Tagging</h3>
                <p className="text-gray-600">
                  Tag your memories with emotions to help you remember how you felt.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Save Memories</h3>
                <p className="text-gray-600">
                  Store photos, notes, and other mementos in your digital scrapbook.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Timeline View</h3>
                <p className="text-gray-600">
                  See your emotional journey over time with our beautiful timeline.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Start Your Emotional Journey Today
              </h2>
              <p className="text-gray-600 max-w-[600px] mx-auto">
                Join thousands of others who are documenting their emotional journeys.
              </p>
              <Button className="mt-4">
                <Link to="/signup" className="text-white">Create Your Scrapbook</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">EmotionEchoes</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2023 EmotionEchoes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
