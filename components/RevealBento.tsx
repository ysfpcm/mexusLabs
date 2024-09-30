// components/RevealBento.tsx
import React, { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SiGithub, SiTiktok, SiYoutube, SiLinkedin } from "react-icons/si";
import { FaReact } from "react-icons/fa"

const RevealBento: FC = () => {
  return (
    <div className="min-h-screen px-4 py-6 text-zinc-50">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-2"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
  );
};

export default RevealBento;

// Subcomponents

// Type definition for Block component props
type BlockProps = HTMLMotionProps<"div"> & {
  className?: string;
};

const Block: FC<BlockProps> = ({ className, ...rest }) => {
    return (
      <motion.div
        variants={{
          initial: {
            scale: 0.5,
            y: 50,
            opacity: 0,
          },
          animate: {
            scale: 1,
            y: 0,
            opacity: 1,
          },
        }}
        transition={{
          type: "spring",
          mass: 3,
          stiffness: 400,
          damping: 50,
        }}
        className={twMerge(
          "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
          className
        )}
        {...rest}
      />
    );
  };

  const HeaderBlock: FC = () => (
    <Block className="col-span-12 row-span-2 md:col-span-6">
      <FaReact className="text-blue-400 mb-4" size={56} />
      <h1 className="mb-12 text-4xl font-medium leading-tight">
        Hi, I'm Marc.{" "}
        <span className="text-zinc-400">
          I will build your website, your app, or anything you need for success.
        </span>
      </h1>
      <motion.a
        href="https://calendly.com/marlx0879/30min" // Replace with your actual Calendly link
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400 text-zinc-900 font-medium hover:bg-blue-300 transition-colors"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        Schedule a consultation <FiArrowRight />
      </motion.a>
    </Block>
  );

const SocialsBlock: FC = () => {
  const handleCopyContact = () => {
    const contactInfo = "email@example.com\n+1 (123) 456-7890";
    navigator.clipboard.writeText(contactInfo).then(() => {
      alert("Contact information copied to clipboard!");
    });
  };

  return (
    <>
      <Block
        whileHover={{
          rotate: "2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-red-500 md:col-span-3"
      >
        <a
          href="https://www.youtube.com/@marcjnb" // Update with your YouTube link
          className="grid h-full place-content-center text-3xl text-white"
        >
          <SiYoutube />
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: "-2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-green-600 md:col-span-3"
      >
        <a
          href="https://github.com/ysfpcm" // Update with your GitHub link
          className="grid h-full place-content-center text-3xl text-white"
        >
          <SiGithub />
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: "-2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-zinc-50 md:col-span-3"
        onClick={handleCopyContact}
      >
        <div className="grid h-full place-content-center text-black cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <span className="text-lg font-medium mb-1">Copy</span>
            <div className="flex items-center text-2xl mb-1">
              <FiPhone className="mr-2" />
              <FiMail />
            </div>
            <span className="text-sm">To clipboard!</span>
          </div>
        </div>
      </Block>
      <Block
        whileHover={{
          rotate: "2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-blue-500 md:col-span-3"
      >
        <a
          href="https://www.linkedin.com/in/marcjnb/"
          className="grid h-full place-content-center text-3xl text-white"
        >
          <SiLinkedin />
        </a>
      </Block>
    </>
  );
};

const AboutBlock: FC = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is building and modernizing websites and apps.{" "}
      <span className="text-zinc-400">
        I build primarily with React, Next.js, and MongoDB. I love
        this stack so much that I even built a website about it.
      </span>
    </p>
  </Block>
);

const LocationBlock: FC = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock: FC = () => (
  <Block className="col-span-12 md:col-span-9 text-blue-400">
    <p className="mb-3 text-lg">Join my mailing list for updates and promotional offers.</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-blue-600 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-blue-400 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-blue-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);

const Logo: FC = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-12 fill-zinc-50"
    >
    </svg>
  );
};

