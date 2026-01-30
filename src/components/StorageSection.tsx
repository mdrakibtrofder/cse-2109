import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HardDrive, Database, Layers } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import hddImage from "@/assets/devices/hdd.png";
import ssdImage from "@/assets/devices/ssd.png";
import usbDriveImage from "@/assets/devices/usb-drive.png";
import ramImage from "@/assets/devices/ram.png";

const storageDevices = [
  {
    name: "Hard Disk Drive (HDD)",
    image: hddImage,
    shortDescription: "Magnetic storage device with spinning platters for large capacity data storage.",
    howItWorks: "Read/write heads float on air cushion above rotating platters. Magnetic fields align particles on disk surface to represent binary data. Platters spin at 5400-7200 RPM.",
    functionalities: [
      "High Capacity (TB)",
      "Non-volatile Storage",
      "Sequential Access",
      "Cost-effective",
    ],
    icon: HardDrive,
  },
  {
    name: "Solid State Drive (SSD)",
    image: ssdImage,
    shortDescription: "Flash-based storage with no moving parts for faster, more reliable performance.",
    howItWorks: "Uses NAND flash memory cells that trap electrons in floating gates. Controller manages wear leveling and garbage collection. No mechanical parts mean faster access times.",
    functionalities: [
      "Fast Read/Write",
      "Low Latency",
      "Shock Resistant",
      "Silent Operation",
    ],
    icon: HardDrive,
  },
  {
    name: "USB Flash Drive",
    image: usbDriveImage,
    shortDescription: "Portable flash memory storage device for file transfer between computers.",
    howItWorks: "Contains NAND flash memory and USB controller. Plug-and-play connection provides power and data transfer. File system allows reading/writing like a hard drive.",
    functionalities: [
      "Portable Storage",
      "Quick File Transfer",
      "Bootable Media",
      "Cross-platform",
    ],
    icon: Database,
  },
  {
    name: "Cache Memory",
    image: ramImage,
    shortDescription: "Ultra-fast SRAM between CPU and main memory to reduce access latency.",
    howItWorks: "Stores frequently accessed data and instructions. L1 cache is fastest (in CPU), L2 is larger, L3 is shared. Uses locality of reference principle for hit/miss optimization.",
    functionalities: [
      "Speed Bridging",
      "Instruction Caching",
      "Data Prefetching",
      "Multi-level Hierarchy",
    ],
    icon: Layers,
  },
];

const memoryTypes = [
  {
    category: "Primary Memory",
    types: [
      { name: "RAM (DRAM)", desc: "Dynamic RAM - needs refresh, used for main memory" },
      { name: "ROM", desc: "Read-Only Memory - permanent, stores BIOS/firmware" },
      { name: "SRAM", desc: "Static RAM - faster, used in cache, no refresh needed" },
      { name: "Cache", desc: "High-speed buffer between CPU and RAM" },
    ],
  },
  {
    category: "Secondary Memory",
    types: [
      { name: "Hard Disk (HDD)", desc: "Magnetic platters, high capacity, slower" },
      { name: "SSD", desc: "Flash memory, fast, reliable, expensive per GB" },
      { name: "Optical Discs", desc: "CD, DVD, Blu-ray - laser read/write technology" },
      { name: "Magnetic Tape", desc: "Sequential access, archival/backup storage" },
    ],
  },
];

const storageHierarchy = [
  { level: "Registers", speed: "< 1 ns", size: "< 1 KB", cost: "$$$$" },
  { level: "L1 Cache", speed: "~1 ns", size: "32-64 KB", cost: "$$$" },
  { level: "L2 Cache", speed: "~4 ns", size: "256 KB-1 MB", cost: "$$$" },
  { level: "L3 Cache", speed: "~10 ns", size: "4-32 MB", cost: "$$" },
  { level: "RAM", speed: "~100 ns", size: "8-64 GB", cost: "$" },
  { level: "SSD", speed: "~100 μs", size: "256 GB-4 TB", cost: "$" },
  { level: "HDD", speed: "~10 ms", size: "1-20 TB", cost: "¢" },
];

export function StorageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="storage" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section H</span>
          <h2 className="heading-2 mt-2 mb-4">Storage Devices</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Memory systems and storage hierarchies in modern computers
          </p>
        </motion.div>

        {/* Storage Device Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {storageDevices.map((device, index) => (
            <DeviceCard key={device.name} {...device} delay={index * 0.1} />
          ))}
        </div>

        {/* Memory Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-8 text-center">Memory Types & Purposes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {memoryTypes.map((category) => (
              <div key={category.category} className="bg-card rounded-2xl p-6 shadow-card">
                <h4 className="font-semibold text-lg mb-4 text-primary">{category.category}</h4>
                <div className="space-y-3">
                  {category.types.map((type) => (
                    <div key={type.name} className="p-3 rounded-lg bg-muted">
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Storage Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-8 text-center">Storage Hierarchy</h3>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2">
              {storageHierarchy.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                  className="relative"
                  style={{
                    marginLeft: `${index * 1.5}%`,
                    marginRight: `${index * 1.5}%`,
                  }}
                >
                  <div
                    className="flex items-center justify-between p-4 rounded-lg transition-colors"
                    style={{
                      background: `linear-gradient(90deg, hsl(217, 91%, ${60 - index * 6}%) 0%, hsl(174, 62%, ${55 - index * 5}%) 100%)`,
                    }}
                  >
                    <span className="font-semibold text-white">{level.level}</span>
                    <div className="flex gap-4 text-sm text-white/90">
                      <span>⚡ {level.speed}</span>
                      <span>📦 {level.size}</span>
                      <span>💰 {level.cost}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              ⬆️ Faster, Smaller, More Expensive | ⬇️ Slower, Larger, Less Expensive
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
