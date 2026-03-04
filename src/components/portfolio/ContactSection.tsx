import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-primary mb-4">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I'm currently looking for new opportunities and my inbox is always
            open. Whether you have a project in mind, a question, or just want
            to say hi, I'll do my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a
              href="mailto:kumar.suraj9918@gmail.com"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-mono text-sm">kumar.suraj9918@gmail.com</span>
            </a>
            <a
              href="tel:+918433573748"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-mono text-sm">+91-8433573748</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-12">
            <MapPin className="w-5 h-5" />
            <span className="font-mono text-sm">Mumbai, Maharashtra, India</span>
          </div>

          <motion.a
            href="mailto:kumar.suraj9918@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 border border-primary text-primary font-mono rounded-lg hover:bg-primary/20 transition-all glow-primary"
          >
            <Send className="w-5 h-5" />
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
