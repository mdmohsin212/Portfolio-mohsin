import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaRocket,
  FaEnvelope,
  FaBrain,
} from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { projects, skills, experiences, socialLinks } from "./data.jsx";
import { Background3DScene, ParticleBackground } from "./background.jsx";
import {
  AnimatedButton,
  ProjectCard,
  NeonCursor,
  SectionWrapper,
  Navbar,
  Footer,
  ExperienceCard,
} from "./uiComponents.jsx";

const Hero = () => (
  <section
    id="home"
    className="min-h-[82vh] flex items-center justify-center relative pt-20"
  >
    <div className="container mx-auto px-4 grid grid-cols-1 items-center gap-8">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
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
            className="border-neon-violet text-neon-violet bg-neon-violet/10"
            href="https://drive.google.com/file/d/1oKj362iii6p0zQ-KL1rd2Xl6YfzWzSim/view?usp=sharing"
            icon={<FaRocket />}
          >
            Download Resume
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
          I am a passionate{" "}
          <strong className="text-white">
            Machine Learning and AI Engineer
          </strong>{" "}
          specializing in Natural Language Processing, Computer Vision, and
          full-stack AI application development.
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
        I'm open to junior AI/ML roles, internships, research collaborations,
        and meaningful project discussions.
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
  return (
    <div className="relative">
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
    </div>
  );
}

export default App;
