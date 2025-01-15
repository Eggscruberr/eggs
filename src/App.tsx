import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Egg } from 'lucide-react';
import Contact from './components/Contact';

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: string;
  link: string;
}

function Home() {
  const product: Product = {
    id: 1,
    title: "Winnerz Deal",
    image: "https://bonkku.com/wp-content/uploads/2023/02/winnerz-508.png",
    description: "Exclusive offer for our valued customers. Don't miss out on this amazing deal!",
    price: "",
    link: "#"
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Exclusive Winnerz Deal You Can't Miss
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Level up your game today with this exclusive deal!
          </p>
        </div>
      </div>

      {/* Winnerz Deal Block */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center animate__animated animate__fadeInUp animate__delay-1s">
          <div className="relative rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 transform hover:translate-y-2 border-2 border-gray-700">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover transform transition-all duration-500 ease-in-out hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 opacity-30 animate-gradient-background"></div> {/* Gradient Animation */}
            <div className="relative p-6 z-10">
              <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
              <p className="text-gray-200 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-yellow-400">{product.price}</span>
                <a
                  href={product.link}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors transform hover:scale-105"
                >
                  Claim Deal
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
                  <span className="ml-2 text-xl font-bold text-gray-100">Egg</span>
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
      </div>
    </Router>
  );
}

export default App;
