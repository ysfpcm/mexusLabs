// page.tsx
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ParticleRing from "../components/ParticleRing"; // Import the ParticleRing component
import AnimatedButton from "../components/AnimatedButton"; // Import the AnimatedButton component
import TiltCard from "../components/TiltCard"; // Import the TiltCard component
import SkillsSection from '../components/SkillsSection';
import RevealBento from '../components/RevealBento';
import GlossyNavbar from '../components/GlossyNavbar';

export interface Project {
  title: string;
  description: string;
  link: string;

}

const projects = [
  { id: 1, title: "Eliassen Group - Enhancing Workforce Solutions", description: "Provides consulting and workforce solutions, specializing in IT, Agile consulting, and creative services to help businesses achieve operational efficiency..", link: "https://www.eliassen.com/" },
  { id: 2, title: "Superlist - Task Management Redefined", description: "Productivity platform designed for modern teams, offering task management, collaboration tools, and a sleek user interface to streamline project workflows.", link: "https://www.superlist.com/" },
  { id: 3, title: "George Nakashima Woodworkers", description: "A peaceful, nature-centric design showcasing the craftsmanship of wood furniture.", link: "https://nakashimawoodworkers.com/" },
  { id: 4, title: "Active Theory", description: "Immersive animations and water-effect design creating dynamic web experiences.", link: "https://activetheory.net/" },
  { id: 5, title: "Koox", description: "A takeout-focused site with watercolor themes and animated transitions.", link: "https://koox.co.uk/" },
  { id: 6, title: "Frans Hals Museum", description: "Beautiful integration of exhibit photography and digital elements.", link: "https://franshalsmuseum.nl/nl" },
  { id: 7, title: "Simply Chocolate", description: "A visually appealing site highlighting chocolate bars with interactive effects.", link: "https://simplychocolate.dk/" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const { scrollYProgress: scrollYProgressSpring } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgressSpring.onChange((latest) => {
      scrollYProgress.set(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgressSpring, scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#020617] relative"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      <ParticleRing scrollProgress={scrollYProgress} />

      <GlossyNavbar />

      <main className="flex-grow">
        <motion.section
          className="h-screen flex flex-col justify-center items-center p-10 text-center relative z-10"
          style={{ opacity, scale, y }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Welcome to{' '}
            <span className="text-blue-400">
              mexus
            </span>
            Labs
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-4xl font-bold mb-4 text-blue-400"
          >
              Time to elevate your business.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <AnimatedButton text="View Projects" href="#projects" />
          </motion.div>
        </motion.section>

        {/* Adjusted spacer section */}
        
        <section className="h-[25vh] flex items-center justify-center"></section>

        <section id="projects" className="min-h-screen py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 5).map((project, index) => (
                <ProjectBox key={project.id} project={project} index={index} />
              ))}
              <div className="lg:col-start-3">
                <ProjectBox project={projects[5]} index={5} />
              </div>
              <div className="md:col-span-2 lg:col-span-1 lg:col-start-2">
                <ProjectBox project={projects[6]} index={6} />
              </div>
            </div>
          </div>
        </section>

        {/* New skills section */}
        <section id="skills" className="min-h-screen py-40 relative z-10">
          <div className="container mx-auto px-4">
            <SkillsSection />
          </div>
        </section>

        <section id="contact" className="min-h-screen py-1 relative z-10">
          <div className="container mx-auto px-4">
            <RevealBento />
          </div>
        </section>
      </main>

      <footer className="p-10 text-center relative z-10">
        <p>&copy; 2024 mexusLabs by Marc Jean-Baptiste. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ProjectBox({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="bg-gray-700 p-8 rounded-lg shadow-lg card min-h-[300px] flex flex-col">
        <div className="relative z-10 flex-grow">
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          {/* You can add more details here if needed */}
        </div>
        <div className="relative z-10 mt-auto self-end">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Visit Project
            <ExternalLink className="ml-2" size={16} />
          </a>
        </div>
      </TiltCard>
    </motion.div>
  );
}

