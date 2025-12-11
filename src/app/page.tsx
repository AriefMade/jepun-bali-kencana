import HeroSection from "./sections/HeroSection";
import CategorySection from "./sections/CategorySection";
import TestimonySection from "./sections/testimony/TestimonySection";
import GallerySection from "./sections/GallerySection";
import ContactSection from "./sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <TestimonySection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
