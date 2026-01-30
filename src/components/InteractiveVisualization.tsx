import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, Cpu, HardDrive, Monitor, Keyboard, Mouse, MemoryStick, CircuitBoard, Zap, Fan, Usb, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

import computerImage from "@/assets/computer-3d.png";

interface ComponentInfo {
  id: string;
  name: string;
  icon: typeof Cpu;
  position: { x: string; y: string };
  description: string;
  howItWorks: string;
  keyFeatures: string[];
}

const components: ComponentInfo[] = [
  {
    id: "cpu",
    name: "CPU (Processor)",
    icon: Cpu,
    position: { x: "45%", y: "35%" },
    description: "The brain of the computer that executes all instructions and processes data.",
    howItWorks: "Fetches instructions from memory, decodes them using control unit, and executes using ALU. Modern CPUs have multiple cores for parallel processing.",
    keyFeatures: ["Arithmetic operations", "Logic decisions", "Process management", "Multi-threading"],
  },
  {
    id: "ram",
    name: "RAM Memory",
    icon: MemoryStick,
    position: { x: "60%", y: "28%" },
    description: "Volatile working memory that stores data currently in use for quick access.",
    howItWorks: "Stores data in capacitors that need constant refreshing. Direct access means any location can be read equally fast.",
    keyFeatures: ["Fast access speed", "Temporary storage", "Program loading", "Multi-tasking support"],
  },
  {
    id: "motherboard",
    name: "Motherboard",
    icon: CircuitBoard,
    position: { x: "50%", y: "50%" },
    description: "Main circuit board connecting all components together through buses.",
    howItWorks: "Provides electrical pathways (buses) for data, addresses, and control signals. Houses chipset that manages communication.",
    keyFeatures: ["Component integration", "Power distribution", "BIOS/UEFI", "Expansion slots"],
  },
  {
    id: "storage",
    name: "Storage (HDD/SSD)",
    icon: HardDrive,
    position: { x: "35%", y: "55%" },
    description: "Non-volatile storage for permanent data, programs, and operating system.",
    howItWorks: "HDD: Magnetic platters with spinning heads. SSD: Flash memory cells storing electrons in gates.",
    keyFeatures: ["Permanent storage", "Large capacity", "Boot device", "File storage"],
  },
  {
    id: "psu",
    name: "Power Supply",
    icon: Zap,
    position: { x: "25%", y: "40%" },
    description: "Converts AC power from outlet to regulated DC power for all components.",
    howItWorks: "Transforms 110/220V AC to stable 3.3V, 5V, and 12V DC using rectifiers and regulators.",
    keyFeatures: ["Voltage regulation", "Power protection", "Efficiency rating", "Multiple rails"],
  },
  {
    id: "monitor",
    name: "Monitor (Display)",
    icon: Monitor,
    position: { x: "15%", y: "25%" },
    description: "Visual output device displaying text, graphics, and video from the computer.",
    howItWorks: "LCD/OLED pixels controlled by transistors change color/brightness to form images at high refresh rates.",
    keyFeatures: ["Visual output", "High resolution", "Color accuracy", "Multiple inputs"],
  },
  {
    id: "keyboard",
    name: "Keyboard",
    icon: Keyboard,
    position: { x: "40%", y: "80%" },
    description: "Primary input device for entering text, commands, and controlling applications.",
    howItWorks: "Key presses complete circuits. Microcontroller scans key matrix and sends scan codes to CPU.",
    keyFeatures: ["Text input", "Shortcuts", "Function keys", "Gaming macros"],
  },
  {
    id: "mouse",
    name: "Mouse",
    icon: Mouse,
    position: { x: "60%", y: "78%" },
    description: "Pointing device for GUI navigation and on-screen element interaction.",
    howItWorks: "Optical sensor captures surface images. DSP calculates movement and sends position data.",
    keyFeatures: ["Cursor control", "Click actions", "Scroll wheel", "Drag & drop"],
  },
  {
    id: "cooling",
    name: "Cooling System",
    icon: Fan,
    position: { x: "75%", y: "45%" },
    description: "Fans and heatsinks that remove excess heat from CPU and other components.",
    howItWorks: "Heatsinks absorb heat through conduction. Fans move air to dissipate heat through convection.",
    keyFeatures: ["Temperature control", "Noise management", "CPU protection", "Airflow design"],
  },
  {
    id: "ports",
    name: "I/O Ports",
    icon: Usb,
    position: { x: "80%", y: "65%" },
    description: "Connectors for peripherals like USB devices, displays, and network cables.",
    howItWorks: "Standardized connectors provide data and power transfer. Controllers manage device communication.",
    keyFeatures: ["USB connectivity", "Display output", "Audio jacks", "Network port"],
  },
  {
    id: "optical",
    name: "Optical Drive",
    icon: Disc,
    position: { x: "28%", y: "30%" },
    description: "Reads/writes data from optical discs like CDs, DVDs, and Blu-rays.",
    howItWorks: "Laser reads pits and lands on disc surface. Reflected light is converted to digital data.",
    keyFeatures: ["CD/DVD reading", "Media playback", "Data backup", "Software installation"],
  },
];

export function InteractiveVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);

  return (
    <section id="visualization" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Interactive Learning</span>
          <h2 className="heading-2 mt-2 mb-4">Computer Components Explorer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any component to learn more about its function and how it works
          </p>
        </motion.div>

        {/* Interactive Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Computer Image */}
          <div className="relative bg-card rounded-3xl p-8 shadow-card overflow-hidden">
            <img
              src={computerImage}
              alt="Computer System"
              className="w-full h-auto max-h-[600px] object-contain mx-auto"
            />

            {/* Clickable Hotspots */}
            {components.map((component, index) => (
              <motion.button
                key={component.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedComponent(component)}
                className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all cursor-pointer group ${
                  selectedComponent?.id === component.id
                    ? "bg-primary text-primary-foreground scale-110 shadow-glow"
                    : "bg-card/90 hover:bg-primary hover:text-primary-foreground shadow-card hover:shadow-glow"
                }`}
                style={{ left: component.position.x, top: component.position.y }}
                title={component.name}
              >
                <component.icon className="w-5 h-5" />
                
                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />
                
                {/* Label tooltip */}
                <span className="absolute bottom-full mb-2 px-2 py-1 rounded bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {component.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Component Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                  selectedComponent?.id === component.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted shadow-sm"
                }`}
              >
                <component.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{component.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setSelectedComponent(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-card rounded-2xl p-8 shadow-card-hover max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setSelectedComponent(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10">
                    <selectedComponent.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="heading-3">{selectedComponent.name}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{selectedComponent.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-primary uppercase tracking-wider mb-2">
                    How It Works
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedComponent.howItWorks}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-secondary uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.keyFeatures.map((feature) => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-muted text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
