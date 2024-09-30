import React, { useRef, forwardRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  MotionProps,
} from "framer-motion";

interface TiltCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className, style, initial, animate, transition }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLDivElement>) || innerRef;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale(1.05)`;

    const ROTATION_RANGE = 25; // Increased from 15 to 25 for more tilt
    const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!combinedRef.current) return;

      const rect = combinedRef.current.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rY = ((mouseX / width) * ROTATION_RANGE) - HALF_ROTATION_RANGE;
      const rX = ((mouseY / height) * ROTATION_RANGE) - HALF_ROTATION_RANGE;

      x.set(-rX); // Invert x-axis rotation for natural tilt
      y.set(rY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={combinedRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
          transition: "transform 0.1s ease-out",
          backgroundColor: "#0f172a", // Lighter navy blue background
          borderRadius: "12px", // Rounded corners
          ...style,
        }}
        className={`${className} overflow-hidden`}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={{ scale: 1.05 }}
      >
        <div style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </motion.div>
    );
  }
);

TiltCard.displayName = "TiltCard";

export default TiltCard;