import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-rich-blue border-t border-slate-600/30 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-electric rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-semibold text-white">Ecco</span>
              <span className="text-sm text-slate-400">AI Native Ventures</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Building the next wave of agentic, AI-first companies. 
              Turn your AI vision into market-ready ventures at unprecedented speed.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/ecco-ventures" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-300 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/ecco_ventures" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-300 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/ecco-ventures" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-300 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Agentic Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ventures')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Ventures
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="mailto:hello@ecco.ventures" className="text-slate-300 hover:text-white transition-colors">
                  hello@ecco-studio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-600/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 Ecco AI Native Ventures. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-4 md:mt-0">
            Built with AI-native frameworks
          </p>
        </div>
      </div>
    </footer>
  );
}