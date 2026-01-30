import { motion } from "framer-motion";
import { Cpu, BookOpen, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container-custom px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">CSE 2109</span>
            </div>
            <p className="text-sm opacity-70">
              Computer Fundamentals - An interactive learning platform for understanding 
              the basics of computer science and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#introduction" className="hover:opacity-100 transition-opacity">Introduction</a></li>
              <li><a href="#number-systems" className="hover:opacity-100 transition-opacity">Number Systems</a></li>
              <li><a href="#hardware" className="hover:opacity-100 transition-opacity">Hardware</a></li>
              <li><a href="#visualization" className="hover:opacity-100 transition-opacity">Interactive Explorer</a></li>
            </ul>
          </div>

          {/* Topics Covered */}
          <div>
            <h4 className="font-semibold mb-4">Topics Covered</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Computer History & Generations</li>
              <li>Number Systems & Codes</li>
              <li>Input/Output Devices</li>
              <li>Storage & Memory</li>
              <li>Software & Networks</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            © 2026 CSE 2109 Computer Fundamentals. Educational Resource.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <BookOpen className="w-5 h-5" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
