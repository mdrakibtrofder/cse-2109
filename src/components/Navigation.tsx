import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Introduction", href: "#introduction" },
  { label: "Number Systems", href: "#number-systems" },
  { label: "Codes & Organization", href: "#codes" },
  { label: "Hardware", href: "#hardware" },
  { label: "I/O Devices", href: "#io-devices" },
  { label: "Storage", href: "#storage" },
  { label: "Software", href: "#software" },
  { label: "Networks", href: "#networks" },
  { label: "Visualization", href: "#visualization" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4 px-4 md:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground group-hover:shadow-glow transition-shadow">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg hidden sm:block">CSE 2109</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t border-border"
          >
            <div className="container-custom py-4 flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
