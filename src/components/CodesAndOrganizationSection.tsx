import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Binary, Cpu, ArrowRight, Database, Layers } from "lucide-react";
import busSystemImage from "@/assets/bus-system.png";

const codes = [
  {
    name: "BCD (Binary Coded Decimal)",
    description: "Represents each decimal digit with 4 binary bits. Example: 9 = 1001",
    example: "47₁₀ = 0100 0111 (BCD)",
  },
  {
    name: "Gray Code",
    description: "Only one bit changes between consecutive values. Used in error correction and rotary encoders.",
    example: "0→1: 000→001, 1→2: 001→011",
  },
  {
    name: "ASCII",
    description: "American Standard Code for Information Interchange. 7-bit encoding for 128 characters.",
    example: "'A' = 65₁₀ = 01000001₂",
  },
  {
    name: "EBCDIC",
    description: "Extended Binary Coded Decimal Interchange Code. 8-bit encoding used by IBM mainframes.",
    example: "'A' = 193₁₀ = 11000001₂",
  },
];

const dataRepresentations = [
  { type: "Integers", desc: "Sign-magnitude, 1's complement, 2's complement" },
  { type: "Floating Point", desc: "IEEE 754 standard (single/double precision)" },
  { type: "Characters", desc: "ASCII, Unicode, UTF-8 encoding" },
  { type: "Images", desc: "Bitmap, vector graphics, compression formats" },
];

const busTypes = [
  {
    name: "Data Bus",
    color: "bg-primary",
    description: "Carries actual data between components. Width determines how much data can transfer at once (8, 16, 32, 64 bits).",
    direction: "Bidirectional",
  },
  {
    name: "Address Bus",
    color: "bg-secondary",
    description: "Carries memory addresses from CPU to memory. Width determines addressable memory space.",
    direction: "Unidirectional (CPU → Memory)",
  },
  {
    name: "Control Bus",
    color: "bg-accent",
    description: "Carries control signals like read/write, interrupt requests, clock signals.",
    direction: "Bidirectional",
  },
];

export function CodesAndOrganizationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="codes" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Sections C & D</span>
          <h2 className="heading-2 mt-2 mb-4">Codes & Computer Organization</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Data representation codes and the fundamental organization of computer systems
          </p>
        </motion.div>

        {/* Codes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <Binary className="w-6 h-6 text-primary" />
            </div>
            <h3 className="heading-3">Computer Codes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {codes.map((code, index) => (
              <motion.div
                key={code.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <h4 className="font-semibold text-lg mb-2 text-primary">{code.name}</h4>
                <p className="text-muted-foreground mb-3">{code.description}</p>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted font-mono text-sm">
                  <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
                  {code.example}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Database className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="heading-3">Data Representation</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataRepresentations.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card text-center"
              >
                <h4 className="font-semibold mb-2">{item.type}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Computer Bus Organization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <h3 className="heading-3">Computer Bus Organization</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <p className="text-muted-foreground mb-6">
                The computer bus is a communication system that transfers data between components inside a computer. 
                It's like a highway system connecting the CPU, memory, and I/O devices. The bus architecture 
                determines how efficiently data flows through the system.
              </p>

              <div className="space-y-4">
                {busTypes.map((bus, index) => (
                  <motion.div
                    key={bus.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className={`w-4 h-4 rounded-full ${bus.color} mt-1 shrink-0`} />
                    <div>
                      <h4 className="font-semibold">{bus.name}</h4>
                      <p className="text-sm text-muted-foreground">{bus.description}</p>
                      <span className="text-xs text-primary font-medium">{bus.direction}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <img
                src={busSystemImage}
                alt="Computer Bus System Architecture"
                className="w-full h-auto rounded-xl"
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Visualization of CPU, Memory, and I/O connected via bus system
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
