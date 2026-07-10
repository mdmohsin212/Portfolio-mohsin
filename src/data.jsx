import React from "react";
import {
  SiHuggingface,SiPytorch,
  SiScikitlearn,
  SiPython,
  SiFlask,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaBrain, FaChartLine, FaEye } from "react-icons/fa";

export const projects = [
  {
    name: "AutoCatalogAI",
    github: "https://github.com/mdmohsin212/AutoCatalogAI",
    live: "https://mohsin416-autocatalogai.hf.space/",
    description:
      "A CLIP-based multi-task fashion cataloging system that predicts seven product attributes and generates structured metadata, achieving 87.52% average accuracy and 98.15% Top-3 accuracy.",
    tech: [
      "PyTorch",
      "CLIP",
      "Multi-Task Learning",
      "Hugging Face",
      "Streamlit",
    ],
  },
  {
    name: "Visual Product Search",
    github: "https://github.com/mdmohsin212/Visual-Product-Search",
    live: "https://mohsin416-visual-products.hf.space",
    description:
      "A fashion retrieval system supporting image-to-image and text-to-image search across 44,065 products with a fine-tuned CLIP encoder and Milvus vector search.",
    tech: ["PyTorch", "CLIP ViT-L/14", "Milvus", "Flask", "Docker"],
  },
  {
    name: "Lawverse",
    github: "https://github.com/mdmohsin212/Lawverse",
    live: "https://mohsin416-lawverse.hf.space",
    description:
      "A RAG-based legal assistant that retrieves relevant document context before generating answers, with conversational memory, user authentication, and Dockerized Flask deployment.",
    tech: ["RAG", "LangChain", "Gemini 2.5 Flash", "Flask", "Docker"],
  },
];

export const skills = [
  {
    name: "Python",
    icon: <SiPython />,
  },
  {
    name: "PyTorch",
    icon: <SiPytorch />,
  },
  {
    name: "Hugging Face",
    icon: <SiHuggingface />,
  },
  {
    name: "CLIP / Multimodal AI",
    icon: <FaBrain />,
  },
  {
    name: "Computer Vision",
    icon: <FaEye />,
  },
  {
    name: "Scikit-learn",
    icon: <SiScikitlearn />,
  },
  {
    name: "Model Evaluation",
    icon: <FaChartLine />,
  },
  {
    name: "Flask / Streamlit",
    icon: <SiFlask />,
  },
  {
    name: "Docker",
    icon: <SiDocker />,
  },
  {
    name: "Git",
    icon: <SiGit />,
  },
];

export const experiences = [
  {
    title: "Computer Vision & Multimodal Systems",
    description:
      "Built deployable CLIP-based systems for fashion retrieval and multi-task product cataloging, covering domain fine-tuning, embedding search, and structured attribute prediction.",
  },
  {
    title: "Model Evaluation & Experimentation",
    description:
      "Designed held-out evaluations using Precision, Recall, F1, Top-K, and exact-match metrics, with baseline comparisons, error analysis, and latency benchmarking.",
  },
  {
    title: "AI Application Deployment",
    description:
      "Integrated PyTorch models into Flask and Streamlit applications and deployed reproducible services with Docker, Hugging Face Hub, and Hugging Face Spaces.",
  },
  {
    title: "Competitive Programming",
    description:
      "Solved 500+ data structures and algorithms problems across Codeforces, CodeChef, LeetCode, Coding Ninjas, and HackerRank.",
  },
];

export const socialLinks = {
  github: "https://github.com/mdmohsin212",
  linkedin: "https://www.linkedin.com/in/mohsin416/",
  huggingface: "https://huggingface.co/mohsin416",
  email: "mailto:siam.mohsin2005@gmail.com",
};

export const navLinks = [
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];