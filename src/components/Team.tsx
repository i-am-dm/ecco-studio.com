import { ExternalLink } from 'lucide-react';

export function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Daniel Meacham",
      title: "Co-Founder & CTO",
      avatar: "DM",
      gradient: "from-blue-600 to-cyan-600",
      linkedin: "https://www.linkedin.com/in/dmmeacham/",
      bio: "Full-stack engineer and AI specialist with deep expertise in machine learning infrastructure. Built scalable systems for Fortune 500 companies and AI startups."
    },
    {
      id: 2,
      name: "Kyle Caffey",
      title: "Co-Founder & CEO",
      avatar: "KC",
      gradient: "from-purple-600 to-pink-600",
      linkedin: "https://www.linkedin.com/in/kyle-caffey/",
      bio: "AI entrepreneur and venture builder with extensive experience in scaling tech startups. Previously led product teams at major tech companies and founded multiple successful ventures."
    }
  ];

  return (
    <section id="team" className="py-24 bg-slate-blue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Team
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Meet the visionaries driving Ecco's mission to build the next generation of AI-powered ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer card-dark p-8 rounded-2xl hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6`}>
                  {member.avatar}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">
                  {member.name}
                </h3>

                <p className="text-cyan-400 font-medium mb-4">
                  {member.title}
                </p>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600/50 hover:bg-slate-600/70 backdrop-blur-sm rounded-full text-slate-300 hover:text-white transition-all duration-300 group"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
