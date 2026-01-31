"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
  Wrench,
} from "lucide-react";
import { socialLinks } from "@/lib/portfolio-data";

const navItems = [
  { id: "home", label: "Home", icon: Home, font: "font-calibri" },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    font: "font-serif",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    font: "font-bodoni",
  },
  { id: "skills", label: "Skills", icon: Wrench, font: "font-quantico" },
  {
    id: "projects",
    label: "Projects",
    icon: Sparkles,
    font: "font-pixel",
  },
  { id: "chat", label: "Chat", icon: MessageCircle, font: "font-noto" },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed left-6 top-6 bottom-6 z-40 hidden w-[12.5vw] min-w-[150px] max-w-[220px] flex-col justify-between rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 backdrop-blur-xl lg:flex">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition ${item.font} ${
                isActive
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                  : "text-[color:var(--muted)] hover:bg-black/10 hover:text-[color:var(--foreground)]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </a>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-2 text-[color:var(--muted)]">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] hover:bg-black/10"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] hover:bg-black/10"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={socialLinks.email}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] hover:bg-black/10"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>
    </aside>
  );
}

