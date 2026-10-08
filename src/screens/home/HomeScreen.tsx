import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import HeroSection from "./HeroSection";
import AboutSection from "./sections/AboutSection";
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
import ContactSection from "./sections/ContactSection";

export default function HomeScreen() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main>
          <HeroSection />
          <AboutSection />
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
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}