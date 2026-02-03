"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudyCard from './CaseStudyCard';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  { id: "01", title: "Digital Evolution", category: "Web Design & UI/UX", image: "/abstract_light_1_1770101236435.png" },
  { id: "02", title: "Kinetic Identity", category: "Motion & Branding", image: "/abstract_light_2_v3_1770101270896.png" },
  { id: "03", title: "Neural Interface", category: "Artificial Intelligence", image: "/abstract_light_3_v2_1770101294369.png" },
  { id: "04", title: "Liquid Motion", category: "Abstract Animation", image: "/abstract_light_4_v2_1770101317404.png" },
  { id: "05", title: "Minimalist Ethos", category: "Product Design", image: "/abstract_light_5_v2_1770101352382.png" },
  { id: "06", title: "Cyber Protocol", category: "Security Design", image: "/abstract_light_6_v2_1770101371369.png" },
];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const scrollWidth = scrollContainerRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 768;
    // On mobile, we make the scroll feel faster by reducing the distance required to trigger the full sweep
    const scrollDistance = (scrollWidth - windowWidth) * (isMobile ? 0.35 : 1);

    const mainTween = gsap.to(scrollContainerRef.current, {
      x: -(scrollWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${isMobile ? windowWidth * 0.5 : scrollDistance}`, // Slight scroll for mobile sweep
        scrub: 1,
        pin: !isMobile, // Disable pin on mobile
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Add entry animation for each card
    const cards = gsap.utils.toArray('.case-study-card', sectionRef.current);
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0.2, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainTween,
            start: "left 90%",
            end: "left 60%",
            scrub: true,
          }
        }
      );
    });

    return () => {
      mainTween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.containerAnimation === mainTween) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#060606] overflow-hidden relative">
      {/* Environmental Background Image */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('/abstract_light_1_1770101236435.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="h-auto py-12 md:py-0 md:h-screen flex flex-col justify-start md:justify-center relative z-10">
        <div className="px-6 md:px-20 mb-10 md:mb-12">
          <h2 className="text-zinc-700 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-2 md:mb-4">Selected Works</h2>
          <div className="h-[1px] w-12 md:w-24 bg-emerald-500/50"></div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap pl-6 md:pl-20 pr-[15vw] md:pr-[20vw]"
        >
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard
              key={study.id}
              id={study.id}
              title={study.title}
              category={study.category}
              image={study.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}