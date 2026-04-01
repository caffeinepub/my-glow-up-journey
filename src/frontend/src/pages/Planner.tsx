import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];
type HabitRow = Record<Day, boolean>;
type WeekHabits = Record<string, HabitRow>;

const HABITS = [
  { key: "morningWater", label: "Morning Water (1–2 glasses)", emoji: "💧" },
  {
    key: "proteinBreakfast",
    label: "Protein Breakfast (poha/oats/yogurt/upma)",
    emoji: "🥣",
  },
  { key: "workout", label: "Workout – 30 mins", emoji: "🏃‍♀️" },
  { key: "steps", label: "Steps – 8k–10k", emoji: "👟" },
  { key: "healthyMeals", label: "Healthy Meals – 3 meals", emoji: "🥗" },
  { key: "noJunk", label: "No Junk Food", emoji: "🚫" },
  { key: "waterIntake", label: "Water Intake – 2–3 L", emoji: "🫗" },
  { key: "corePosture", label: "Core / Posture Work – 10 mins", emoji: "🧘‍♀️" },
  { key: "skinCare", label: "Skincare AM + PM", emoji: "✨" },
];

function emptyRow(): HabitRow {
  return {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };
}

function emptyWeek(): WeekHabits {
  const r: WeekHabits = {};
  for (const h of HABITS) r[h.key] = emptyRow();
  return r;
}

function loadWeek(week: number): WeekHabits {
  try {
    const raw = localStorage.getItem(`glowup_week_${week}`);
    if (raw) return JSON.parse(raw) as WeekHabits;
  } catch {}
  return emptyWeek();
}

function saveWeek(week: number, data: WeekHabits) {
  localStorage.setItem(`glowup_week_${week}`, JSON.stringify(data));
}

function computeStreak(key: string): number {
  let streak = 0;
  for (let w = 12; w >= 1; w--) {
    const data = loadWeek(w);
    const row = data[key];
    if (row && DAYS.every((d) => row[d])) streak++;
    else break;
  }
  return streak;
}

function dayCompletion(habits: WeekHabits, day: Day): number {
  const done = HABITS.filter((h) => habits[h.key]?.[day]).length;
  return Math.round((done / HABITS.length) * 100);
}

export default function Planner() {
  const [week, setWeek] = useState(1);
  const [habits, setHabits] = useState<WeekHabits>(() => loadWeek(1));

  useEffect(() => {
    setHabits(loadWeek(week));
  }, [week]);

  const toggle = useCallback(
    (key: string, day: Day) => {
      setHabits((prev) => {
        const next = {
          ...prev,
          [key]: { ...prev[key], [day]: !prev[key]?.[day] },
        };
        saveWeek(week, next);
        return next;
      });
    },
    [week],
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Body & Lifestyle Planner
        </h1>
        <p className="text-muted-foreground mb-8">
          Track your daily habits and build unstoppable momentum.
        </p>

        <div className="flex items-center gap-4 mb-8">
          <Label htmlFor="week-select" className="font-medium text-sm">
            Week
          </Label>
          <Select
            value={String(week)}
            onValueChange={(v) => setWeek(Number(v))}
          >
            <SelectTrigger
              id="week-select"
              className="w-32"
              data-ocid="planner.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                <SelectItem key={w} value={String(w)}>
                  Week {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="card-shadow rounded-2xl border-0 overflow-hidden">
          <CardHeader className="bg-accent px-6 py-4">
            <CardTitle className="font-serif text-xl">
              Week {week} Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground w-64">
                      Habit
                    </th>
                    {DAYS.map((d) => (
                      <th
                        key={d}
                        className="px-4 py-3 text-center text-sm font-medium text-muted-foreground"
                      >
                        {d}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {HABITS.map((habit, idx) => (
                    <tr
                      key={habit.key}
                      className={`border-b border-border transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{habit.emoji}</span>
                          <span className="text-sm font-medium text-foreground">
                            {habit.label}
                          </span>
                        </div>
                      </td>
                      {DAYS.map((day) => (
                        <td key={day} className="px-4 py-3 text-center">
                          <Checkbox
                            id={`${habit.key}-${day}`}
                            checked={habits[habit.key]?.[day] ?? false}
                            onCheckedChange={() => toggle(habit.key, day)}
                            data-ocid={`planner.checkbox.${idx + 1}`}
                            className="mx-auto"
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <Badge variant="secondary" className="text-xs">
                          {computeStreak(habit.key)}w
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-accent/50">
                    <td className="px-4 py-3 text-sm font-semibold text-muted-foreground">
                      Day Completion
                    </td>
                    {DAYS.map((day) => (
                      <td key={day} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-semibold text-primary">
                            {dayCompletion(habits, day)}%
                          </span>
                          <Progress
                            value={dayCompletion(habits, day)}
                            className="h-1.5 w-12"
                          />
                        </div>
                      </td>
                    ))}
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-accent rounded-2xl">
          <p className="font-serif italic text-center text-muted-foreground">
            “Small daily improvements lead to stunning results.” — Your future
            self
          </p>
        </div>
      </motion.div>
    </div>
  );
}
