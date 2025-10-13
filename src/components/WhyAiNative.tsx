import { Zap, GitBranch, Rocket } from 'lucide-react';

export function WhyAiNative() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "Built to scale from day one",
      description: "AI-native architecture designed for exponential growth without technical debt."
    },
    {
      icon: <GitBranch className="w-8 h-8 text-cyan-400" />,
      title: "Agentic workflows, not bolt-ons",
      description: "Autonomous AI agents embedded into core business processes from the ground up."
    },
    {
      icon: <Rocket className="w-8 h-8 text-cyan-400" />,
      title: "Ship in weeks, not months",
      description: "Pre-built frameworks and proven patterns accelerate time-to-market dramatically."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-rich-blue to-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why AI-Native?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Traditional businesses bolt AI onto existing systems. We build companies with AI as their foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group card-dark p-8 rounded-2xl hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}