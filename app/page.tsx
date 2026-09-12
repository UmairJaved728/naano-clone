import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Testimonial from "@/components/home/Testimonial";
import Marketplace from "@/components/home/Marketplace";
import HowItWorks from "@/components/home/HowItWorks";
import CaseStudy from "@/components/home/CaseStudy";
import Results from "@/components/home/Results";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="relative">
      <div className="bg-noise" aria-hidden />
      <Nav links="home" />
      <Hero />
      <Testimonial />
      <Marketplace />
      <HowItWorks />
      <CaseStudy />
      <Results />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}