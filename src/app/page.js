import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
    </div>
  );
}
