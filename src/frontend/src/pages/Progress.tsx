import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const JOURNEY_START = new Date("2026-04-01");
const JOURNEY_END = new Date("2026-06-22");
const TOTAL_DAYS = Math.floor(
  (JOURNEY_END.getTime() - JOURNEY_START.getTime()) / (1000 * 60 * 60 * 24),
);
const TODAY = new Date("2026-04-01");
const DAYS_ELAPSED = Math.max(
  0,
  Math.floor(
    (TODAY.getTime() - JOURNEY_START.getTime()) / (1000 * 60 * 60 * 24),
  ),
);

type ProgressEntry = {
  week: number;
  weight: string;
  waist: string;
  avgSteps: string;
  workoutDays: number;
  confidenceLevel: number;
  reflection: string;
};

function loadEntries(): ProgressEntry[] {
  try {
    return JSON.parse(localStorage.getItem("glowup_progress_entries") || "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries: ProgressEntry[]) {
  localStorage.setItem("glowup_progress_entries", JSON.stringify(entries));
}

export default function ProgressPage() {
  const [week, setWeek] = useState(1);
  const [entries, setEntries] = useState<ProgressEntry[]>(loadEntries);
  const [form, setForm] = useState({
    weight: "",
    waist: "",
    avgSteps: "",
    workoutDays: 0,
    confidenceLevel: 3,
    reflection: "",
  });

  const handleSave = () => {
    const updated = entries.filter((e) => e.week !== week);
    updated.push({ ...form, week });
    updated.sort((a, b) => a.week - b.week);
    setEntries(updated);
    saveEntries(updated);
    toast.success(`Week ${week} progress saved! Keep going 🌸`);
  };

  const existing = entries.find((e) => e.week === week);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Progress Tracker
        </h1>
        <p className="text-muted-foreground mb-8">
          Every measurement is a snapshot of how far you've come.
        </p>

        <Card className="card-shadow rounded-2xl border-0 mb-8 bg-accent">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">Journey Progress</span>
              <span className="text-sm text-primary font-bold">
                {DAYS_ELAPSED} / {TOTAL_DAYS} days
              </span>
            </div>
            <Progress
              value={Math.round((DAYS_ELAPSED / TOTAL_DAYS) * 100)}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Apr 1</span>
              <span>Apr 22</span>
              <span>May 20</span>
              <span>Jun 22</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Log Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="week-select"
                  className="text-sm font-medium mb-1 block"
                >
                  Week
                </Label>
                <Select
                  value={String(week)}
                  onValueChange={(v) => setWeek(Number(v))}
                >
                  <SelectTrigger id="week-select" data-ocid="progress.select">
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
                {existing && (
                  <p className="text-xs text-primary mt-1">
                    Entry exists — saving will overwrite.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="weight-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight-input"
                    placeholder="e.g. 58.5"
                    value={form.weight}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, weight: e.target.value }))
                    }
                    data-ocid="progress.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="waist-input"
                    className="text-sm font-medium mb-1 block"
                  >
                    Waist (cm)
                  </Label>
                  <Input
                    id="waist-input"
                    placeholder="e.g. 72"
                    value={form.waist}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, waist: e.target.value }))
                    }
                    data-ocid="progress.input"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="steps-input"
                  className="text-sm font-medium mb-1 block"
                >
                  Avg Daily Steps
                </Label>
                <Input
                  id="steps-input"
                  placeholder="e.g. 9000"
                  value={form.avgSteps}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, avgSteps: e.target.value }))
                  }
                  data-ocid="progress.input"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Workout Days Completed: {form.workoutDays}/7
                </Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setForm((p) => ({ ...p, workoutDays: d }))}
                      className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                        d <= form.workoutDays
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Confidence Level
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() =>
                        setForm((p) => ({ ...p, confidenceLevel: s }))
                      }
                      data-ocid="progress.toggle"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${s <= form.confidenceLevel ? "fill-chart-3 text-chart-3" : "text-border"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="reflection-textarea"
                  className="text-sm font-medium mb-1 block"
                >
                  Weekly Reflection
                </Label>
                <Textarea
                  id="reflection-textarea"
                  placeholder="How did this week feel? What went well? What will you improve?"
                  value={form.reflection}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, reflection: e.target.value }))
                  }
                  rows={3}
                  data-ocid="progress.textarea"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full rounded-full bg-primary text-primary-foreground"
                data-ocid="progress.submit_button"
              >
                Save Progress ✨
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="card-shadow rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="font-serif text-lg">
                  Progress Log
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {entries.length === 0 ? (
                  <div
                    className="p-6 text-center text-muted-foreground text-sm"
                    data-ocid="progress.empty_state"
                  >
                    No entries yet — start logging your journey!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Wk
                          </th>
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Weight
                          </th>
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Waist
                          </th>
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Steps
                          </th>
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Workout
                          </th>
                          <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">
                            Mood
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry) => (
                          <tr
                            key={entry.week}
                            className="border-b border-border last:border-0"
                          >
                            <td className="px-4 py-2 text-sm font-semibold text-primary">
                              W{entry.week}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {entry.weight || "—"} kg
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {entry.waist || "—"} cm
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {entry.avgSteps || "—"}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              <Progress
                                value={(entry.workoutDays / 7) * 100}
                                className="h-1.5 w-16"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex">
                                {Array.from({
                                  length: entry.confidenceLevel,
                                }).map((_, j) => (
                                  <Star
                                    key={`star-${entry.week}-${j}`}
                                    className="w-3 h-3 fill-chart-3 text-chart-3"
                                  />
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="card-shadow rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="font-serif text-lg">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Weeks tracked
                  </span>
                  <Badge className="bg-primary/15 text-primary">
                    {entries.length} / 12
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Avg confidence
                  </span>
                  <Badge className="bg-chart-3/15 text-foreground">
                    {entries.length > 0
                      ? (
                          entries.reduce((a, b) => a + b.confidenceLevel, 0) /
                          entries.length
                        ).toFixed(1)
                      : "—"}{" "}
                    ⭐
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total workout days
                  </span>
                  <Badge className="bg-secondary/15 text-secondary-foreground">
                    {entries.reduce((a, b) => a + b.workoutDays, 0)} days
                  </Badge>
                </div>
                <Progress
                  value={
                    entries.length > 0
                      ? (entries.reduce((a, b) => a + b.workoutDays, 0) /
                          (entries.length * 7)) *
                        100
                      : 0
                  }
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground text-right">
                  Workout consistency rate
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
