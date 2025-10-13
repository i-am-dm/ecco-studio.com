import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Presentation, Shield } from 'lucide-react';

export function AgenticSolutions() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const solutions = [
    {
      icon: <MessageSquare className="w-12 h-12 text-white" />,
      title: "AI Customer Success Rep",
      description: "Autonomous agents that handle customer inquiries, escalations, and success workflows 24/7.",
      metrics: "95% resolution rate, -70% support costs",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Presentation className="w-12 h-12 text-white" />,
      title: "Auto-Demo Generator",
      description: "AI agents that create personalized product demonstrations for each prospect automatically.",
      metrics: "3x conversion rates, 80% time savings",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Realtime Compliance Monitor",
      description: "Continuous compliance monitoring with automated reporting and risk assessment.",
      metrics: "100% audit accuracy, -90% compliance costs",
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <section id="solutions" className="py-24 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Agentic Solutions Spotlight
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Pre-built AI agent frameworks for RAG, autonomous operations, and multi-modal interactions. 
            Ready to deploy, built to scale.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {solutions.map((solution, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-br ${solution.gradient} p-8 md:p-12 text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="mb-6">
                        {solution.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {solution.title}
                      </h3>
                      <p className="text-lg md:text-xl mb-6 opacity-90">
                        {solution.description}
                      </p>
                      <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                        <span className="font-semibold">{solution.metrics}</span>
                      </div>
                    </div>
                    
                    {/* Abstract background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm rounded-full transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-cyan-400' : 'bg-slate-500'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm rounded-full transition-colors text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}