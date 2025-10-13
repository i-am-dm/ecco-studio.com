import { useState } from 'react';
import { Calendar, Sparkles, Check } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: '',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowConfetti(true);
    
    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-slate-blue relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="gradient-blur rounded-2xl p-12">
            <div className="w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your venture is ignited! 🚀
            </h2>
            
            <p className="text-xl text-slate-300 mb-8">
              We'll review your idea and get back to you within 24 hours. 
              Ready to build the future together?
            </p>
            
            <a 
              href="https://calendly.com/ecco-ventures"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-electric text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Strategy Call</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Turn your AI vision into reality. Share your idea and let's explore how we can build your AI-native venture together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  What to expect:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <span className="text-slate-300">24-hour initial review and feedback</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <span className="text-slate-300">Technical feasibility assessment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <span className="text-slate-300">Market opportunity analysis</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <span className="text-slate-300">Custom development roadmap</span>
                  </li>
                </ul>
              </div>

              <div className="gradient-blur rounded-xl p-6">
                <Sparkles className="w-6 h-6 text-cyan-400 mb-3" />
                <p className="text-slate-200">
                  "The best time to start an AI company was 5 years ago. The second best time is now."
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="card-dark-solid rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white placeholder-slate-400"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="idea" className="block text-sm font-medium text-slate-200 mb-2">
                    Describe your AI venture idea in one sentence
                  </label>
                  <textarea
                    id="idea"
                    name="idea"
                    required
                    rows={3}
                    value={formData.idea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors resize-none text-white placeholder-slate-400"
                    placeholder="AI agents that automate..."
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-200 mb-2">
                    Preferred Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-white"
                  >
                    <option value="" className="bg-slate-700">Select timeline</option>
                    <option value="asap" className="bg-slate-700">ASAP - I'm ready now</option>
                    <option value="1-month" className="bg-slate-700">Within 1 month</option>
                    <option value="3-months" className="bg-slate-700">Within 3 months</option>
                    <option value="6-months" className="bg-slate-700">Within 6 months</option>
                    <option value="exploring" className="bg-slate-700">Just exploring</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-electric text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 animate-pulse-glow"
                >
                  Ignite my venture
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-600 text-center">
                <p className="text-sm text-slate-400 mb-3">Prefer to talk first?</p>
                <a 
                  href="https://calendly.com/ecco-ventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a 15-min call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}