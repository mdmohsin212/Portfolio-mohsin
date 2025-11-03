import React from "react";
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
import { FaBrain, FaCode } from "react-icons/fa";

export const projects = [
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

export const skills = [
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

export const experiences = [
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

export const socialLinks = {
  github: "https://github.com/mdmohsin212",
  linkedin: "https://www.linkedin.com/in/mohsin416/",
  huggingface: "https://huggingface.co/mohsin416",
  email: "mailto:siam.mohsin2005@gmail.com",
};

export const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
