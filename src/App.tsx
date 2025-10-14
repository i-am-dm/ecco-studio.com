import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { WhyAiNative } from './components/WhyAiNative';
import { AgenticSolutions } from './components/AgenticSolutions';
import { LaunchPipeline } from './components/LaunchPipeline';
import { FeaturedVentures } from './components/FeaturedVentures';
// import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-blue via-slate-blue to-rich-blue">
      <NavBar />
      <Hero />
      <WhyAiNative />
      <AgenticSolutions />
      <LaunchPipeline />
      <FeaturedVentures />
      {/* <Testimonials /> */}
      <ContactForm />
      <Footer />
    </div>
  );
}