// glossy-navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaReact } from "react-icons/fa";


interface BouncyButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const BouncyButton: React.FC<BouncyButtonProps> = ({ children, href, className }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    <Link href={href} className={className}>
      {children}
    </Link>
  </motion.div>
);

export default function GlossyNavbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = scrollY.getPrevious();
      if (previous !== undefined && latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    });
  }, [scrollY]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-20 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-between w-full">
        <BouncyButton href="/" className="text-3xl font-bold">
          <span className="text-blue-400">mexus</span>
          <span className="text-white">Labs</span>
        </BouncyButton>

        <div className="flex items-center justify-center flex-grow">
          <BouncyButton href="/" className="">
            <FaReact className="text-blue-400" size={100} />
          </BouncyButton>
        </div>

        <div className="flex items-center space-x-4">
          <BouncyButton
            href="#projects"
            className="text-white font-semibold hover:text-blue-200 transition-colors text-2xl"
          >
            Projects
          </BouncyButton>
          <BouncyButton
            href="#contact"
            className="px-4 py-2 text-blue-400 bg-white bg-opacity-10 font-bold rounded-md hover:bg-opacity-20 transition-colors text-2xl"
          >
            Contact
          </BouncyButton>
        </div>
      </div>
    </motion.nav>
  );
}
