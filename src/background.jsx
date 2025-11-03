import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Stars,
  Sphere,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import TParticles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import * as random from "maath/random/dist/maath-random.esm";

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#00F0FF", "#8F00FF"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  if (!init) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 3.5 }}
    >
      <TParticles id="tsparticles" options={options} />
    </motion.div>
  );
};

const NeuralNetworkParticles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 3.5 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 8;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const DigitalBrainScene = () => {
  const coreRef = useRef();
  const starsRef = useRef();
  const { viewport } = useThree();
  const [distort] = useState(0.4);
  const [speed] = useState(2);

  const scale = Math.min(viewport.width, viewport.height) / 5;

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
      starsRef.current.rotation.x += delta * 0.01;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <NeuralNetworkParticles />

      <mesh ref={coreRef} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00F0FF"
            distort={distort}
            speed={speed}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        <Sphere args={[0.7, 64, 64]}>
          <MeshDistortMaterial
            color="#8F00FF"
            distort={distort}
            speed={speed}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </mesh>
    </group>
  );
};

export const Background3DScene = () => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full z-[-2]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5, delay: 3.5 }}
  >
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1.5}
          color="#8F00FF"
        />
        <ambientLight intensity={0.5} />

        <DigitalBrainScene />
      </Suspense>
    </Canvas>
  </motion.div>
);