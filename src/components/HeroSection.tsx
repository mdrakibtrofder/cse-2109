import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Cpu, Binary } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-computer.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Computer Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] p-4 glass-card rounded-2xl shadow-card"
        >
          <Binary className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] p-4 glass-card rounded-2xl shadow-card"
        >
          <Cpu className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 25, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[20%] p-4 glass-card rounded-2xl shadow-card"
        >
          <BookOpen className="w-8 h-8 text-accent" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            CSE 2109 • Computer Fundamentals
          </span>
          
          <h1 className="heading-1 mb-6 max-w-4xl mx-auto text-balance">
            Master the{" "}
            <span className="gradient-text">Fundamentals</span>{" "}
            of Computer Science
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            An interactive learning experience covering computer history, architecture, 
            number systems, hardware components, and modern networking concepts.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="shadow-glow">
              <a href="#introduction">Start Learning</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#visualization">Explore Components</a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <a href="#introduction" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowDown className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
