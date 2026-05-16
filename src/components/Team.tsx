import { Brain, Building2, Layers } from 'lucide-react';

export function Team() {
  const highlights = [
    {
      icon: <Brain className="w-8 h-8 text-cyan-400" />,
      title: "Deep AI expertise",
      description:
        "Decades of hands-on experience building machine learning systems, agentic workflows, and production AI infrastructure.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-cyan-400" />,
      title: "Enterprise delivery",
      description:
        "Proven track record shipping reliable solutions for Fortune 500 companies across complex, regulated environments.",
    },
    {
      icon: <Layers className="w-8 h-8 text-cyan-400" />,
      title: "End-to-end builders",
      description:
        "Full-stack technologists who design, ship, and scale ventures—from architecture and product through go-to-market.",
    },
  ];

  return (
    <section id="team" className="py-24 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Team
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ecco is led by seasoned technologists with decades of experience in AI
            and a long history of delivering solutions for Fortune 500 companies.
            We combine enterprise-grade engineering with the speed and focus of a
            venture studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="card-dark p-8 rounded-2xl text-center hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl w-fit mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
