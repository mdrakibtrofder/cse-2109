import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Layers, Settings, Users, FileCode, Shield } from "lucide-react";

const softwareCategories = [
  {
    name: "System Software",
    icon: Settings,
    description: "Controls computer hardware and provides platform for application software",
    examples: ["Operating Systems (Windows, macOS, Linux)", "Device Drivers", "Utility Programs", "Language Translators"],
    color: "bg-primary",
  },
  {
    name: "Application Software",
    icon: FileCode,
    description: "Programs designed for end-users to perform specific tasks",
    examples: ["Word Processors", "Spreadsheets", "Web Browsers", "Games", "Media Players"],
    color: "bg-secondary",
  },
];

const osComponents = [
  { name: "Kernel", desc: "Core component managing memory, processes, and hardware" },
  { name: "File System", desc: "Organizes and manages data storage on disk" },
  { name: "Process Manager", desc: "Handles process creation, scheduling, and termination" },
  { name: "Memory Manager", desc: "Allocates and deallocates memory for programs" },
  { name: "I/O Manager", desc: "Manages input/output device communications" },
  { name: "Security Manager", desc: "Controls access permissions and authentication" },
];

const developmentSteps = [
  { step: 1, name: "Problem Analysis", desc: "Understand requirements and define objectives" },
  { step: 2, name: "Algorithm Design", desc: "Create step-by-step solution logic" },
  { step: 3, name: "Coding", desc: "Write source code in chosen programming language" },
  { step: 4, name: "Testing", desc: "Find and fix bugs through various testing methods" },
  { step: 5, name: "Documentation", desc: "Create user manuals and technical documentation" },
  { step: 6, name: "Maintenance", desc: "Update and improve software over time" },
];

const softwareTypes = [
  { name: "Firmware", desc: "Software embedded in hardware ROM (BIOS, device firmware)", icon: "🔧" },
  { name: "Humanware", desc: "Human element in computing - users and operators", icon: "👤" },
  { name: "Shareware", desc: "Try-before-buy software with limited features/time", icon: "⏱️" },
  { name: "Freeware", desc: "Free to use software, may not be open source", icon: "🆓" },
  { name: "Open Source", desc: "Source code freely available for modification", icon: "📖" },
  { name: "Proprietary", desc: "Licensed software with restricted access to source", icon: "🔒" },
];

export function SoftwareSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="software" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section I</span>
          <h2 className="heading-2 mt-2 mb-4">Computer Software</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The programs and instructions that tell hardware what to do
          </p>
        </motion.div>

        {/* Hardware vs Software */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl p-8 shadow-card mb-12"
        >
          <h3 className="heading-3 mb-4 text-center">Hardware vs Software Relationship</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-xl bg-muted">
              <Code className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">Software</h4>
              <p className="text-sm text-muted-foreground">
                Intangible programs and instructions. Can be modified and updated. 
                Tells hardware what operations to perform.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-muted">
              <Settings className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h4 className="font-semibold mb-2">Hardware</h4>
              <p className="text-sm text-muted-foreground">
                Physical, tangible components. Cannot work without software. 
                Executes instructions provided by software.
              </p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-6">
            <strong>Interdependence:</strong> Hardware without software is useless metal; software without hardware cannot execute.
          </p>
        </motion.div>

        {/* Software Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {softwareCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${category.color}/10`}>
                  <category.icon className={`w-6 h-6 ${category.color === 'bg-primary' ? 'text-primary' : 'text-secondary'}`} />
                </div>
                <h4 className="font-semibold text-lg">{category.name}</h4>
              </div>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.examples.map((example) => (
                  <span key={example} className="px-3 py-1 rounded-full bg-muted text-sm">
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Operating System Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="heading-3 mb-6 text-center">Operating System Components</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {osComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all"
              >
                <h4 className="font-semibold text-primary mb-1">{component.name}</h4>
                <p className="text-sm text-muted-foreground">{component.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Software Development Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="heading-3 mb-6 text-center">Software Development Steps</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {developmentSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{step.name}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Software Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="heading-3 mb-6 text-center">Software Classifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwareTypes.map((type) => (
              <div key={type.name} className="bg-card rounded-xl p-4 shadow-card flex items-start gap-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <h4 className="font-semibold">{type.name}</h4>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
