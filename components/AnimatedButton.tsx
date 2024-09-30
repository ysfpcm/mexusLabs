// components/AnimatedButton.tsx
import { stagger, useAnimate, animate, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Rowdies } from 'next/font/google';

const rowdies = Rowdies({ weight: '400', subsets: ['latin'] });

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

interface AnimatedButtonProps {
  text: string;
  href: string;
}

export default function AnimatedButton({ text, href }: AnimatedButtonProps) {
  const [scope, animateFn] = useAnimate();

  const onButtonClick = () => {
    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animateFn([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]).then(() => {
      // Scroll to the target section after the animation
      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = href;
      }
    });
  };

  return (
    <div ref={scope} className="relative">
      <motion.button
        onClick={onButtonClick}
        className={`${rowdies.className} bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full inline-flex items-center justify-center relative overflow-hidden shadow-lg`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <span className="sr-only">{text}</span>
        <span className="flex items-center whitespace-nowrap" aria-hidden>
          <span className="text-xl sm:text-2xl">{text}</span>
          <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
        </span>
      </motion.button>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 block overflow-visible"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <svg
            className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
            key={index}
            viewBox="0 0 122 117"
            width="20"
            height="20"
          >
            <path
              className="fill-white"
              d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
            />
          </svg>
        ))}
      </span>
    </div>
  );
}
