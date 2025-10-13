import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-blue/80 backdrop-blur-lg border-b border-slate-600/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-electric rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-semibold text-white">Ecco Studio</span>
            <span className="text-sm text-slate-400">AI Native Ventures</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Agentic Solutions
            </button>
            <button 
              onClick={() => scrollToSection('ventures')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Ventures
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-electric text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 animate-pulse-glow"
            >
              Build with Ecco
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-blue/95 backdrop-blur-lg border-b border-slate-600/30 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Agentic Solutions
              </button>
              <button 
                onClick={() => scrollToSection('ventures')}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Ventures
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block bg-gradient-electric text-white px-6 py-2 rounded-lg text-center w-full"
              >
                Build with Ecco
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}