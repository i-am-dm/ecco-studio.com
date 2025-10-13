import { useEffect, useState } from 'react';
import { Lightbulb, Target, Code, Rocket, TrendingUp } from 'lucide-react';

export function LaunchPipeline() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  const steps = [
    {
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      title: "Idea Intake",
      description: "Rapid assessment and validation of your AI-native concept."
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Rapid Validation",
      description: "Market research and technical feasibility in days."
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "MVP Sprints",
      description: "2-week development cycles using our AI-native frameworks."
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Beta Launch",
      description: "Deploy to real users with built-in analytics and feedback loops."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "Scale & Fund",
      description: "Growth optimization and investor introductions."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let count = 0;
            const interval = setInterval(() => {
              setVisibleSteps(count + 1);
              count++;
              if (count >= steps.length) {
                clearInterval(interval);
              }
            }, 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('pipeline');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pipeline" className="py-24 bg-gradient-to-b from-slate-blue to-rich-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Launch Pipeline
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From spark to scale: Our proven 5-step process turns ideas into market-ready AI ventures.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-slate-600 hidden md:block">
            <div 
              className="h-full bg-gradient-electric transition-all duration-1000 ease-out"
              style={{ width: `${(visibleSteps / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-500 ${
                  index < visibleSteps ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
                }`}
              >
                {/* Step circle */}
                <div className={`relative z-10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                  index < visibleSteps 
                    ? 'bg-gradient-electric text-white shadow-lg shadow-cyan-500/25' 
                    : 'bg-slate-600 border-2 border-slate-500 text-white'
                }`}>
                  {step.icon}
                </div>

                {/* Step content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-1">
                    <div className={`w-0 h-0 border-l-[8px] border-r-0 border-t-[4px] border-b-[4px] border-t-transparent border-b-transparent transition-all duration-500 ${
                      index < visibleSteps - 1 ? 'border-l-cyan-400' : 'border-l-slate-500'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}