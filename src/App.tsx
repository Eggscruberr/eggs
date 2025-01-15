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
  const products: Product[] = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      description: "Experience crystal clear sound with our premium wireless headphones. Perfect for music enthusiasts.",
      price: "$199.99",
      link: "#"
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      description: "Track your fitness goals with our advanced smartwatch. Features heart rate monitoring and GPS.",
      price: "$149.99",
      link: "#"
    },
    {
      id: 3,
      title: "Professional Camera Kit",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      description: "Capture life's moments in stunning detail with our professional-grade camera kit.",
      price: "$899.99",
      link: "#"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Exclusive Deals You Can't Miss
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Level up ur game today!
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transition-transform hover:scale-105 border border-gray-700">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{product.title}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-400">{product.price}</span>
                  <a
                    href={product.link}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Get Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
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