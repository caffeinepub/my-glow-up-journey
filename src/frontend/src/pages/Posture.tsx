import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TODAY_KEY = "2026-04-01";

const POSTURE_CHECKLIST = [
  {
    key: "chinTucked",
    label: "Chin tucked (neutral neck position)",
    emoji: "🧠",
  },
  { key: "shouldersBack", label: "Shoulders back and relaxed", emoji: "💪" },
  { key: "coreEngaged", label: "Core lightly engaged", emoji: "🎯" },
  { key: "feetFlat", label: "Feet flat on the floor when seated", emoji: "👟" },
  { key: "screenEyeLevel", label: "Screen at eye level", emoji: "💻" },
  { key: "walkedTall", label: "Walked tall with lifted crown", emoji: "👑" },
  { key: "stretchedSpine", label: "Spinal stretch done today", emoji: "🌿" },
];

const EXERCISE_GROUPS = [
  {
    title: "Back & Shoulder Strengthening",
    emoji: "🏋️‍♀️",
    exercises: [
      {
        name: "Cat-Cow",
        sets: "10 reps × 3",
        desc: "On all fours, alternate between arching and rounding the spine.",
      },
      {
        name: "Wall Angels",
        sets: "10 reps × 3",
        desc: "Stand against wall, arms at 90°, slide up and down keeping contact.",
      },
      {
        name: "Band Pull-Aparts",
        sets: "15 reps × 3",
        desc: "Hold resistance band at shoulder height, pull apart to open chest.",
      },
      {
        name: "Face Pulls",
        sets: "12 reps × 3",
        desc: "Using band or cable, pull toward face with elbows high.",
      },
      {
        name: "Doorway Chest Stretch",
        sets: "30 sec × 3",
        desc: "Arms at 90° in doorframe, lean forward gently to open chest.",
      },
    ],
  },
  {
    title: "Core Stabilization",
    emoji: "🎯",
    exercises: [
      {
        name: "Dead Bug",
        sets: "8 each side × 3",
        desc: "On back, arms and legs extended, lower opposite arm/leg slowly.",
      },
      {
        name: "Bird Dog",
        sets: "8 each side × 3",
        desc: "On all fours, extend opposite arm and leg. Hold 3 sec.",
      },
      {
        name: "Pallof Press",
        sets: "10 reps × 3",
        desc: "Using band, press out from chest, resist rotation.",
      },
      {
        name: "Hollow Body Hold",
        sets: "20 sec × 3",
        desc: "On back, arms overhead, lower back pressed down, legs lifted.",
      },
    ],
  },
  {
    title: "Spine Mobility & Stretching",
    emoji: "🌿",
    exercises: [
      {
        name: "Thoracic Rotation",
        sets: "8 each side",
        desc: "Seated or lying, rotate upper back while hips stay still.",
      },
      {
        name: "Foam Roller Extension",
        sets: "60 sec",
        desc: "Place roller across mid-back, gently extend over it.",
      },
      {
        name: "Seated Spinal Twist",
        sets: "30 sec each side",
        desc: "Sit tall, twist from your waist — breathe and lengthen.",
      },
      {
        name: "Child's Pose",
        sets: "60 sec",
        desc: "Kneel and stretch arms forward — decompresses the entire spine.",
      },
    ],
  },
];

const ALIGNMENT_STEPS = [
  {
    step: "1",
    title: "Feet",
    desc: "Hip-width apart, weight evenly distributed.",
  },
  { step: "2", title: "Knees", desc: "Softly bent, track over second toe." },
  { step: "3", title: "Hips", desc: "Neutral pelvis, not tucked or arched." },
  { step: "4", title: "Core", desc: "Lightly engaged, not sucked in." },
  { step: "5", title: "Shoulders", desc: "Roll back and down, open chest." },
  { step: "6", title: "Head", desc: "Crown lifts, chin parallel to floor." },
];

type CheckState = Record<string, boolean>;

export default function Posture() {
  const [checked, setChecked] = useState<CheckState>(() => {
    try {
      return JSON.parse(
        localStorage.getItem(`glowup_posture_${TODAY_KEY}`) || "{}",
      );
    } catch {
      return {};
    }
  });

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`glowup_posture_${TODAY_KEY}`, JSON.stringify(next));
      return next;
    });
  };

  const totalDone = POSTURE_CHECKLIST.filter((i) => checked[i.key]).length;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Posture Improvement
        </h1>
        <p className="text-muted-foreground mb-8">
          Stand tall — your posture tells your story before you speak a word.
        </p>

        <Card className="card-shadow rounded-2xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              Daily Posture Checklist
              <Badge
                className={`ml-auto ${totalDone === POSTURE_CHECKLIST.length ? "bg-secondary/20 text-secondary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {totalDone}/{POSTURE_CHECKLIST.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POSTURE_CHECKLIST.map((item, i) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors"
                  data-ocid={`posture.checkbox.${i + 1}`}
                >
                  <Checkbox
                    id={`posture-${item.key}`}
                    checked={!!checked[item.key]}
                    onCheckedChange={() => toggle(item.key)}
                  />
                  <Label
                    htmlFor={`posture-${item.key}`}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <span>{item.emoji}</span>
                    <span
                      className={`text-sm font-medium ${checked[item.key] ? "line-through text-muted-foreground" : "text-foreground"}`}
                    >
                      {item.label}
                    </span>
                  </Label>
                  {checked[item.key] && (
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  )}
                </div>
              ))}
            </div>
            {totalDone === POSTURE_CHECKLIST.length && (
              <div className="mt-4 p-3 bg-secondary/10 rounded-xl text-center">
                <p className="text-sm font-serif italic text-secondary-foreground">
                  ✨ All posture goals checked today — you're standing tall!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {EXERCISE_GROUPS.map((group) => (
            <Card
              key={group.title}
              className="card-shadow rounded-2xl border-0"
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-base flex items-center gap-2">
                  <span>{group.emoji}</span>
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.exercises.map((ex) => (
                  <div
                    key={ex.name}
                    className="border-b border-border last:border-0 pb-3 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground">
                        {ex.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {ex.sets}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{ex.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-shadow rounded-2xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="font-serif">
              Standing Alignment Guide 👑
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {ALIGNMENT_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="text-center p-3 bg-muted/40 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2">
                    {s.step}
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="font-serif">Why Posture Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="font-medium text-foreground"
                  data-ocid="posture.toggle"
                >
                  How posture affects your appearance
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Good posture instantly makes you appear taller, leaner, and
                  more confident. Rounded shoulders create a hunched silhouette
                  that adds visual weight. Standing tall with an open chest can
                  make you look 2–3 cm taller and significantly slimmer. It also
                  affects how your clothes fit and drape on your body.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger
                  className="font-medium text-foreground"
                  data-ocid="posture.toggle"
                >
                  How fat loss improves body proportions
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  As you lose fat, especially around the waist and abdomen, your
                  natural body proportions become more visible. The waist-to-hip
                  ratio improves, creating feminine curves. Combined with muscle
                  toning in the glutes and core, fat loss creates a leaner,
                  sculpted silhouette that posture then displays beautifully.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger
                  className="font-medium text-foreground"
                  data-ocid="posture.toggle"
                >
                  How posture creates confidence and presence
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Research shows upright posture increases testosterone and
                  decreases cortisol — making you feel more powerful and less
                  stressed. People perceive those with good posture as more
                  competent, attractive, and authoritative. Your posture is your
                  silent introduction to every room you enter.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
