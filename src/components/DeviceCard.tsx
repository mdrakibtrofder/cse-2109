import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DeviceCardProps {
  name: string;
  image: string;
  shortDescription: string;
  howItWorks: string;
  functionalities: string[];
  icon: LucideIcon;
  delay?: number;
}

export function DeviceCard({
  name,
  image,
  shortDescription,
  howItWorks,
  functionalities,
  icon: Icon,
  delay = 0,
}: DeviceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-500 h-full flex flex-col">
        {/* Image Container with 3D effect */}
        <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-contain drop-shadow-xl"
              whileHover={{ scale: 1.08, rotateY: 5 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <h4 className="font-semibold text-lg">{name}</h4>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">{shortDescription}</p>

          {/* How it works */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">How it works</span>
            <p className="text-sm text-muted-foreground mt-1">{howItWorks}</p>
          </div>

          {/* Key Functionalities */}
          <div className="mt-auto">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Key Features</span>
            <ul className="mt-2 space-y-1">
              {functionalities.slice(0, 3).map((func, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
