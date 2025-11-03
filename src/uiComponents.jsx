import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaRocket, FaBars, FaTimes } from "react-icons/fa";
import { navLinks } from "./data.jsx"; // Import data

export const AnimatedButton = ({ children, href, icon, className = "" }) => (
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

export const ProjectCard = ({ project }) => {
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

export const NeonCursor = () => {
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

export const SectionWrapper = ({ children, id }) => {
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
      className="container mx-auto px-4 py-15 sm:py-32 relative"
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

export const Navbar = () => {
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

export const Footer = () => (
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

export const ExperienceCard = ({ exp, i }) => {
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