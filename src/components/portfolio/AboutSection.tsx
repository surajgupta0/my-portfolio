import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "2+ Years",
    description: "Full Stack Development",
  },
  {
    icon: Brain,
    title: "AI/ML",
    description: "LLMs, RAG, NLP Integration",
  },
  {
    icon: Rocket,
    title: "2,000+",
    description: "Monthly Active Users Supported",
  },
  {
    icon: Users,
    title: "15+",
    description: "Projects Delivered",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary">01.</span>
            About Me
            <span className="flex-1 h-px bg-muted max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate Full Stack Developer based in{" "}
                <span className="text-primary">Mumbai, India</span>, with a
                strong focus on building intelligent, scalable web applications.
                My journey in tech started with curiosity about how things work
                and evolved into creating solutions that make a real impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently at{" "}
                <span className="text-primary">GetSetHome</span>, I'm building
                AI-powered SaaS platforms, integrating LLMs for automated
                customer interactions, and developing sophisticated email
                management systems with AI capabilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I hold a{" "}
                <span className="text-primary">Master's in Computer Applications</span>{" "}
                from Parul University with a CGPA of 8.44/10, and I'm constantly
                learning new technologies to stay ahead in this ever-evolving
                field.
              </p>

              <div className="font-mono text-sm">
                <p className="text-muted-foreground mb-3">
                  Technologies I've been working with:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Python",
                    "Django/FastAPI",
                    "React.js",
                    "PostgreSQL",
                    "Docker",
                    "OpenAI API",
                  ].map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <span className="text-primary">▹</span>
                      <span className="text-muted-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 rounded-xl border-glow card-hover bg-card/50"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-gradient mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
