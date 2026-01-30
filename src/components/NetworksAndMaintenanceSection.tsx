import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Network, Wifi, Server, Shield, Wrench } from "lucide-react";

const networkTypes = [
  {
    name: "LAN (Local Area Network)",
    range: "< 1 km",
    description: "Connects devices within a small area like office, school, or home",
    examples: "Office network, Home WiFi",
    color: "bg-green-500",
  },
  {
    name: "MAN (Metropolitan Area Network)",
    range: "1-50 km",
    description: "Covers a city or large campus, connecting multiple LANs",
    examples: "City-wide network, University campus",
    color: "bg-yellow-500",
  },
  {
    name: "WAN (Wide Area Network)",
    range: "> 50 km",
    description: "Spans countries or continents, connecting multiple MANs/LANs",
    examples: "Internet, Corporate WAN",
    color: "bg-primary",
  },
];

const topologies = [
  { name: "Bus", shape: "─●─●─●─", desc: "All devices share single cable" },
  { name: "Star", shape: "●↔Hub↔●", desc: "Central hub connects all devices" },
  { name: "Ring", shape: "●→●→●→●", desc: "Each device connects to two others forming circle" },
  { name: "Mesh", shape: "●⟷●⟷●", desc: "Every device connected to every other" },
  { name: "Tree", shape: "●-●-●", desc: "Hierarchical structure like family tree" },
];

const internetServices = [
  { name: "WWW (World Wide Web)", desc: "Collection of web pages accessed via browsers using HTTP/HTTPS" },
  { name: "Email", desc: "Electronic mail service for sending/receiving messages" },
  { name: "FTP", desc: "File Transfer Protocol for uploading/downloading files" },
  { name: "DNS", desc: "Domain Name System - translates domain names to IP addresses" },
  { name: "VoIP", desc: "Voice over IP - voice communication over internet" },
  { name: "Cloud Services", desc: "Storage, computing, and applications hosted remotely" },
];

const maintenanceHardware = [
  { item: "Power Supply Stability", desc: "Use quality PSU with stable voltage output" },
  { item: "Grounding", desc: "Proper electrical grounding prevents static damage" },
  { item: "Surge Protection", desc: "Use surge protectors to guard against power spikes" },
  { item: "UPS (Uninterruptible Power Supply)", desc: "Battery backup for power outages" },
  { item: "Cleaning", desc: "Regular dust removal from fans, vents, and components" },
  { item: "Temperature Control", desc: "Maintain proper cooling and ventilation" },
];

const maintenanceSoftware = [
  { item: "Updates & Patches", desc: "Keep OS and software updated for security and features" },
  { item: "Antivirus Protection", desc: "Install and update antivirus software regularly" },
  { item: "Backup", desc: "Regular data backups to prevent loss" },
  { item: "Disk Cleanup", desc: "Remove temporary files and defragment drives" },
  { item: "Registry Maintenance", desc: "Clean up invalid entries (Windows)" },
  { item: "Malware Scanning", desc: "Regular scans for viruses, trojans, ransomware" },
];

const virusTypes = [
  { name: "Virus", desc: "Attaches to files, spreads when executed" },
  { name: "Worm", desc: "Self-replicating, spreads across networks" },
  { name: "Trojan", desc: "Disguised as legitimate software" },
  { name: "Ransomware", desc: "Encrypts files, demands payment" },
  { name: "Spyware", desc: "Secretly monitors user activity" },
  { name: "Adware", desc: "Displays unwanted advertisements" },
];

export function NetworksAndMaintenanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="networks" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Sections J & K</span>
          <h2 className="heading-2 mt-2 mb-4">Networks, Internet & Maintenance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Computer networking fundamentals and system maintenance practices
          </p>
        </motion.div>

        {/* Network Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <Network className="w-6 h-6 text-primary" />
            </div>
            <h3 className="heading-3">Network Types</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {networkTypes.map((network, index) => (
              <motion.div
                key={network.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-card"
              >
                <div className={`h-2 ${network.color}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{network.name}</h4>
                    <span className="px-2 py-1 rounded bg-muted text-xs font-mono">{network.range}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{network.description}</p>
                  <p className="text-xs text-primary">{network.examples}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Topologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-6 text-center">Network Topologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {topologies.map((topology) => (
              <div key={topology.name} className="bg-card rounded-xl p-4 shadow-card text-center min-w-[140px]">
                <div className="font-mono text-2xl text-primary mb-2">{topology.shape}</div>
                <h4 className="font-semibold">{topology.name}</h4>
                <p className="text-xs text-muted-foreground">{topology.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Internet Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Globe className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="heading-3">Internet Services</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {internetServices.map((service) => (
              <div key={service.name} className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all">
                <h4 className="font-semibold text-primary mb-1">{service.name}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Maintenance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <Wrench className="w-6 h-6 text-accent" />
            </div>
            <h3 className="heading-3">Computer Maintenance</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hardware Maintenance */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                Hardware Maintenance
              </h4>
              <div className="space-y-3">
                {maintenanceHardware.map((item) => (
                  <div key={item.item} className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-sm">{item.item}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Maintenance */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                Software Maintenance
              </h4>
              <div className="space-y-3">
                {maintenanceSoftware.map((item) => (
                  <div key={item.item} className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-sm">{item.item}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Virus Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="heading-3 mb-6 text-center">Common Malware Types</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {virusTypes.map((virus) => (
              <div key={virus.name} className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                <h4 className="font-semibold text-destructive mb-1">{virus.name}</h4>
                <p className="text-sm text-muted-foreground">{virus.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
