import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  PenTool,
  Server,
  Database,
  Globe,
  Cpu,
  Cloud,
  Lock,
  Smartphone,
  Zap,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

const skills: Skill[] = [
  { name: 'Frontend Development', icon: Code, color: 'text-blue-500' },
  { name: 'UI/UX Design', icon: PenTool, color: 'text-green-500' },
  { name: 'Backend Development', icon: Server, color: 'text-red-500' },
  { name: 'Database Management', icon: Database, color: 'text-yellow-500' },
  { name: 'Web Performance', icon: Globe, color: 'text-purple-500' },
  { name: 'Machine Learning', icon: Cpu, color: 'text-pink-500' },
  { name: 'Cloud Computing', icon: Cloud, color: 'text-indigo-500' },
  { name: 'Cybersecurity', icon: Lock, color: 'text-orange-500' },
  { name: 'Mobile Development', icon: Smartphone, color: 'text-teal-500' },
  { name: 'API Integration', icon: Zap, color: 'text-cyan-500' },
];

const SkillCard = ({ skill }: { skill: Skill }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-64 mx-4 flex-shrink-0">
    <div className={`text-4xl mb-4 ${skill.color}`}>
      <skill.icon size={40} />
    </div>
    <h3 className="text-xl font-semibold text-center">{skill.name}</h3>
  </div>
);

const InfiniteMovingCards = ({
  items,
  direction,
}: {
  items: Skill[];
  direction: 'left' | 'right';
}) => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 50,
            ease: 'linear',
          },
        }}
      >
        {items.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
        {items.map((skill) => (
          <SkillCard key={`${skill.name}-duplicate`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

export default function SkillsSection() {
  const topRowSkills = skills.slice(0, 5); // First 5 skills
  const bottomRowSkills = skills.slice(5);  // Remaining skills

  return (
    <section id="skills" className="py-5">
      <div className="container mx-auto px-2">
        <div className="space-y-4">
          <InfiniteMovingCards items={topRowSkills} direction="right" />
          <InfiniteMovingCards items={bottomRowSkills} direction="left" />
        </div>
      </div>
    </section>
  );
}
