import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Egg, Copy } from 'lucide-react';
import Contact from './components/Contact';

interface Product {
  id: number;
  title: string;
  image: string;
}

function Home() {
  const product: Product = {
    id: 1,
    title: "Goldenbet",
    image: "https://static.casino.guru/pict/190654/4163_500x500_dark1.png?timestamp=1693806952000&imageDataId=597616"
  };

  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText('');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Level up your game today
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upgrade your playstyle with these exciting offers!
          </p>
        </div>
      </div>

      {/* Deal Block */}
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center animate__animated animate__fadeInUp animate__delay-1s">
          <div className="w-full bg-[#1a1f2e] rounded-lg overflow-hidden border border-gray-700/50">
            {/* Title Section with Image */}
            <div className="relative text-center py-8 border-b border-gray-700/50 bg-gradient-to-b from-[#1a1f2e] via-[#232936] to-[#1a1f2e]">
              {/* Radial glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)] pointer-events-none"></div>
              {/* Diagonal lines pattern */}
              <div className="absolute inset-0 opacity-5" 
                   style={{
                     backgroundImage: 'linear-gradient(45deg, #ffd700 1px, transparent 1px)',
                     backgroundSize: '30px 30px'
                   }}></div>
              <img
                src={product.image}
                alt={product.title}
                className="w-48 mx-auto mb-4 transform transition-all duration-500 ease-in-out hover:scale-105 relative z-10"
              />
              <h2 className="text-2xl font-bold relative z-10">
                <span className="text-[#ffd700]">Latest Welcome Bonus</span>
              </h2>
            </div>
            
            {/* Code Section */}
            <div className="p-6">
            <div className="p-6">
              <a
                href="https://go.affision.com/visit/?bta=43898&brand=goldenbet"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-[#ffd700] to-[#ffb700] text-gray-900 font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#ffb700] hover:to-[#ffd700]"
              >
                Register
              </a>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen animated-bg relative">
        {/* Floating Navbar with Glass Effect */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Egg className="h-8 w-8 text-blue-400" />
                  <span className="ml-2 text-xl font-bold text-gray-100">Eggsino</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Deals</Link>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-blue-400 focus:outline-none"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Deals</Link>
                <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">About</Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">Contact</Link>
              </div>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-gray-400 space-y-4">
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span>18+</span>
                <span>|</span>
                <span>Gamble Responsibly</span>
                <span>|</span>
                <a href="https://www.begambleaware.org/" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-400 hover:text-blue-300">BeGambleAware</a>
              </div>
              <div className="max-w-2xl mx-auto text-sm">
                <p className="mb-2">Most people gamble for fun and enjoyment. Do not think of gambling as a way to make money.</p>
                <p className="mb-2">Only gamble with money you can afford to lose. Set a money and time limit in advance.</p>
                <p>Never chase your losses. Don't use gambling to distract yourself from everyday problems.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;