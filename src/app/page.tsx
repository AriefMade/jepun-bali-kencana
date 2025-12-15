import HeroSection from "./public/sections/HeroSection";
import CategorySection from "./public/sections/CategorySection";
import TestimonySection from "./public/sections/testimony/TestimonySection";
import GallerySection from "./public/sections/GallerySection";
import ContactSection from "./public/sections/ContactSection";

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
