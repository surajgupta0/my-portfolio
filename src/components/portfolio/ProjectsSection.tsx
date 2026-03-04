import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "ChatyZone: AI Document Assistant",
    description:
      "Intelligent document interaction platform with AI-powered Q&A and OCR processing. Features semantic search using vector embeddings achieving 95% text extraction accuracy.",
    tech: ["FastAPI", "React.js", "PostgreSQL", "Pinecone", "OpenAI"],
    highlights: ["40% faster document review", "100+ concurrent users"],
    github: "https://github.com/surajgupta0",
    featured: true,
  },
  {
    title: "AI-Powered Sales Chatbot",
    description:
      "Built for GetSetHome - a sophisticated chatbot using FastAPI and LLMs for property search, visit scheduling, and automated customer interactions.",
    tech: ["FastAPI", "LLMs", "Redis", "PostgreSQL"],
    highlights: ["Automated responses", "Property recommendations"],
    featured: true,
  },
  {
    title: "Stock Market Analyzer",
    description:
      "Real-time stock analyzer with LSTM models predicting prices with 75% accuracy. Interactive charts with AJAX for seamless real-time vs predicted price comparisons.",
    tech: ["Django", "Python", "LSTM", "Machine Learning"],
    highlights: ["75% prediction accuracy", "Real-time charts"],
    github: "https://github.com/surajgupta0",
    featured: true,
  },
  {
    title: "Movie Recommendation System",
    description:
      "Personalized recommendation system using collaborative filtering tested by 100+ users. Integrated API for dynamic movie posters and ratings.",
    tech: ["Python", "Streamlit", "Pandas", "Cosine Similarity"],
    github: "https://github.com/surajgupta0",
  },
  {
    title: "Gmail-like Email System",
    description:
      "Email management system with AI-automated responses, round-robin API key management, and tag-based template automation.",
    tech: ["Python", "FastAPI", "Redis", "OpenAI"],
  },
  {
    title: "SaaS Multi-Tenant Platform",
    description:
      "End-to-end SaaS platform with multi-tenant architecture, license-based feature management, and IP whitelisting for enhanced security.",
    tech: ["Django", "PostgreSQL", "Docker", "Redis"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary">04.</span>
            Featured Projects
            <span className="flex-1 h-px bg-muted max-w-xs" />
          </h2>

          {/* Featured Projects */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                <div
                  className={`md:col-span-7 ${
                    index % 2 === 1 ? "md:col-start-6" : ""
                  }`}
                >
                  <div className="relative rounded-lg overflow-hidden border-glow bg-gradient-to-br from-primary/10 to-secondary/10 aspect-video flex items-center justify-center">
                    <div className="text-6xl text-primary/30 font-mono font-bold">
                      {`0${index + 1}`}
                    </div>
                  </div>
                </div>

                <div
                  className={`md:col-span-6 md:absolute ${
                    index % 2 === 1
                      ? "left-0 text-left"
                      : "right-0 text-right"
                  }`}
                >
                  <p className="font-mono text-primary text-sm mb-2">
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <div className="p-6 rounded-lg bg-card border border-border shadow-xl mb-4">
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    {project.highlights && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex flex-wrap gap-3 font-mono text-xs text-muted-foreground mb-4 ${
                      index % 2 === 1 ? "justify-start" : "justify-end"
                    }`}
                  >
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? "justify-start" : "justify-end"
                    }`}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <h3 className="text-xl font-semibold text-center mb-8">
            Other Noteworthy Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="p-6 rounded-lg bg-card border border-border card-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
