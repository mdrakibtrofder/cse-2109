import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, CircuitBoard, MemoryStick, Zap } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import cpuImage from "@/assets/devices/cpu.png";
import ramImage from "@/assets/devices/ram.png";
import motherboardImage from "@/assets/devices/motherboard.png";
import psuImage from "@/assets/devices/psu.png";

const hardwareComponents = [
  {
    name: "CPU (Central Processing Unit)",
    image: cpuImage,
    shortDescription: "The brain of the computer that executes instructions and processes data.",
    howItWorks: "Fetches instructions from memory, decodes them, and executes operations using ALU and control unit. Modern CPUs use pipelining and multiple cores for parallel processing.",
    functionalities: [
      "Arithmetic & Logic Operations",
      "Instruction Execution",
      "Process Scheduling",
      "Cache Management",
    ],
    icon: Cpu,
  },
  {
    name: "RAM (Random Access Memory)",
    image: ramImage,
    shortDescription: "Volatile primary memory for temporary data storage during program execution.",
    howItWorks: "Stores data in capacitors (DRAM) or flip-flops (SRAM). CPU accesses any location directly without sequential reading. Data is lost when power is off.",
    functionalities: [
      "Fast Data Access",
      "Program Loading",
      "Working Memory",
      "Virtual Memory Support",
    ],
    icon: MemoryStick,
  },
  {
    name: "Motherboard",
    image: motherboardImage,
    shortDescription: "Main circuit board connecting all computer components together.",
    howItWorks: "Provides electrical connections through buses and power distribution. Contains chipset that controls data flow between CPU, memory, and peripherals.",
    functionalities: [
      "Component Integration",
      "Power Distribution",
      "BIOS/UEFI Hosting",
      "Expansion Slots",
    ],
    icon: CircuitBoard,
  },
  {
    name: "Power Supply Unit (PSU)",
    image: psuImage,
    shortDescription: "Converts AC power from outlet to regulated DC power for components.",
    howItWorks: "Uses transformers and rectifiers to convert 120V/240V AC to stable DC voltages (3.3V, 5V, 12V). Modern PSUs use switching regulators for efficiency.",
    functionalities: [
      "Voltage Regulation",
      "Power Protection",
      "Efficiency Rating (80+)",
      "Modular Cabling",
    ],
    icon: Zap,
  },
];

const registers = [
  { name: "Accumulator (AC)", purpose: "Stores intermediate arithmetic/logic results" },
  { name: "Program Counter (PC)", purpose: "Holds address of next instruction to execute" },
  { name: "Instruction Register (IR)", purpose: "Contains the current instruction being decoded" },
  { name: "Memory Address Register (MAR)", purpose: "Holds memory address for read/write operations" },
  { name: "Memory Data Register (MDR)", purpose: "Contains data to be written or read from memory" },
  { name: "Stack Pointer (SP)", purpose: "Points to top of the stack in memory" },
];

export function HardwareSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hardware" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section E</span>
          <h2 className="heading-2 mt-2 mb-4">Computer Hardware</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Physical components that make up a computer system
          </p>
        </motion.div>

        {/* Hardware Device Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {hardwareComponents.map((component, index) => (
            <DeviceCard
              key={component.name}
              {...component}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Registers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-6 text-center">CPU Registers</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registers.map((reg, index) => (
              <motion.div
                key={reg.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all"
              >
                <h4 className="font-mono font-semibold text-primary mb-1">{reg.name}</h4>
                <p className="text-sm text-muted-foreground">{reg.purpose}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Processor Speed Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8"
        >
          <h3 className="heading-3 mb-4 text-center">Processor Speed</h3>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            CPU speed is measured in <strong>Hertz (Hz)</strong> - cycles per second. Modern processors operate 
            in <strong>GHz (billions of cycles/second)</strong>. Speed depends on clock rate, architecture efficiency, 
            cache size, number of cores, and instruction set complexity. A 3.5 GHz processor can execute 
            3.5 billion cycles per second.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
