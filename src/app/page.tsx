import {
  education,
  experience,
  personalInfo,
  projects,
  skills,
} from "@/lib/portfolio-data";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorGlow } from "@/components/CursorGlow";
import { Sidebar } from "@/components/Sidebar";
import { TypewriterName } from "@/components/TypewriterName";
import { ChatPanel } from "@/components/ChatPanel";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Code, Database, Sparkles, Terminal, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

const mobileNav = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "chat", label: "Chat" },
];

const skillIcons: Record<string, ReactNode> = {
  Language: <Code size={18} />,
  Frontend: <Sparkles size={18} />,
  Backend: <Terminal size={18} />,
  Database: <Database size={18} />,
  ML: <Sparkles size={18} />,
  "Dev Tools": <Wrench size={18} />,
  Cloud: <Sparkles size={18} />,
  Design: <Sparkles size={18} />,
};

const skillCategoryOrder = ["Frontend", "Backend", "Database", "Other"];

export default function Home() {
  const groupedSkills = skills.reduce<Record<string, typeof skills>>(
    (acc, skill) => {
      const category =
        skill.category === "Frontend" ||
        skill.category === "Backend" ||
        skill.category === "Database"
          ? skill.category
          : "Other";
      acc[category] = acc[category] ? [...acc[category], skill] : [skill];
      return acc;
    },
    {}
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <AuroraBackground />
      <CursorGlow />
      <Sidebar />
      <div className="fixed right-6 top-6 z-40">
        <ThemeToggle />
      </div>

      <div className="sticky top-4 z-30 mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-xs text-[color:var(--muted)] backdrop-blur-lg lg:hidden">
        {mobileNav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full px-3 py-1 transition hover:bg-black/10 hover:text-[color:var(--foreground)]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 lg:pl-[14vw]">
        <AnimatedSection
          id="home"
          className="grid gap-8 font-calibri lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="glass-card rounded-3xl p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Hey, I&apos;m
            </p>
            <div className="mt-5 text-[color:var(--foreground)]">
              <TypewriterName />
            </div>
            <p className="mt-6 max-w-xl text-xl text-[color:var(--muted)] font-cursive">
              {personalInfo.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://jashwanthsa.github.io/my-portfolio/assets/download/jash_resumae.pdf" target="_blank"
                className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-semibold text-[color:var(--background)]"
              >
                View Resumae
              </a>
              <span className="text-sm text-[color:var(--muted)]">
                {personalInfo.email}
              </span>
              <span className="text-sm text-[color:var(--muted)]">
                {personalInfo.phone}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-4 text-md text-[color:var(--muted)]">
              {personalInfo.about}
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                <p className="text-md text-[color:var(--muted)]">Currently Learning</p>
                <p className="mt-2 text-md text-[color:var(--foreground)]">
                  Agentic workflows, Cloud Computing and Operating Systems.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="education"
          className="glass-card rounded-3xl p-8 font-serif"
        >
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="mt-8 border-l border-[color:var(--border)] pl-6">
            {education.map((item) => (
              <div key={item.degree} className="relative pb-8">
                <span className="absolute -left-7 top-1 h-2 w-2 rounded-full bg-[color:var(--foreground)]" />
                <h3 className="text-lg font-semibold">{item.degree}</h3>
                <p className="text-sm text-[color:var(--muted)]">
                  {item.school}
                </p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {item.yearRange}
                </p>
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  {item.marktype}: {item.mark}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="experience"
          className="glass-card rounded-3xl p-8 font-bodoni"
        >
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="mt-8 border-l border-[color:var(--border)] pl-6">
            {experience.map((item) => (
              <div key={item.role} className="relative pb-8">
                <span className="absolute -left-7 top-1 h-2 w-2 rounded-full bg-[color:var(--foreground)]" />
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <span className="text-sm text-[color:var(--muted)]">
                    {item.company}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  {item.dateRange}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="skills"
          className="glass-card rounded-3xl p-8 font-quantico"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <p className="text-sm text-[color:var(--muted)]">
              Tools, languages, and platforms I build with.
            </p>
          </div>
          <div className="mt-8 space-y-8">
            {skillCategoryOrder.map((category) => (
              <div key={category}>
                <h3 className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  {category}
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(groupedSkills[category] || []).map((skill) => (
                    <div
                      key={skill.name}
                      className="glass-card flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 hover:border-[color:var(--foreground)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)]">
                        {skillIcons[skill.category] || <Sparkles size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{skill.name}</p>
                        <p className="text-xs text-[color:var(--muted)]">
                          {skill.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          className="glass-card rounded-3xl p-8 font-pixel"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="text-sm text-[color:var(--muted)]">
              For more projects, visit my <a href="https://github.com/JashwanthSA" target="_blank" rel="noopener noreferrer" className="text-[color:var(--foreground)]">Github</a>
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="glass-card rounded-2xl p-4 transition hover:-translate-y-1 hover:border-[color:var(--foreground)]"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video overflow-hidden rounded-xl border border-[color:var(--border)] bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-orange-500/20 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </a>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="chat"
          className="glass-card rounded-3xl p-8 font-noto"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Chat with me</h2>
            <p className="text-sm text-[color:var(--muted)]">
              Powered by <a href="https://www.fusejs.io/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--foreground)]">Fuse.js</a>
            </p>
          </div>
          <div className="mt-6">
            <ChatPanel />
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
