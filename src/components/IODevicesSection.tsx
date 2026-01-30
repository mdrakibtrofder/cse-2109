import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Keyboard, Mouse, MonitorPlay, Printer } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import keyboardImage from "@/assets/devices/keyboard.png";
import mouseImage from "@/assets/devices/mouse.png";
import monitorImage from "@/assets/devices/monitor.png";
import printerImage from "@/assets/devices/printer.png";
import scannerImage from "@/assets/devices/scanner.png";

const inputDevices = [
  {
    name: "Keyboard",
    image: keyboardImage,
    shortDescription: "Primary input device for entering text, commands, and controlling computer operations.",
    howItWorks: "Key presses complete electrical circuits (membrane) or trigger mechanical switches. A microcontroller scans the key matrix and sends scan codes to the CPU.",
    functionalities: [
      "Text Input",
      "Shortcut Commands",
      "Function Key Operations",
      "Gaming Controls",
    ],
    icon: Keyboard,
  },
  {
    name: "Mouse",
    image: mouseImage,
    shortDescription: "Pointing device for GUI navigation, selection, and interaction with on-screen elements.",
    howItWorks: "Optical sensor captures surface images thousands of times per second. DSP calculates movement direction and speed, sending data via USB/wireless.",
    functionalities: [
      "Cursor Movement",
      "Click Selection",
      "Drag & Drop",
      "Scroll Navigation",
    ],
    icon: Mouse,
  },
  {
    name: "Scanner",
    image: scannerImage,
    shortDescription: "Converts physical documents and images into digital format for computer storage.",
    howItWorks: "Light source illuminates document. CCD/CIS sensors capture reflected light. ADC converts analog signals to digital pixels, creating bitmap image.",
    functionalities: [
      "Document Digitization",
      "OCR (Text Recognition)",
      "Photo Scanning",
      "Multi-page Feeding",
    ],
    icon: MonitorPlay,
  },
];

const outputDevices = [
  {
    name: "Monitor",
    image: monitorImage,
    shortDescription: "Visual display unit showing text, graphics, and video output from the computer.",
    howItWorks: "LCD/OLED pixels are controlled by transistors. GPU sends video signal through HDMI/DisplayPort. Pixels change color/brightness to form images at high refresh rates.",
    functionalities: [
      "Visual Output Display",
      "High Resolution Graphics",
      "Color Accuracy",
      "Multiple Input Support",
    ],
    icon: MonitorPlay,
  },
  {
    name: "Printer",
    image: printerImage,
    shortDescription: "Produces physical copies of digital documents, images, and graphics on paper.",
    howItWorks: "Inkjet: Tiny nozzles spray ink droplets. Laser: Toner powder fused to paper by heat. Print head moves across paper depositing ink/toner in precise patterns.",
    functionalities: [
      "Document Printing",
      "Photo Quality Output",
      "Duplex (Two-sided)",
      "Network Sharing",
    ],
    icon: Printer,
  },
];

const otherInputDevices = [
  { name: "Touch Screen", desc: "Combines display and input; detects finger/stylus position" },
  { name: "Light Pen", desc: "Detects light from CRT to determine screen position" },
  { name: "Joystick", desc: "Directional input for gaming and flight simulators" },
  { name: "Trackball", desc: "Stationary mouse alternative; ball rolled by fingers" },
  { name: "Barcode Reader", desc: "Scans and decodes product barcodes using laser/LED" },
  { name: "OMR", desc: "Optical Mark Recognition for bubble sheet scanning" },
  { name: "OCR", desc: "Converts printed/handwritten text to digital text" },
  { name: "Digital Camera", desc: "Captures images using CCD/CMOS sensors" },
  { name: "Microphone", desc: "Converts sound waves to electrical signals" },
  { name: "Webcam", desc: "Real-time video input for conferencing" },
];

const otherOutputDevices = [
  { name: "Speakers", desc: "Convert electrical signals to sound waves" },
  { name: "Plotter", desc: "Draws vector graphics for CAD/engineering drawings" },
  { name: "Projector", desc: "Projects enlarged image onto screen/wall" },
  { name: "Headphones", desc: "Personal audio output worn on ears" },
];

export function IODevicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="io-devices" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Sections F & G</span>
          <h2 className="heading-2 mt-2 mb-4">Input & Output Devices</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Devices that allow communication between users and the computer system
          </p>
        </motion.div>

        {/* Input Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Keyboard className="w-6 h-6 text-primary" />
            </div>
            Input Devices
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {inputDevices.map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.1} />
            ))}
          </div>

          {/* Other Input Devices List */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h4 className="font-semibold mb-4">Other Input Devices</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {otherInputDevices.map((device) => (
                <div key={device.name} className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors">
                  <p className="font-medium text-sm">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Output Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <MonitorPlay className="w-6 h-6 text-secondary" />
            </div>
            Output Devices
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {outputDevices.map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.1} />
            ))}
          </div>

          {/* Other Output Devices List */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h4 className="font-semibold mb-4">Other Output Devices</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {otherOutputDevices.map((device) => (
                <div key={device.name} className="p-3 rounded-lg bg-muted hover:bg-secondary/10 transition-colors">
                  <p className="font-medium text-sm">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
