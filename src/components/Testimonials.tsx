import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Ecco turned our AI idea into a $5M company in 8 months. Their agentic frameworks saved us years of development.",
      name: "Sarah Chen",
      title: "Founder, VoxFlow",
      avatar: "SC"
    },
    {
      quote: "The speed and expertise Ecco brings is unmatched. We went from concept to enterprise clients in 12 weeks.",
      name: "Marcus Rodriguez",
      title: "CEO, DataCortex", 
      avatar: "MR"
    },
    {
      quote: "Working with Ecco feels like having a crystal ball for AI. They see the future and build it before others even understand it.",
      name: "Dr. Emily Watson",
      title: "Founder, MindForge",
      avatar: "EW"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-rich-blue to-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Founder Testimonials
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Hear from the visionaries who turned their AI ideas into thriving ventures with Ecco.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="card-dark rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-cyan-400 mb-6" />
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <blockquote className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-electric rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-slate-300">{testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm rounded-full shadow-md transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-cyan-400' : 'bg-slate-500'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm rounded-full shadow-md transition-colors text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}