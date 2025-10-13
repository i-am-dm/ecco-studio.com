import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full opacity-20 blur-2xl"></div>
        
        {/* Firefly particles */}
        <div className="fireflies">
          {/* Row 1 */}
          <div className="absolute top-16 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-firefly-1"></div>
          <div className="absolute top-32 left-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-firefly-2" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-24 left-60 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-firefly-3" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 left-80 w-1 h-1 bg-blue-300 rounded-full animate-firefly-1" style={{ animationDelay: '3s' }}></div>
          
          {/* Row 2 */}
          <div className="absolute top-48 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full animate-firefly-2" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-56 left-36 w-2 h-2 bg-cyan-500 rounded-full animate-firefly-3" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-64 left-56 w-1 h-1 bg-blue-400 rounded-full animate-firefly-1" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-52 left-76 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-firefly-2" style={{ animationDelay: '3.5s' }}></div>
          
          {/* Row 3 */}
          <div className="absolute top-72 left-24 w-1 h-1 bg-blue-500 rounded-full animate-firefly-3" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-80 left-44 w-2 h-2 bg-cyan-300 rounded-full animate-firefly-1" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute top-88 left-64 w-1.5 h-1.5 bg-purple-300 rounded-full animate-firefly-2" style={{ animationDelay: '3.2s' }}></div>
          <div className="absolute top-76 left-84 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-firefly-3" style={{ animationDelay: '4.2s' }}></div>
          
          {/* Right side particles */}
          <div className="absolute top-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-firefly-2" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-36 right-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-firefly-1" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute top-28 right-60 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-firefly-3" style={{ animationDelay: '2.8s' }}></div>
          <div className="absolute top-44 right-80 w-1 h-1 bg-blue-300 rounded-full animate-firefly-2" style={{ animationDelay: '3.8s' }}></div>
          
          <div className="absolute top-52 right-16 w-1.5 h-1.5 bg-purple-400 rounded-full animate-firefly-1" style={{ animationDelay: '1.3s' }}></div>
          <div className="absolute top-60 right-36 w-2 h-2 bg-cyan-500 rounded-full animate-firefly-3" style={{ animationDelay: '2.3s' }}></div>
          <div className="absolute top-68 right-56 w-1 h-1 bg-blue-400 rounded-full animate-firefly-2" style={{ animationDelay: '3.3s' }}></div>
          <div className="absolute top-56 right-76 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-firefly-1" style={{ animationDelay: '4.3s' }}></div>
          
          <div className="absolute top-76 right-24 w-1 h-1 bg-blue-500 rounded-full animate-firefly-3" style={{ animationDelay: '1.7s' }}></div>
          <div className="absolute top-84 right-44 w-2 h-2 bg-cyan-300 rounded-full animate-firefly-2" style={{ animationDelay: '2.7s' }}></div>
          <div className="absolute top-92 right-64 w-1.5 h-1.5 bg-purple-300 rounded-full animate-firefly-1" style={{ animationDelay: '3.7s' }}></div>
          <div className="absolute top-80 right-84 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-firefly-3" style={{ animationDelay: '4.7s' }}></div>
          
          {/* Center area particles (more sparse) */}
          <div className="absolute top-96 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-firefly-1" style={{ animationDelay: '2.1s' }}></div>
          <div className="absolute top-1/4 left-2/3 w-2 h-2 bg-blue-400 rounded-full animate-firefly-2" style={{ animationDelay: '3.1s' }}></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-firefly-3" style={{ animationDelay: '4.1s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-firefly-1" style={{ animationDelay: '5.1s' }}></div>
          <div className="absolute top-3/4 left-3/4 w-1.5 h-1.5 bg-blue-500 rounded-full animate-firefly-2" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 gradient-blur rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-slate-200">Building the next wave of agentic, AI-first companies</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Launch AI-native ventures
            <br />
            <span className="text-gradient-electric">
              at the speed of thought
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform breakthrough ideas into production-ready, agentic AI companies in weeks, not years. 
            We provide the frameworks, expertise, and velocity to scale from zero to market leader.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group bg-gradient-electric text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 animate-pulse-glow flex items-center space-x-2"
            >
              <span>Build with Ecco</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-slate-200 bg-slate-blue/50 backdrop-blur-sm border border-slate-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-slate-blue/70 hover:border-slate-500 transition-colors flex items-center space-x-2 group"
            >
              <span>See Agentic Solutions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-16 w-4 h-4 bg-purple-400 rounded-full animate-pulse hidden lg:block"></div>
      </div>
    </section>
  );
}