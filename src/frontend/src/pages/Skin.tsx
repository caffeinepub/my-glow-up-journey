import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Droplets, Moon, Sparkles, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TODAY_KEY = "2026-04-01";

const MORNING_ITEMS = [
  { key: "cleanser", label: "Cleanser", emoji: "🫧" },
  { key: "toner", label: "Toner", emoji: "💦" },
  { key: "moisturizer", label: "Moisturizer", emoji: "🧴" },
  { key: "sunscreen", label: "Sunscreen SPF 30+", emoji: "☀️" },
  { key: "eyeCream", label: "Eye Cream", emoji: "👁️" },
  { key: "lipBalm", label: "Lip Balm", emoji: "💋" },
];

const NIGHT_ITEMS = [
  { key: "cleanserNight", label: "Double Cleanse", emoji: "🫧" },
  { key: "tonerNight", label: "Toner / Essence", emoji: "💦" },
  { key: "serum", label: "Serum (Vitamin C / Niacinamide)", emoji: "✨" },
  { key: "nightCream", label: "Night Cream", emoji: "🌙" },
  { key: "faceOil", label: "Face Oil (Rosehip / Jojoba)", emoji: "🌹" },
  { key: "eyeCreamNight", label: "Eye Cream", emoji: "👁️" },
];

type ChecklistState = Record<string, boolean>;

function loadChecklist(type: "morning" | "night"): ChecklistState {
  try {
    return JSON.parse(
      localStorage.getItem(`glowup_skin_${type}_${TODAY_KEY}`) || "{}",
    );
  } catch {
    return {};
  }
}

function saveChecklist(type: "morning" | "night", data: ChecklistState) {
  localStorage.setItem(
    `glowup_skin_${type}_${TODAY_KEY}`,
    JSON.stringify(data),
  );
}

export default function Skin() {
  const [morning, setMorning] = useState<ChecklistState>(() =>
    loadChecklist("morning"),
  );
  const [night, setNight] = useState<ChecklistState>(() =>
    loadChecklist("night"),
  );
  const [water, setWater] = useState<number>(() =>
    Number.parseInt(localStorage.getItem("glowup_water_today") || "0"),
  );
  const [sleep, setSleep] = useState<number>(() =>
    Number.parseFloat(localStorage.getItem("glowup_sleep_today") || "7"),
  );

  const toggleMorning = (key: string) => {
    setMorning((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveChecklist("morning", next);
      return next;
    });
  };
  const toggleNight = (key: string) => {
    setNight((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveChecklist("night", next);
      return next;
    });
  };

  const toggleWater = (glass: number) => {
    const next = water === glass ? glass - 1 : glass;
    setWater(next);
    localStorage.setItem("glowup_water_today", String(next));
  };

  const morningDone = MORNING_ITEMS.filter((i) => morning[i.key]).length;
  const nightDone = NIGHT_ITEMS.filter((i) => night[i.key]).length;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Skin & Self-Care
        </h1>
        <p className="text-muted-foreground mb-8">
          Glow from the inside out — consistency is your skincare secret.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif flex items-center gap-2">
                <Sun className="w-5 h-5 text-chart-3" />
                Morning Routine
                <Badge className="ml-auto bg-chart-3/15 text-foreground">
                  {morningDone}/{MORNING_ITEMS.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MORNING_ITEMS.map((item, i) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3"
                  data-ocid={`skin.checkbox.${i + 1}`}
                >
                  <Checkbox
                    id={`morning-${item.key}`}
                    checked={!!morning[item.key]}
                    onCheckedChange={() => toggleMorning(item.key)}
                  />
                  <Label
                    htmlFor={`morning-${item.key}`}
                    className={`flex items-center gap-2 cursor-pointer text-sm font-medium transition-colors ${
                      morning[item.key]
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    {item.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Night Routine
                <Badge className="ml-auto bg-primary/15 text-primary">
                  {nightDone}/{NIGHT_ITEMS.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {NIGHT_ITEMS.map((item, i) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3"
                  data-ocid={`skin.checkbox.${i + 7}`}
                >
                  <Checkbox
                    id={`night-${item.key}`}
                    checked={!!night[item.key]}
                    onCheckedChange={() => toggleNight(item.key)}
                  />
                  <Label
                    htmlFor={`night-${item.key}`}
                    className={`flex items-center gap-2 cursor-pointer text-sm font-medium transition-colors ${
                      night[item.key]
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    {item.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Water Intake
                <Badge className="ml-auto">{water}/8 glasses</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => toggleWater(g)}
                    data-ocid="skin.toggle"
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 text-sm font-semibold ${
                      g <= water
                        ? "bg-blue-400/20 border-blue-400 text-blue-600"
                        : "bg-muted border-border text-muted-foreground hover:border-blue-300"
                    }`}
                  >
                    {g <= water ? "💧" : g}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">
                Goal: 8 glasses · {Math.round(water * 250)}ml consumed
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif flex items-center gap-2">
                <Moon className="w-5 h-5 text-secondary" />
                Sleep Tracker
                <Badge className="ml-auto bg-secondary/20 text-secondary-foreground">
                  {sleep}h
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="px-2 pt-4">
                <Slider
                  min={5}
                  max={9}
                  step={0.5}
                  value={[sleep]}
                  onValueChange={([v]) => {
                    setSleep(v);
                    localStorage.setItem("glowup_sleep_today", String(v));
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5h</span>
                  <span
                    className={`font-semibold ${sleep >= 7 ? "text-secondary-foreground" : "text-primary"}`}
                  >
                    {sleep >= 7
                      ? "Great sleep! ✨"
                      : sleep >= 6
                        ? "Okay — aim for more"
                        : "Too little — rest more"}
                  </span>
                  <span>9h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg">
                Weekly Skin Reset 🌿
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  {
                    day: "Sunday",
                    task: "Clay mask – deep pore cleanse",
                    emoji: "🧖‍♀️",
                  },
                  {
                    day: "Wednesday",
                    task: "Gentle chemical exfoliant (BHA/AHA)",
                    emoji: "✨",
                  },
                  {
                    day: "Friday",
                    task: "Sheet mask – hydration boost",
                    emoji: "💦",
                  },
                  {
                    day: "Saturday",
                    task: "Face massage + gua sha",
                    emoji: "💎",
                  },
                ].map((item) => (
                  <li key={item.day} className="flex items-start gap-3 text-sm">
                    <span>{item.emoji}</span>
                    <div>
                      <span className="font-semibold text-primary">
                        {item.day}:
                      </span>{" "}
                      <span className="text-muted-foreground">{item.task}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="card-shadow rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg">
                Hair Care Schedule 💆‍♀️
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  {
                    day: "Thursday",
                    task: "Pre-wash oil treatment (coconut / argan)",
                    emoji: "🌴",
                  },
                  {
                    day: "Friday",
                    task: "Shampoo + deep condition",
                    emoji: "🚿",
                  },
                  {
                    day: "Sunday",
                    task: "Hair mask + scalp massage",
                    emoji: "🌸",
                  },
                  {
                    day: "Everyday",
                    task: "Gentle detangle, no tight pulls",
                    emoji: "🌬️",
                  },
                ].map((item) => (
                  <li key={item.day} className="flex items-start gap-3 text-sm">
                    <span>{item.emoji}</span>
                    <div>
                      <span className="font-semibold text-secondary-foreground">
                        {item.day}:
                      </span>{" "}
                      <span className="text-muted-foreground">{item.task}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="card-shadow rounded-2xl border-0 bg-accent">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Monthly Glow Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  month: "April",
                  goal: "Establish consistent AM/PM routine, double water intake, reduce junk food",
                  emoji: "🌱",
                },
                {
                  month: "May",
                  goal: "Introduce serum, weekly treatments, noticeable skin texture improvement",
                  emoji: "🌿",
                },
                {
                  month: "June",
                  goal: "Natural glow, even skin tone, fully nourished and radiant finish",
                  emoji: "✨",
                },
              ].map((item) => (
                <div key={item.month} className="bg-card rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h4 className="font-serif font-semibold text-primary mb-1">
                    {item.month}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
