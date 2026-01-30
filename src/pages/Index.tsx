import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { NumberSystemsSection } from "@/components/NumberSystemsSection";
import { CodesAndOrganizationSection } from "@/components/CodesAndOrganizationSection";
import { HardwareSection } from "@/components/HardwareSection";
import { IODevicesSection } from "@/components/IODevicesSection";
import { StorageSection } from "@/components/StorageSection";
import { SoftwareSection } from "@/components/SoftwareSection";
import { NetworksAndMaintenanceSection } from "@/components/NetworksAndMaintenanceSection";
import { InteractiveVisualization } from "@/components/InteractiveVisualization";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <IntroductionSection />
        <NumberSystemsSection />
        <CodesAndOrganizationSection />
        <HardwareSection />
        <IODevicesSection />
        <StorageSection />
        <SoftwareSection />
        <NetworksAndMaintenanceSection />
        <InteractiveVisualization />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
