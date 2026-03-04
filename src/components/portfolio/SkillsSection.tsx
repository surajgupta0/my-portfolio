import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "PHP", "Java", "TypeScript"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Frameworks",
    skills: ["Django", "FastAPI", "Flask", "React.js", "Bootstrap"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Pinecone"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "AI/ML",
    skills: ["LLMs", "RAG", "NLP", "OpenAI API", "LSTM", "Pandas"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "CI/CD", "Linux", "Postman"],
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Architecture",
    skills: ["Microservices", "SaaS", "REST APIs", "Multi-tenant"],
    color: "from-teal-500 to-cyan-500",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary">02.</span>
            Technical Skills
            <span className="flex-1 h-px bg-muted max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl border-glow card-hover bg-card/50"
              >
                <h3 className="font-mono text-lg font-semibold mb-4 text-primary">
                  {`<${category.title}/>`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: catIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.3,
                      }}
                      className="px-3 py-1.5 text-sm font-mono bg-muted/50 text-muted-foreground rounded-full border border-border hover:border-primary hover:text-primary transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
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

export default SkillsSection;
