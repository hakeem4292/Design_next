"use client";
import CubeScene from "@/components/CubeScene";
import HeroContent from "@/components/HeroContent";
import GridMotion from "@/components/GridMotion";
import CaseStudy from "@/components/CaseStudy";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const images = [
    "/images/grid-1.png",
    "/images/grid-2.png",
    "/images/grid-3.png",
    "/images/grid-4.png",
  ];

  // Fill array to 28 with a repeating pattern for more variety
  const filledImages = Array.from({ length: 28 }, (_, i) => images[i % images.length]);

  return (
    <main className="min-h-screen bg-[#060606] overflow-x-hidden">

      {/* 3D and Hero */}
      <section className="relative flex flex-col items-center pt-0">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
          <CubeScene />
        </div>
        <div className="z-10 mt-[-40px] md:mt-[-40px]">
          <HeroContent />
        </div>
      </section>

      {/* The New Motion Grid Section */}
      <section className="w-full py-6 md:py-10">
        <GridMotion items={filledImages} gradientColor="#060606" />
      </section>

      {/* Case Study & Footer */}
      <section className="relative z-20 bg-[#060606]">
        <CaseStudy />
        <Services />
        <Footer />
      </section>

    </main>
  );
}