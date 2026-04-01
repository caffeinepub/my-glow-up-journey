import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Page } from "../App";

const JOURNEY_START = new Date("2026-04-01");
const JOURNEY_END = new Date("2026-06-22");
const TODAY = new Date("2026-04-01");
const TOTAL_DAYS = Math.floor(
  (JOURNEY_END.getTime() - JOURNEY_START.getTime()) / (1000 * 60 * 60 * 24),
);

function getJourneyProgress() {
  const total = JOURNEY_END.getTime() - JOURNEY_START.getTime();
  const elapsed = Math.max(0, TODAY.getTime() - JOURNEY_START.getTime());
  return Math.min(100, Math.round((elapsed / total) * 100));
}

function getDaysElapsed() {
  return Math.max(
    0,
    Math.floor(
      (TODAY.getTime() - JOURNEY_START.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
}

interface HomeProps {
  navigate: (page: Page) => void;
}

export default function Home({ navigate }: HomeProps) {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.15 },
    );
    for (const el of sectionsRef.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1200x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            April 1 – June 22, 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight mb-4">
            My Glow-Up Journey
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-8">
            Discipline. Strength. Confidence.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("planner")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 text-base font-medium card-shadow"
            data-ocid="home.primary_button"
          >
            Start My Transformation
          </Button>

          <div className="mt-10 bg-card/80 backdrop-blur-sm rounded-2xl p-5 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Journey Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {getDaysElapsed()} / {TOTAL_DAYS} days
              </span>
            </div>
            <Progress value={getJourneyProgress()} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {getJourneyProgress()}% complete
            </p>
          </div>
        </motion.div>
      </section>

      {/* Goal Cards */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Journey Ahead
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: "💪",
              title: "Body Goals",
              items: [
                "Become leaner and toned",
                "Improve waist definition",
                "Build stronger glutes and core",
                "Improve posture",
              ],
            },
            {
              emoji: "✨",
              title: "Skin Goals",
              items: [
                "Clear, healthy skin",
                "Natural radiant glow",
                "Consistent skincare routine",
              ],
            },
            {
              emoji: "🌿",
              title: "Habit Goals",
              items: [
                "Daily water intake (2–3 L)",
                "Consistent workouts",
                "Healthy, balanced meals",
                "Quality sleep (7–9 hrs)",
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card className="card-shadow rounded-2xl border-0 h-full hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-2xl mb-4">
                    {card.emoji}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 text-primary">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="rose-gradient py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <blockquote className="font-serif italic text-2xl md:text-4xl text-foreground leading-relaxed">
            “I am becoming the strongest, most confident version of myself.”
          </blockquote>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Track Habits", page: "planner" as Page, emoji: "📋" },
            { label: "Fitness Plan", page: "fitness" as Page, emoji: "🏃‍♀️" },
            { label: "Skin & Care", page: "skin" as Page, emoji: "🌸" },
            { label: "Track Progress", page: "progress" as Page, emoji: "📈" },
          ].map((item, i) => (
            <motion.button
              type="button"
              key={item.page}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(item.page)}
              data-ocid="home.secondary_button"
              className="flex flex-col items-center gap-2 p-5 bg-card rounded-2xl card-shadow hover:scale-105 transition-transform duration-200 text-center border border-border"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
