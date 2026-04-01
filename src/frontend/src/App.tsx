import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Fitness from "./pages/Fitness";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Posture from "./pages/Posture";
import ProgressPage from "./pages/Progress";
import Skin from "./pages/Skin";

const queryClient = new QueryClient();

export type Page =
  | "home"
  | "planner"
  | "fitness"
  | "skin"
  | "posture"
  | "progress"
  | "gallery"
  | "about";

function getPageFromHash(): Page {
  const hash = window.location.hash.replace("#", "") as Page;
  const valid: Page[] = [
    "home",
    "planner",
    "fitness",
    "skin",
    "posture",
    "progress",
    "gallery",
    "about",
  ];
  return valid.includes(hash) ? hash : "home";
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const handler = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>
        {currentPage === "home" && <Home navigate={navigate} />}
        {currentPage === "planner" && <Planner />}
        {currentPage === "fitness" && <Fitness />}
        {currentPage === "skin" && <Skin />}
        {currentPage === "posture" && <Posture />}
        {currentPage === "progress" && <ProgressPage />}
        {currentPage === "gallery" && <Gallery />}
        {currentPage === "about" && <About />}
      </main>
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="font-serif italic text-lg text-primary mb-2">
            "I am refining and elevating myself."
          </p>
          <p className="text-sm text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
