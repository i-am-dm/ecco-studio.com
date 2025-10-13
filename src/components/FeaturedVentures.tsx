import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export function FeaturedVentures() {
  const [selectedVenture, setSelectedVenture] = useState(null);

  const ventures = [
    {
      id: 1,
      name: "VoxFlow",
      logo: "VF",
      gradient: "from-purple-600 to-pink-600",
      description: "AI-powered voice automation for customer service",
      caseStudy: "VoxFlow revolutionized customer support with AI agents that understand context and emotion. Within 6 months, they processed 100K+ conversations with 94% customer satisfaction.",
      metric: "-70% support costs",
      industry: "Customer Service"
    },
    {
      id: 2,
      name: "DataCortex",
      logo: "DC",
      gradient: "from-blue-600 to-cyan-600",
      description: "Autonomous data pipeline orchestration",
      caseStudy: "DataCortex built self-healing data infrastructure that automatically detects and fixes pipeline issues. Their platform now manages 50TB+ daily across 200+ enterprise clients.",
      metric: "99.9% uptime",
      industry: "Data Infrastructure"
    },
    {
      id: 3,
      name: "MindForge",
      logo: "MF",
      gradient: "from-green-600 to-emerald-600",
      description: "AI research assistant for scientific discovery",
      caseStudy: "MindForge accelerates research with AI that reads papers, generates hypotheses, and designs experiments. Used by 500+ researchers across top universities and biotech companies.",
      metric: "3x faster discovery",
      industry: "Research & Development"
    }
  ];

  return (
    <section id="ventures" className="py-24 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Ventures
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real companies, real results. See how our AI-native approach drives exponential growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ventures.map((venture) => (
            <div 
              key={venture.id}
              onClick={() => setSelectedVenture(venture)}
              className="group cursor-pointer card-dark p-8 rounded-2xl hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${venture.gradient} rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6`}>
                {venture.logo}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {venture.name}
              </h3>
              
              <p className="text-slate-300 mb-4">
                {venture.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{venture.industry}</span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedVenture && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-blue border border-slate-600 rounded-2xl max-w-2xl w-full p-8 relative">
              <button
                onClick={() => setSelectedVenture(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-600/50 rounded-full transition-colors text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedVenture.gradient} rounded-lg flex items-center justify-center text-white font-bold mr-4`}>
                  {selectedVenture.logo}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedVenture.name}</h3>
                  <p className="text-slate-300">{selectedVenture.industry}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {selectedVenture.caseStudy}
              </p>

              <div className="gradient-blur rounded-lg p-4">
                <span className="text-cyan-300 font-semibold text-lg">
                  {selectedVenture.metric}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}