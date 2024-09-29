import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../utils/utils";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

interface ParticleRingProps {
  scrollProgress: MotionValue<number>;
}

const ParticleRing: React.FC<ParticleRingProps> = ({ scrollProgress }) => {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ width: '100%', height: '100%', pointerEvents: 'none', position: 'fixed' }} // Ensure it doesn't block interactions
    >
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 75,
        }}
        style={{ width: '100%', height: '100%' }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <PointCircle scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

interface PointCircleProps {
  scrollProgress: MotionValue<number>;
}

const PointCircle: React.FC<PointCircleProps> = ({ scrollProgress }) => {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.001;
    }
    const scrollValue = scrollProgress.get();
    camera.position.z = 15 - scrollValue * 10; // Adjust as needed
  });

  return (
    <group ref={ref}>
            {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position as [number, number, number]} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position as [number, number, number]} color={point.color} />
      ))}
    </group>
  );
};

interface PointProps {
  position: [number, number, number];
  color: string;
}

const Point: React.FC<PointProps> = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.2, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={1}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
