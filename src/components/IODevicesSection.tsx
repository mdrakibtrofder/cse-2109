import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Keyboard, Mouse, MonitorPlay, Printer, Mic, Camera, Video, Gamepad2, ScanBarcode, Fingerprint, PenTool, CircleDot, Volume2, Tv, Headphones } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import keyboardImage from "@/assets/devices/keyboard.png";
import mouseImage from "@/assets/devices/mouse.png";
import monitorImage from "@/assets/devices/monitor.png";
import printerImage from "@/assets/devices/printer.png";
import scannerImage from "@/assets/devices/scanner.png";
import touchscreenImage from "@/assets/devices/touchscreen.png";
import joystickImage from "@/assets/devices/joystick.png";
import barcodeReaderImage from "@/assets/devices/barcode-reader.png";
import microphoneImage from "@/assets/devices/microphone.png";
import webcamImage from "@/assets/devices/webcam.png";
import digitalCameraImage from "@/assets/devices/digital-camera.png";
import trackballImage from "@/assets/devices/trackball.png";
import lightPenImage from "@/assets/devices/light-pen.png";
import omrImage from "@/assets/devices/omr.png";
import graphicsTabletImage from "@/assets/devices/graphics-tablet.png";
import speakersImage from "@/assets/devices/speakers.png";
import plotterImage from "@/assets/devices/plotter.png";
import projectorImage from "@/assets/devices/projector.png";
import headphonesImage from "@/assets/devices/headphones.png";

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
    icon: ScanBarcode,
  },
  {
    name: "Touch Screen",
    image: touchscreenImage,
    shortDescription: "Display that detects finger or stylus touch for direct interaction with visual elements.",
    howItWorks: "Capacitive screens detect electrical changes when touched. Resistive screens use pressure. Controller calculates touch coordinates and sends to processor.",
    functionalities: [
      "Direct Interaction",
      "Multi-touch Gestures",
      "Pinch to Zoom",
      "Handwriting Input",
    ],
    icon: Fingerprint,
  },
  {
    name: "Light Pen",
    image: lightPenImage,
    shortDescription: "Pointing device that detects light from CRT display to determine screen position.",
    howItWorks: "Contains photocell that detects electron beam scanning the screen. Timing of detection relative to refresh cycle determines position coordinates.",
    functionalities: [
      "Direct Screen Drawing",
      "CAD Applications",
      "Menu Selection",
      "Graphics Design",
    ],
    icon: PenTool,
  },
  {
    name: "Joystick",
    image: joystickImage,
    shortDescription: "Directional input device primarily used for gaming, simulations, and industrial control.",
    howItWorks: "Potentiometers or Hall effect sensors detect stick position. Movement along X/Y axes generates analog signals converted to digital coordinates.",
    functionalities: [
      "Gaming Control",
      "Flight Simulation",
      "Robotic Control",
      "CAD Navigation",
    ],
    icon: Gamepad2,
  },
  {
    name: "Trackball",
    image: trackballImage,
    shortDescription: "Stationary pointing device where user rotates a ball to control cursor movement.",
    howItWorks: "Ball rotation is detected by optical sensors or rollers. Movement is translated to cursor coordinates without moving the device itself.",
    functionalities: [
      "Precision Pointing",
      "Limited Space Usage",
      "Ergonomic Control",
      "CAD/Graphics Work",
    ],
    icon: CircleDot,
  },
  {
    name: "Barcode Reader",
    image: barcodeReaderImage,
    shortDescription: "Scans and decodes product barcodes using laser or LED light reflection.",
    howItWorks: "Laser/LED beam scans barcode. Light reflected from white bars and absorbed by black bars creates pattern. Decoder translates pattern to digits.",
    functionalities: [
      "Product Identification",
      "Inventory Management",
      "Point of Sale",
      "Asset Tracking",
    ],
    icon: ScanBarcode,
  },
  {
    name: "OMR (Optical Mark Reader)",
    image: omrImage,
    shortDescription: "Reads pencil marks on specially designed forms like exam answer sheets.",
    howItWorks: "Light shines on paper. Marked areas reflect less light. Sensors detect contrast differences between marked and unmarked areas to read data.",
    functionalities: [
      "Exam Grading",
      "Survey Processing",
      "Lottery Tickets",
      "Attendance Sheets",
    ],
    icon: ScanBarcode,
  },
  {
    name: "Digital Camera",
    image: digitalCameraImage,
    shortDescription: "Captures images using CCD/CMOS sensors and stores them digitally.",
    howItWorks: "Light passes through lens onto image sensor. Millions of photosites convert light to electrical signals. ADC creates digital pixel data stored in memory.",
    functionalities: [
      "Photo Capture",
      "Video Recording",
      "Image Preview",
      "Zoom Functions",
    ],
    icon: Camera,
  },
  {
    name: "Microphone",
    image: microphoneImage,
    shortDescription: "Converts sound waves into electrical signals for audio input.",
    howItWorks: "Sound waves cause diaphragm to vibrate. Movement creates electrical current variations in coil (dynamic) or capacitance changes (condenser).",
    functionalities: [
      "Voice Recording",
      "Video Conferencing",
      "Voice Commands",
      "Music Production",
    ],
    icon: Mic,
  },
  {
    name: "Webcam",
    image: webcamImage,
    shortDescription: "Real-time video input device for conferencing and streaming.",
    howItWorks: "CMOS sensor captures continuous video frames. Built-in processor compresses video data. USB interface streams data to computer in real-time.",
    functionalities: [
      "Video Calls",
      "Live Streaming",
      "Security Monitoring",
      "Face Recognition",
    ],
    icon: Video,
  },
  {
    name: "Graphics Tablet",
    image: graphicsTabletImage,
    shortDescription: "Pressure-sensitive drawing surface with stylus for digital art creation.",
    howItWorks: "Electromagnetic grid detects stylus position. Pressure sensors measure pen force. Data translates to precise cursor movement and brush effects.",
    functionalities: [
      "Digital Drawing",
      "Photo Editing",
      "Signature Capture",
      "3D Sculpting",
    ],
    icon: PenTool,
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
  {
    name: "Speakers",
    image: speakersImage,
    shortDescription: "Convert electrical audio signals into sound waves for listening.",
    howItWorks: "Electrical signals pass through voice coil creating magnetic field. Coil moves diaphragm back and forth, pushing air to create sound waves.",
    functionalities: [
      "Audio Playback",
      "Stereo Sound",
      "Bass Enhancement",
      "Volume Control",
    ],
    icon: Volume2,
  },
  {
    name: "Plotter",
    image: plotterImage,
    shortDescription: "Draws high-quality vector graphics for CAD, engineering, and architectural drawings.",
    howItWorks: "Pen or inkjet head moves on X-Y axis. Computer sends coordinates for continuous lines. Creates precise technical drawings larger than standard printers.",
    functionalities: [
      "Large Format Output",
      "Vector Graphics",
      "Technical Drawings",
      "Blueprint Printing",
    ],
    icon: PenTool,
  },
  {
    name: "Projector",
    image: projectorImage,
    shortDescription: "Projects enlarged digital images onto screen or wall for presentations.",
    howItWorks: "Light source passes through LCD/DLP chip. Lens system enlarges and focuses image. Projection throws light onto reflective surface creating visible display.",
    functionalities: [
      "Large Display Output",
      "Presentations",
      "Home Theater",
      "Classroom Teaching",
    ],
    icon: Tv,
  },
  {
    name: "Headphones",
    image: headphonesImage,
    shortDescription: "Personal audio output device worn on or over the ears.",
    howItWorks: "Small speakers (drivers) convert electrical signals to sound. Ear cups or buds direct sound into ear canal. May include noise cancellation technology.",
    functionalities: [
      "Private Listening",
      "Noise Isolation",
      "Portable Audio",
      "Gaming Communication",
    ],
    icon: Headphones,
  },
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inputDevices.map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.05} />
            ))}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outputDevices.map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
