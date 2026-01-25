import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProblemSolution from '../components/ProblemSolution';
import HowItWorks from '../components/HowItWorks';
import Comparison from '../components/Comparison';
import Features from '../components/Features';
import SimulatorSection from '../components/SimulatorSection';
import Methodology from '../components/Methodology';
import ClientArea from '../components/ClientArea';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <Comparison />
      <SimulatorSection />
      <Methodology />
      <ClientArea />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
};

export default Home;