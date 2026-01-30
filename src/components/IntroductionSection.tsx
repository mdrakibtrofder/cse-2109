import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, History, TrendingUp, Layers } from "lucide-react";

const generations = [
  {
    era: "1940-1956",
    gen: "1st Generation",
    title: "Vacuum Tubes",
    description: "ENIAC, UNIVAC - Large machines using vacuum tubes, consuming enormous power",
    color: "bg-red-500",
  },
  {
    era: "1956-1963",
    gen: "2nd Generation",
    title: "Transistors",
    description: "Smaller, faster, more reliable. IBM 7094, CDC 1604",
    color: "bg-orange-500",
  },
  {
    era: "1964-1971",
    gen: "3rd Generation",
    title: "Integrated Circuits",
    description: "ICs on silicon chips. IBM 360 series, PDP-8",
    color: "bg-yellow-500",
  },
  {
    era: "1971-Present",
    gen: "4th Generation",
    title: "Microprocessors",
    description: "VLSI technology. Personal computers, Intel 4004",
    color: "bg-green-500",
  },
  {
    era: "Present-Future",
    gen: "5th Generation",
    title: "AI & Quantum",
    description: "Artificial Intelligence, parallel processing, quantum computing",
    color: "bg-primary",
  },
];

const classifications = [
  { type: "By Size", items: ["Supercomputers", "Mainframes", "Minicomputers", "Microcomputers", "Embedded Systems"] },
  { type: "By Purpose", items: ["General Purpose", "Special Purpose"] },
  { type: "By Data Handling", items: ["Digital", "Analog", "Hybrid"] },
];

export function IntroductionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="introduction" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section A</span>
          <h2 className="heading-2 mt-2 mb-4">Introduction to Computer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the origins, evolution, and classification of computing machines
          </p>
        </motion.div>

        {/* Invention & Brief History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <div className="bg-card rounded-2xl p-8 shadow-card card-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="heading-3">Invention</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The computer was invented through contributions of many pioneers. <strong>Charles Babbage</strong>, 
              known as the "Father of Computing," designed the Analytical Engine in 1837. The first electronic 
              general-purpose computer, <strong>ENIAC</strong>, was built in 1945 by John Mauchly and J. Presper Eckert 
              at the University of Pennsylvania.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card card-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <History className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="heading-3">Brief History</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Computing history spans from ancient abacuses (3000 BC) to modern quantum computers. 
              Key milestones include Blaise Pascal's calculator (1642), Leibniz's stepped drum (1694), 
              Babbage's designs (1830s), and the electromechanical machines of the 1930s-40s. 
              The digital era began with ENIAC (1945) and continues to evolve rapidly today.
            </p>
          </div>
        </motion.div>

        {/* Evolution & Generations Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="heading-3">Evolution & Generations of Computers</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-primary hidden md:block" />
            
            <div className="space-y-6">
              {generations.map((gen, index) => (
                <motion.div
                  key={gen.gen}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative flex gap-6 items-start"
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${gen.color} flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0`}>
                    {index + 1}
                  </div>
                  
                  {/* Content Card */}
                  <div className="flex-1 bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">{gen.era}</span>
                      <span className="text-sm text-muted-foreground">{gen.gen}</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{gen.title}</h4>
                    <p className="text-muted-foreground text-sm">{gen.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Classification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h3 className="heading-3">Classification & Types of Computers</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {classifications.map((classification, index) => (
              <motion.div
                key={classification.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <h4 className="font-semibold text-lg mb-4 text-primary">{classification.type}</h4>
                <ul className="space-y-2">
                  {classification.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
