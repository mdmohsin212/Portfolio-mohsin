import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Stars,
  Sphere,
  Points,
  PointMaterial,
} from "@react-three/drei";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import TParticles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaRocket,
  FaEnvelope,
  FaBrain,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  SiHuggingface,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiPython,
  SiFlask,
  SiDjango,
  SiDocker,
  SiGit,
} from "react-icons/si";
import * as random from "maath/random/dist/maath-random.esm";

const projects = [
  {
    name: "CodeInsight",
    github: "https://github.com/mdmohsin212/CodeInsight",
    live: "https://mohsin416-codeinsight.hf.space",
    description:
      "An AI-powered code assistant that helps developers understand, document, and optimize source code using LLMs.",
    tech: ["LLMs", "NLP", "Flask", "Hugging Face"],
  },
  {
    name: "Lawverse",
    github: "https://github.com/mdmohsin212/Lawverse",
    live: "https://mohsin416-lawverse.hf.space",
    description:
      "A legal AI platform that uses NLP to summarize, analyze, and search legal documents efficiently.",
    tech: ["NLP", "PyTorch", "Gradio", "RAG"],
  },
  {
    name: "Visual Product Search",
    github: "https://github.com/mdmohsin212/Visual-Product-Search",
    live: "https://mohsin416-visual-products.hf.space",
    description:
      "A computer vision-based system that allows users to search for products using images, powered by CNNs.",
    tech: ["Computer Vision", "CNNs", "TensorFlow", "Flask"],
  },
];

const skills = [
  { name: "Python", icon: <SiPython /> },
  { name: "PyTorch", icon: <SiPytorch /> },
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "Scikit-learn", icon: <SiScikitlearn /> },
  { name: "LLMs", icon: <FaBrain /> },
  { name: "NLP", icon: <FaCode /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Git", icon: <SiGit /> },
];

const experiences = [
  {
    title: "LLM Fine-Tuning & RAG",
    description:
      "Engineered multiple projects involving fine-tuning LLMs (e.g., Llama 2, Mistral) for code generation and legal domain adaptation. Implemented RAG pipelines for knowledge assistants.",
  },
  {
    title: "Full-Stack AI Applications",
    description:
      "Developed and deployed end-to-end AI applications, integrating ML models (CV & NLP) into backends using Flask/Django and serving them via interactive UIs.",
  },
  {
    title: "MLOps Integration",
    description:
      "Built MLOps pipelines for visual product search, automating model training, versioning (DVC), and deployment (Docker, Hugging Face Spaces).",
  },
  {
    title: "Competitive Programming",
    description:
      "Solved 450+ problems on platforms like LeetCode and Codeforces, strengthening my foundation in data structures and algorithms.",
  },
];

const socialLinks = {
  github: "https://github.com/mdmohsin212",
  linkedin: "https://www.linkedin.com/in/mohsin416/",
  huggingface: "https://huggingface.co/mohsin416",
  email: "mailto:siam.mohsin2005@gmail.com",
};

const AnimatedButton = ({ children, href, icon, className = "" }) => (
  <motion.a
    href={href}
    target={href.startsWith("#") ? "_self" : "_blank"}
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-neon-cyan border-2 border-neon-cyan rounded-full transition-all duration-300 backdrop-blur-sm bg-neon-cyan/10 ${className}`}
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(0, 240, 255, 0.2)",
      boxShadow: "0 0 25px rgba(0, 240, 255, 0.5)",
      textShadow: "0 0 8px rgba(0, 240, 255, 0.8)",
    }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    {children}
  </motion.a>
);

const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const springConfig = { stiffness: 150, damping: 20 };

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 20);
    y.set(-yPct * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-lg backdrop-blur-lg bg-glass-bg border border-neon-cyan/30 shadow-holographic transition-all duration-300 h-full flex flex-col"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className="h-full flex flex-col"
        style={{
          transformStyle: "preserve-3d",
          rotateX: y,
          rotateY: x,
        }}
      >
        <h3 className="text-2xl font-sans font-bold text-neon-cyan mb-3">
          {project.name}
        </h3>
        <p className="text-gray-300 font-body mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-neon-cyan/20 text-neon-cyan font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <AnimatedButton href={project.github} icon={<FaGithub />}>
            View Code
          </AnimatedButton>
          <AnimatedButton
            href={project.live}
            icon={<FaRocket />}
            className="border-neon-violet text-neon-violet bg-neon-violet/10"
          >
            Live Demo
          </AnimatedButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NeonCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-cyan pointer-events-none z-[9998]"
      style={{
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.8)",
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

const ParticleBackground = () => {
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

const Background3DScene = () => (
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

const SectionWrapper = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="container mx-auto px-4 py-24 sm:py-32 relative"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const Loader = ({ onLoaded }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    const loadTimer = setTimeout(() => {
      clearInterval(dotInterval);
    }, 2300);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleAnimationComplete = () => {
    document.body.style.overflow = "auto";
    onLoaded();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        className="text-2xl sm:text-4xl font-sans font-bold text-neon-cyan"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.0 }}
      >
        M O H S I N
      </motion.div>
      <div className="w-64 h-1 bg-neon-cyan/20 mt-6 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-neon-cyan shadow-holographic"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-gray-300 font-body text-lg">
        Booting AI System{dots}
      </p>
    </motion.div>
  );
};

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-glass-bg/30 border-b border-neon-cyan/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-sans font-bold text-neon-cyan tracking-widest"
          onClick={() => setIsMenuOpen(false)}
        >
          MOHSIN
        </a>

        <div className="hidden sm:flex items-center gap-6 font-body">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="capitalize text-gray-300 hover:text-neon-cyan transition-all relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="sm:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-neon-cyan text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <motion.div
          className="sm:hidden fixed top-0 left-0 w-full h-screen bg-dark-bg flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
          animate={
            isMenuOpen
              ? { opacity: 1, clipPath: "circle(150% at 100% 0)" }
              : { opacity: 0, clipPath: "circle(0% at 100% 0)" }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-3xl capitalize text-gray-300 hover:text-neon-cyan transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-neon-cyan/10">
    <div className="container mx-auto px-4 text-center text-gray-400 font-body">
      <p>
        &copy; {new Date().getFullYear()} Mohsin. Coded with{" "}
        <span className="text-neon-cyan">AI</span> and{" "}
        <span className="text-neon-violet">Passion</span>.
      </p>
    </div>
  </footer>
);

const Hero = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center relative pt-20"
  >
    <div className="container mx-auto px-4 grid grid-cols-1 items-center gap-8">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.2 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-4">
          Hi, I’m <span className="text-neon-cyan">Mohsin</span>
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white mb-6">
          Machine Learning & AI Engineer
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 font-body mb-10 max-w-xl mx-auto">
          Building intelligent systems that think, see, and understand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <AnimatedButton href="#projects" icon={<FaCode />}>
            View My Projects
          </AnimatedButton>
          <AnimatedButton
            href={socialLinks.huggingface}
            icon={<SiHuggingface />}
            className="border-neon-violet text-neon-violet bg-neon-violet/10"
          >
            Explore on Hugging Face
          </AnimatedButton>
     </div>
      </motion.div>
    </div>
  </section>
);

const Projects = () => (
  <SectionWrapper id="projects">
    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-center mb-12">
      AI/ML <span className="text-neon-cyan">Projects</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
    <div className="text-center mt-12">
      <AnimatedButton
        href={socialLinks.huggingface}
        icon={<SiHuggingface />}
        className="text-lg px-8 py-4"
      >
        View All Projects
      </AnimatedButton>
    </div>
  </SectionWrapper>
);

const About = () => (
  <SectionWrapper id="about">
    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-center mb-12">
      About <span className="text-neon-cyan">Me</span>
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-glass-bg border-4 border-neon-cyan shadow-holographic-lg flex items-center justify-center">
          <FaBrain className="text-9xl text-neon-cyan" />
        </div>
      </motion.div>
      <div>
        <p className="text-lg text-gray-300 font-body mb-6 leading-relaxed">
          I am a passionate **Machine Learning and AI Engineer** specializing in
          Natural Language Processing (NLP), Computer Vision (CV), and
          full-stack AI application development. My focus is on building
          intelligent, scalable, and deployable systems that solve real-world
          problems.
        </p>
        <p className="text-lg text-gray-300 font-body mb-8 leading-relaxed">
          From fine-tuning Large Language Models (LLMs) for specific tasks to
          engineering complex RAG pipelines and MLOps workflows, I thrive on the
          challenge of pushing the boundaries of AI.
        </p>
        <h3 className="text-2xl font-sans font-bold text-neon-cyan mb-4">
          Core Competencies
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-glass-bg border border-neon-cyan/30 text-gray-200"
              whileHover={{
                scale: 1.1,
                color: "#00F0FF",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)",
              }}
            >
              {skill.icon}
              <span className="font-body">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

const ExperienceCard = ({ exp, i }) => {
  const ref = useRef(null);
  const springConfig = { stiffness: 150, damping: 20 };

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 20);
    y.set(-yPct * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`p-6 rounded-lg backdrop-blur-lg bg-glass-bg border border-neon-cyan/30 shadow-holographic relative 
        ml-12 md:ml-0 ${
          i % 2 === 0
            ? "md:ml-auto md:w-[calc(50%-2rem)]"
            : "md:mr-auto md:w-[calc(50%-2rem)] md:text-right"
        }`}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX: y,
          rotateY: x,
        }}
      >
        <h3
          className={`text-xl font-sans font-bold text-neon-cyan mb-2 ${
            i % 2 === 0 ? "md:text-left" : "md:text-right"
          }`}
        >
          {exp.title}
        </h3>
        <p
          className={`text-gray-300 font-body ${
            i % 2 === 0 ? "md:text-left" : "md:text-right"
          }`}
        >
          {exp.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => (
  <SectionWrapper id="experience">
    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-center mb-16">
      <span className="text-neon-cyan">Experience</span> & Milestones
    </h2>
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 top-0 h-full w-1 bg-neon-cyan/20 rounded-full md:left-1/2 md:-translate-x-1/2"></div>

      {experiences.map((exp, i) => (
        <div key={i} className="relative mb-12">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neon-cyan shadow-holographic-lg md:left-1/2 md:-translate-x-1/2"></div>
          <ExperienceCard exp={exp} i={i} />
        </div>
      ))}
    </div>
  </SectionWrapper>
);

const Contact = () => (
  <SectionWrapper id="contact">
    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-center mb-12">
      Connect <span className="text-neon-cyan">With Me</span>
    </h2>
    <motion.div
      className="max-w-md mx-auto p-8 rounded-lg backdrop-blur-xl bg-glass-bg border-2 border-neon-cyan/50 shadow-holographic-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <p className="text-lg text-gray-300 font-body mb-8">
        I'm always open to discussing new projects, creative ideas, or
        opportunities.
      </p>
      <div className="flex justify-center flex-wrap gap-6">
        <motion.a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-gray-300 hover:text-neon-cyan"
          whileHover={{
            scale: 1.2,
            y: -5,
            color: "#00F0FF",
            filter: "drop-shadow(0 0 8px #00F0FF)",
          }}
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-gray-300 hover:text-neon-cyan"
          whileHover={{
            scale: 1.2,
            y: -5,
            color: "#00F0FF",
            filter: "drop-shadow(0 0 8px #00F0FF)",
          }}
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href={socialLinks.huggingface}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-gray-300 hover:text-neon-cyan"
          whileHover={{
            scale: 1.2,
            y: -5,
            color: "#00F0FF",
            filter: "drop-shadow(0 0 8px #00F0FF)",
          }}
        >
          <SiHuggingface />
        </motion.a>
        <motion.a
          href={socialLinks.email}
          className="text-4xl text-gray-300 hover:text-neon-cyan"
          whileHover={{
            scale: 1.2,
            y: -5,
            color: "#00F0FF",
            filter: "drop-shadow(0 0 8px #00F0FF)",
          }}
        >
          <FaEnvelope />
        </motion.a>
      </div>
    </motion.div>
  </SectionWrapper>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      {!loading && (
        <>
          <Background3DScene />
          <ParticleBackground />
          <NeonCursor />
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <About />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
