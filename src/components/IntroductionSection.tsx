import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Lightbulb,
  History,
  TrendingUp,
  Layers,
  Monitor,
  Cpu,
  Users,
  ClipboardList,
  Zap,
  Target,
  HardDrive,
  Repeat,
  Brain,
  Combine,
  AlertTriangle,
  BanIcon,
  PlugZap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Database,
  Share2,
  Terminal,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

/* ────── Data ────── */

const generations = [
  {
    era: "1940-1956",
    gen: "1st Generation",
    title: "Vacuum Tubes",
    description:
      "ENIAC, UNIVAC - Large machines using vacuum tubes, consuming enormous power",
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
    description:
      "Artificial Intelligence, parallel processing, quantum computing",
    color: "bg-primary",
  },
];

const classifications = [
  {
    type: "Based on Purpose",
    items: [
      {
        name: "Special-purpose",
        desc: "Designed for a specific application (also known as a dedicated computer) with instructions often permanently programmed to perform one major function, like traffic light controllers.",
      },
      {
        name: "General-purpose",
        desc: "Designed to handle a variety of tasks using the stored-program concept, where different programs can be loaded into memory to perform different functions.",
      },
    ],
  },
  {
    type: "Based on Signals",
    items: [
      {
        name: "Analog",
        desc: "Represents quantities through physical analogies (mechanical or electrical parameters) like distance, temperature, or pressure; examples include a speedometer or thermometer.",
      },
      {
        name: "Digital",
        desc: "These computers use internal signaling to process data using number systems (usually binary) to represent information. Most modern computers are digital.",
      },
    ],
  },
  {
    type: "Based on Capacity",
    items: [
      {
        name: "Supercomputers",
        desc: "The fastest and most powerful type of computer. They are used for complex scientific simulations, weather forecasting, and nuclear research.",
      },
      {
        name: "Mainframes",
        desc: "Large and expensive systems designed to handle massive data processing for organizations like banks and airlines.",
      },
      {
        name: "Minicomputers",
        desc: "Mid-range, multi-user systems that are smaller and less powerful than mainframes but more capable than personal computers.",
      },
      {
        name: "Microcomputers",
        desc: "Personal computers (desktops, laptops) designed for individual use. They are the most common type of computer today.",
      },
    ],
  },
];

const importanceCards = [
  {
    icon: Database,
    title: "Volume of data",
    description: "Computers are suited to handling large volumes of data efficiently.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "They ensure a high degree of accuracy and reliable consistency.",
  },
  {
    icon: Repeat,
    title: "Repetitiveness",
    description: "Processing cycles that repeat time and time again are ideally suited to computers.",
  },
  {
    icon: Brain,
    title: "Complexity",
    description: "Computers can perform complex calculations and provide answers after running the program.",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "They work at very high speeds, allowing them to respond quickly to given situations.",
  },
  {
    icon: Share2,
    title: "Common data",
    description: "One item of data can be used for different computer procedures.",
  },
];

const limitationCards = [
  {
    icon: Brain,
    title: "No Common Sense / Zero IQ",
    description:
      "A computer cannot think or reason on its own. It has zero intelligence — it only follows instructions.",
  },
  {
    icon: BanIcon,
    title: "No Emotions",
    description:
      "Cannot feel, judge, or make value-based decisions. It treats all data equally without moral consideration.",
  },
  {
    icon: PlugZap,
    title: "Dependence on Power & Programming",
    description:
      "Completely dependent on electricity and human-written programs. Without either, it is useless.",
  },
  {
    icon: AlertTriangle,
    title: "Cannot Adjust Like Humans",
    description:
      "Cannot adapt to unexpected situations. If input is wrong, output is wrong — the GIGO principle.",
  },
];

const computerComponents = [
  {
    icon: Monitor,
    title: "Hardware",
    color: "text-primary",
    bg: "bg-primary/10",
    description: "Refers to machines or physical equipment that performs the basic functions of the data processing cycle, such as the computer itself and its connected devices.",
    examples: [
      "Motherboard",
      "CPU (Processor)",
      "RAM",
      "Hard Disk / SSD",
      "Peripherals (Monitor, Keyboard)",
    ],
  },
  {
    icon: Terminal,
    title: "Software",
    color: "text-secondary",
    bg: "bg-secondary/10",
    description: "These are the programs (sequences of instructions) that direct the computer to perform tasks, categorized into system software and application software.",
    examples: [
      "System Software (OS, Drivers)",
      "Application Software",
      "Utility Programs",
    ],
  },
  {
    icon: Users,
    title: "Humanware",
    color: "text-accent",
    bg: "bg-accent/10",
    description: "Refers to the people who design, program, and operate the computer, such as systems analysts, programmers, and computer operators.",
    examples: [
      "Systems Analysts",
      "Programmers",
      "Computer Operators",
    ],
  },
  {
    icon: ClipboardList,
    title: "Operational Procedures",
    color: "text-primary",
    bg: "bg-primary/10",
    description: "An extensive and clearly defined set of procedures for performing essential functions like entering data, processing jobs, and handling malfunctions.",
    examples: [
      "Data Entry Procedures",
      "Processing Workflows",
      "Malfunction Handling",
    ],
  },
];

/* ────── Sub-components ────── */

function IPOCycle() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const stages = [
    {
      key: "input",
      label: "Input",
      color: "bg-primary",
      details:
        "Data and instructions are entered into the computer via input devices such as keyboard, mouse, scanner, microphone, etc. Raw data is fed for processing.",
    },
    {
      key: "processing",
      label: "Processing",
      color: "bg-secondary",
      details:
        "The CPU processes input data by performing arithmetic, logic, and control operations following the stored program instructions. ALU and Control Unit work together.",
    },
    {
      key: "output",
      label: "Output",
      color: "bg-accent",
      details:
        "Processed results are delivered to the user through output devices — monitor (display), printer (hard copy), speakers (audio), etc.",
    },
  ];

  return (
    <div>
      {/* Flow diagram */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-8">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setExpanded(expanded === stage.key ? null : stage.key)
              }
              className={`${stage.color} text-white font-bold px-8 py-5 rounded-2xl shadow-lg cursor-pointer transition-all ${expanded === stage.key ? "ring-4 ring-ring" : ""
                }`}
            >
              {stage.label}
            </motion.button>
            {index < stages.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="hidden sm:flex items-center mx-2"
              >
                <div className="w-12 h-0.5 bg-muted-foreground/40" />
                <ArrowRight className="w-5 h-5 text-muted-foreground/60 -ml-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key={expanded}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-muted rounded-xl p-6 text-center max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                {stages.find((s) => s.key === expanded)?.details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Juice analogy */}
      <div className="mt-6 bg-accent/10 border border-accent/20 rounded-xl p-5 max-w-2xl mx-auto text-center">
        <p className="text-sm font-semibold text-accent mb-1">
          🍊 Making Juice Analogy
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Input:</strong> Fruits (raw data) →{" "}
          <strong>Processing:</strong> Blending (CPU operations) →{" "}
          <strong>Output:</strong> Juice (processed result)
        </p>
      </div>
    </div>
  );
}

/* ────── Main Section ────── */

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
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Section A
          </span>
          <h2 className="heading-2 mt-2 mb-4">Introduction to Computer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the origins, evolution, and classification of computing
            machines
          </p>
        </motion.div>

        {/* ──── 1.1 What is a Computer? ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            1.1 What is a Computer?
          </h3>

          <div className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-primary mb-4">
            <p className="text-lg leading-relaxed text-foreground">
              "A computer is an{" "}
              <strong>electronic machine</strong> that{" "}
              <strong>stores, retrieves, and processes data</strong>. It cannot
              think or reason on its own; it can only carry out{" "}
              <strong>instructions</strong> given to it by humans."
            </p>
          </div>


        </motion.div>

        {/* ──── 1.2 What is a Program? ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Terminal className="w-6 h-6 text-orange-500" />
            </div>
            1.2 What is a Program?
          </h3>

          <div className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-orange-500">
            <p className="text-lg leading-relaxed text-foreground">
              "A <strong>program</strong> is a set of instructions that directs a
              computer's actions. It can also be defined as a{" "}
              <strong>sequence of instructions</strong> which directs a computer
              to perform certain functions."
            </p>
          </div>
        </motion.div>

        {/* ──── 1.3 Basic Functions — IPO Cycle ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <ArrowRight className="w-6 h-6 text-secondary" />
            </div>
            1.3 Basic Functions of Computer (IPO Cycle)
          </h3>
          <IPOCycle />
        </motion.div>

        {/* ──── 1.4 Components of a Computer System ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            1.4 Components of a Computer System
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {computerComponents.map((comp, index) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 rounded-xl ${comp.bg}`}>
                    <comp.icon className={`w-6 h-6 ${comp.color}`} />
                  </div>
                  <h4 className="font-semibold text-lg">{comp.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {comp.description}
                </p>
                <ul className="space-y-1.5">
                  {comp.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ──── 1.5 Importance of Computers ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            1.5 Importance of Computers
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importanceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
                className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all card-3d"
              >
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{card.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ──── 1.5 Limitations of Computers ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            1.6 Limitations of Computers
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {limitationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.06 }}
                className="bg-card rounded-2xl p-5 shadow-card border-l-4 border-destructive/40"
              >
                <div className="flex items-center gap-2 mb-2">
                  <card.icon className="w-5 h-5 text-destructive" />
                  <h4 className="font-semibold">{card.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>


        </motion.div>

        {/* ──── Invention & Brief History ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
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
              The computer was invented through contributions of many pioneers.{" "}
              <strong>Charles Babbage</strong>, known as the "Father of
              Computing," designed the Analytical Engine in 1837. The first
              electronic general-purpose computer, <strong>ENIAC</strong>, was
              built in 1945 by John Mauchly and J. Presper Eckert at the
              University of Pennsylvania.
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
              Computing history spans from ancient abacuses (3000 BC) to modern
              quantum computers. Key milestones include Blaise Pascal's calculator
              (1642), Leibniz's stepped drum (1694), Babbage's designs (1830s),
              and the electromechanical machines of the 1930s-40s. The digital era
              began with ENIAC (1945) and continues to evolve rapidly today.
            </p>
          </div>
        </motion.div>

        {/* ──── Evolution & Generations Timeline ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="heading-3">Evolution & Generations of Computers</h3>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-primary hidden md:block" />

            <div className="space-y-6">
              {generations.map((gen, index) => (
                <motion.div
                  key={gen.gen}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                  className="relative flex gap-6 items-start"
                >
                  <div
                    className={`relative z-10 w-16 h-16 rounded-2xl ${gen.color} flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        {gen.era}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {gen.gen}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{gen.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {gen.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ──── 1.7 Classification ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h3 className="heading-3">1.7 Classification & Types of Computers</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {classifications.map((classification, index) => (
              <motion.div
                key={classification.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <h4 className="font-semibold text-lg mb-4 text-primary">
                  {classification.type}
                </h4>
                <div className="space-y-3">
                  {classification.items.map((item) => (
                    <div key={item.name} className="p-3 rounded-lg bg-muted">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
