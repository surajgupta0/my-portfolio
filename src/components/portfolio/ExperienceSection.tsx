import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "GetSetHome",
    role: "Python Developer",
    location: "Mumbai",
    period: "January 2025 - Present",
    highlights: [
      "Built end-to-end SaaS platform with multi-tenant architecture, license-based feature management, and IP whitelisting",
      "Developed AI-powered sales chatbot using FastAPI and LLMs for property search, visit scheduling, and automated customer interactions",
      "Created Gmail-like email management system with AI-automated responses and tag-based template automation",
      "Integrated AI content generation for property descriptions and SEO, optimized performance using Redis caching",
    ],
  },
  {
    company: "Softaculous",
    role: "Software Developer",
    location: "Mumbai",
    period: "October 2022 - October 2023",
    highlights: [
      "Developed scalable web applications using PHP, MySQL, and JavaScript supporting 100,000+ monthly active users",
      "Optimized backend queries reducing load times by 20% and improved application efficiency by 15%",
      "Collaborated with cross-functional teams to resolve performance bottlenecks and enhance user engagement",
    ],
  },
  {
    company: "WebPerfecto",
    role: "WordPress Developer",
    location: "Mumbai",
    period: "December 2021 - October 2022",
    highlights: [
      "Built 15+ WordPress websites with custom PHP and MySQL integrations, increasing client engagement by 30%",
      "Designed responsive interfaces using HTML5, CSS3, and Bootstrap, reducing bounce rates by 20%",
      "Automated deployment workflows reducing deployment time by 25%",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary">03.</span>
            Work Experience
            <span className="flex-1 h-px bg-muted max-w-xs" />
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Tab List */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 font-mono text-sm text-left whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 transition-all ${
                    activeTab === index
                      ? "border-primary text-primary bg-primary/5"
                      : "border-muted text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h3 className="text-xl font-semibold mb-1">
                {experiences[activeTab].role}{" "}
                <span className="text-primary">
                  @ {experiences[activeTab].company}
                </span>
              </h3>

              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {experiences[activeTab].period}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {experiences[activeTab].location}
                </span>
              </div>

              <ul className="space-y-4">
                {experiences[activeTab].highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 text-muted-foreground"
                  >
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
