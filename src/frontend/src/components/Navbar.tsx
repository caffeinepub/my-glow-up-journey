import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Planner", page: "planner" },
  { label: "Fitness", page: "fitness" },
  { label: "Skin & Care", page: "skin" },
  { label: "Posture", page: "posture" },
  { label: "Progress", page: "progress" },
  { label: "Gallery", page: "gallery" },
  { label: "About", page: "about" },
];

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-serif font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            Glow-Up Journey
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => handleNav(link.page)}
              data-ocid="nav.link"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentPage === link.page
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => handleNav(link.page)}
              data-ocid="nav.link"
              className={`block w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 mb-1 ${
                currentPage === link.page
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
