import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

const TOPICS = [
  {
    emoji: "🎯",
    title: "Choosing Discipline",
    text: "Discipline is not punishment — it is the highest form of self-respect. Every time you keep a promise to yourself, you are telling your body and mind: you are worth the effort. This journey is built on daily micro-commitments that compound into extraordinary transformation.",
  },
  {
    emoji: "🌱",
    title: "Improving Health & Habits",
    text: "Health is not a destination — it is a practice. Moving your body, nourishing it with real food, hydrating, and resting are acts of love. Small daily choices — morning water, a 30-minute walk, a consistent bedtime — become your new identity.",
  },
  {
    emoji: "💎",
    title: "Building Confidence",
    text: "Confidence is built through action, not waiting. Every workout completed, every healthy meal chosen, every day you show up — these build an unshakeable inner knowing. Your body is becoming stronger. Your posture is improving. You are becoming the woman who does what she says.",
  },
  {
    emoji: "✨",
    title: "Becoming a Refined Version",
    text: "This is not a transformation into someone else. It is an unveiling — removing the habits, the noise, and the neglect to reveal who you have always been underneath. The most refined version of you was always there, waiting for you to choose her.",
  },
];

const TIMELINE = [
  { date: "April 1", label: "Start", emoji: "🌱", color: "bg-muted" },
  { date: "April 22", label: "3 Weeks", emoji: "🌿", color: "bg-secondary/20" },
  { date: "May 20", label: "5 Weeks", emoji: "🌸", color: "bg-accent" },
  { date: "June 22", label: "Final", emoji: "✨", color: "bg-primary/15" },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            About My Glow-Up
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            This is an 83-day personal transformation journey — from April 1 to
            June 22, 2026. It is not about becoming someone else. It is about
            peeling back the layers, building discipline, and stepping fully
            into the strongest version of yourself.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No shortcuts. No body shaming. No unrealistic standards. Just
            consistent, loving daily actions that compound into a body that
            feels strong, skin that glows, a posture that commands respect, and
            a mind that is clear and capable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TOPICS.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="card-shadow rounded-2xl border-0 h-full hover:scale-[1.01] transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{topic.emoji}</div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {topic.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="card-shadow rounded-2xl border-0 mb-12">
          <CardContent className="p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
              Journey Timeline
            </h2>
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden md:block" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.date}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-2xl mb-3 relative z-10 border-2 border-card`}
                    >
                      {item.emoji}
                    </div>
                    <p className="font-serif font-semibold text-foreground text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          className="rose-gradient rounded-3xl py-16 px-8 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <blockquote className="font-serif italic text-2xl md:text-4xl text-foreground leading-relaxed max-w-2xl mx-auto">
            “I am not changing who I am.
            <br />I am refining and elevating myself.”
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            April 1 – June 22, 2026 • 83 Days of Grace & Grit
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
