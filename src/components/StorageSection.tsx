import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HardDrive, Database, Layers, Disc, Save } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import hddImage from "@/assets/devices/hdd.png";
import ssdImage from "@/assets/devices/ssd.png";
import usbDriveImage from "@/assets/devices/usb-drive.png";
import ramImage from "@/assets/devices/ram.png";
import opticalDiscImage from "@/assets/devices/optical-disc.png";
import magneticTapeImage from "@/assets/devices/magnetic-tape.png";

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
    name: "RAM (Random Access Memory)",
    image: ramImage,
    shortDescription: "Volatile primary memory for temporary data storage during program execution.",
    howItWorks: "DRAM stores data in capacitors that need constant refresh. SRAM uses flip-flops for faster, stable storage. CPU accesses any location directly without sequential reading.",
    functionalities: [
      "Fast Data Access",
      "Program Loading",
      "Working Memory",
      "Virtual Memory Support",
    ],
    icon: Layers,
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
  {
    name: "Optical Disc (CD/DVD/Blu-ray)",
    image: opticalDiscImage,
    shortDescription: "Removable media using laser technology to read/write data on reflective surface.",
    howItWorks: "Laser reads pits and lands on disc surface. Light reflection differences create binary patterns. CD uses 780nm laser, DVD 650nm, Blu-ray 405nm for higher density.",
    functionalities: [
      "Media Distribution",
      "Data Archival",
      "Movie Playback",
      "Software Installation",
    ],
    icon: Disc,
  },
  {
    name: "Magnetic Tape",
    image: magneticTapeImage,
    shortDescription: "Sequential access storage medium for long-term archival and backup purposes.",
    howItWorks: "Magnetic tape winds between reels. Read/write head magnetizes tape surface in patterns. Sequential access means reading data in order from start to end.",
    functionalities: [
      "Backup Storage",
      "Archival Storage",
      "High Capacity",
      "Low Cost per GB",
    ],
    icon: Save,
  },
  {
    name: "ROM (Read-Only Memory)",
    image: ramImage,
    shortDescription: "Non-volatile memory that retains data permanently, storing firmware and BIOS.",
    howItWorks: "Data is written during manufacturing (mask ROM) or one-time programming (PROM). EPROM can be erased with UV light, EEPROM electrically. Retains data without power.",
    functionalities: [
      "BIOS Storage",
      "Firmware Storage",
      "Boot Instructions",
      "Permanent Programs",
    ],
    icon: Database,
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
            <DeviceCard key={device.name} {...device} delay={index * 0.05} />
          ))}
        </div>

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
