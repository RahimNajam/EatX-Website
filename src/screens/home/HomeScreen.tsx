import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import HeroSection from "./HeroSection";
import ArcSection from "./sections/ArcSection";
import PlatformSection from "./sections/PlatformSection";
import FlowSection from "./sections/FlowSection";
import ActionSection from "./sections/ActionSection";
import RolesSection from "./sections/RolesSection";
import NumbersSection from "./sections/NumbersSection";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";

export default function HomeScreen() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main>
          <HeroSection />
          <PlatformSection />
          <ArcSection />
          <FlowSection />
          <ActionSection />
          <RolesSection />
          <NumbersSection />
          <ServicesSection />
          <TestimonialsSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}