import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TODAY_DAY = new Date("2026-04-01").getDay();

const WORKOUT_PLAN = [
  {
    day: "Monday",
    emoji: "🌸",
    theme: "Full Body + Walk",
    intensity: "Moderate",
    exercises: [
      { name: "Walk", detail: "30–40 mins", type: "cardio" },
      { name: "Squats", detail: "15 reps × 3 sets", type: "strength" },
      { name: "Wall Push-Ups", detail: "10 reps × 3 sets", type: "strength" },
      { name: "Plank", detail: "20 sec × 3 sets", type: "core" },
      { name: "Crunches", detail: "15 reps × 3 sets", type: "core" },
    ],
  },
  {
    day: "Tuesday",
    emoji: "🔥",
    theme: "Belly + Side Fat Focus",
    intensity: "High",
    exercises: [
      { name: "Walk", detail: "30 mins (add 5 min fast walk)", type: "cardio" },
      { name: "Leg Raises", detail: "10 reps × 3 sets", type: "core" },
      { name: "Russian Twists", detail: "20 reps × 3 sets", type: "core" },
      { name: "Plank", detail: "25 sec × 3 sets", type: "core" },
      { name: "High Knees", detail: "20 reps × 3 sets", type: "cardio" },
    ],
  },
  {
    day: "Wednesday",
    emoji: "💃",
    theme: "Light + Active Day",
    intensity: "Easy",
    exercises: [
      { name: "Walk", detail: "40–45 mins (easy pace)", type: "cardio" },
      { name: "Full Body Stretch", detail: "5–10 mins", type: "flexibility" },
    ],
  },
  {
    day: "Thursday",
    emoji: "⚡",
    theme: "Fat Burn + Full Body",
    intensity: "High",
    exercises: [
      {
        name: "Interval Walk",
        detail: "30 mins (5 min normal, 2 min fast)",
        type: "cardio",
      },
      { name: "Jumping Jacks", detail: "20 reps × 3 sets", type: "cardio" },
      { name: "Squats", detail: "15 reps × 3 sets", type: "strength" },
      { name: "Plank", detail: "30 sec × 3 sets", type: "core" },
      { name: "Crunches", detail: "15 reps × 3 sets", type: "core" },
    ],
  },
  {
    day: "Friday",
    emoji: "🍑",
    theme: "Lower Body + Core",
    intensity: "Moderate",
    exercises: [
      { name: "Walk", detail: "30–40 mins", type: "cardio" },
      { name: "Squats", detail: "15 reps × 3 sets", type: "strength" },
      { name: "Glute Bridges", detail: "15 reps × 3 sets", type: "strength" },
      { name: "Leg Raises", detail: "10 reps × 3 sets", type: "core" },
      { name: "Plank", detail: "30 sec × 3 sets", type: "core" },
    ],
  },
  {
    day: "Saturday",
    emoji: "💥",
    theme: "Burn Day (Fun + Intense)",
    intensity: "High",
    exercises: [
      { name: "Walk", detail: "45–60 mins", type: "cardio" },
      { name: "High Knees", detail: "20 reps × 3 sets", type: "cardio" },
      { name: "Jumping Jacks", detail: "20 reps × 3 sets", type: "cardio" },
      { name: "Russian Twists", detail: "20 reps × 3 sets", type: "core" },
      { name: "Plank", detail: "30 sec × 3 sets", type: "core" },
    ],
  },
  {
    day: "Sunday",
    emoji: "🌿",
    theme: "Rest (but not lazy)",
    intensity: "Rest",
    exercises: [
      { name: "Light Walk", detail: "20–30 mins", type: "cardio" },
      { name: "Gentle Stretching", detail: "5–10 mins", type: "flexibility" },
    ],
  },
];

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const TYPE_COLORS: Record<string, string> = {
  cardio: "bg-chart-1/10 text-chart-1",
  strength: "bg-secondary/10 text-secondary-foreground",
  core: "bg-accent text-accent-foreground",
  flexibility: "bg-chart-2/10 text-foreground",
};

const INTENSITY_BADGE: Record<string, string> = {
  Easy: "bg-secondary/20 text-secondary-foreground",
  Moderate: "bg-chart-3/15 text-foreground",
  High: "bg-primary/15 text-primary",
  Rest: "bg-muted text-muted-foreground",
};

export default function Fitness() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("glowup_fitness_done") || "{}");
    } catch {
      return {};
    }
  });

  const toggleDone = (day: string) => {
    setDone((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      localStorage.setItem("glowup_fitness_done", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Fitness Plan
        </h1>
        <p className="text-muted-foreground mb-8">
          Your weekly training split — movement is medicine.
        </p>

        <div className="space-y-4">
          {WORKOUT_PLAN.map((day, idx) => {
            const isToday = DAY_INDEX[day.day] === TODAY_DAY;
            const isOpen = expanded === idx;
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                data-ocid={`fitness.item.${idx + 1}`}
              >
                <Card
                  className={`card-shadow rounded-2xl border-0 overflow-hidden ${isToday ? "ring-2 ring-primary" : ""}`}
                >
                  <button
                    type="button"
                    className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : idx)}
                    data-ocid={`fitness.toggle.${idx + 1}`}
                  >
                    <span className="text-3xl">{day.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-semibold text-lg text-foreground">
                          {day.day}
                        </span>
                        {isToday && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Today
                          </Badge>
                        )}
                        <Badge
                          className={`text-xs ${INTENSITY_BADGE[day.intensity]}`}
                        >
                          {day.intensity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {day.theme}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {done[day.day] && (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      )}
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <CardContent className="px-6 pb-5 pt-0">
                      <div className="border-t border-border pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {day.exercises.map((ex) => (
                            <div
                              key={ex.name}
                              className="flex items-center gap-3 bg-muted/40 rounded-xl p-3"
                            >
                              <Circle className="w-3 h-3 text-primary shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {ex.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {ex.detail}
                                </p>
                              </div>
                              <Badge
                                className={`ml-auto text-xs ${TYPE_COLORS[ex.type] ?? "bg-muted"}`}
                              >
                                {ex.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant={done[day.day] ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleDone(day.day)}
                          className="rounded-full"
                          data-ocid={`fitness.button.${idx + 1}`}
                        >
                          {done[day.day] ? "✓ Completed" : "Mark as Done"}
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
