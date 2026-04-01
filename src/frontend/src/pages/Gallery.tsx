import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, ImagePlus } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CHECKPOINTS = [
  {
    id: "start",
    label: "The Beginning",
    date: "April 1, 2026",
    emoji: "🌱",
    description: "Day 1 — where every transformation begins",
  },
  {
    id: "three-weeks",
    label: "3 Weeks In",
    date: "April 22, 2026",
    emoji: "🌿",
    description: "Habits forming, energy rising",
  },
  {
    id: "five-weeks",
    label: "5 Weeks In",
    date: "May 20, 2026",
    emoji: "🌸",
    description: "Midpoint milestone — changes visible",
  },
  {
    id: "final",
    label: "Final Reveal",
    date: "June 22, 2026",
    emoji: "✨",
    description: "83 days of discipline",
  },
];

type GalleryData = Record<string, { imageUrl?: string; caption: string }>;

function loadGallery(): GalleryData {
  try {
    return JSON.parse(localStorage.getItem("glowup_gallery") || "{}");
  } catch {
    return {};
  }
}

function saveGallery(data: GalleryData) {
  localStorage.setItem("glowup_gallery", JSON.stringify(data));
}

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryData>(loadGallery);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileUpload = (checkpointId: string, file: File) => {
    setUploading(checkpointId);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setGallery((prev) => {
        const next = {
          ...prev,
          [checkpointId]: {
            ...prev[checkpointId],
            imageUrl,
            caption: prev[checkpointId]?.caption || "",
          },
        };
        saveGallery(next);
        return next;
      });
      setUploading(null);
      toast.success("Photo added! 📸");
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (checkpointId: string, caption: string) => {
    setGallery((prev) => {
      const next = {
        ...prev,
        [checkpointId]: { ...prev[checkpointId], caption },
      };
      saveGallery(next);
      return next;
    });
  };

  const startGallery = gallery.start;
  const finalGallery = gallery.final;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
          Transformation Gallery
        </h1>
        <p className="text-muted-foreground mb-8">
          Document your journey — every photo is proof of your commitment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CHECKPOINTS.map((cp, i) => (
            <motion.div
              key={cp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <Card className="card-shadow rounded-2xl border-0 overflow-hidden h-full">
                <button
                  type="button"
                  className="relative bg-muted/40 flex items-center justify-center cursor-pointer group w-full"
                  style={{ height: 260 }}
                  onClick={() => fileRefs.current[cp.id]?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") fileRefs.current[cp.id]?.click();
                  }}
                  data-ocid={`gallery.upload_button.${i + 1}`}
                >
                  {gallery[cp.id]?.imageUrl ? (
                    <img
                      src={gallery[cp.id]?.imageUrl}
                      alt={cp.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                      <ImagePlus className="w-12 h-12" />
                      <p className="text-sm font-medium">Click to add photo</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  {gallery[cp.id]?.imageUrl && (
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white drop-shadow" />
                    </div>
                  )}
                  {uploading === cp.id && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <div
                        className="text-sm font-medium text-primary"
                        data-ocid={`gallery.loading_state.${i + 1}`}
                      >
                        Uploading...
                      </div>
                    </div>
                  )}
                  <input
                    ref={(el) => {
                      fileRefs.current[cp.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(cp.id, file);
                    }}
                  />
                </button>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{cp.emoji}</span>
                    <h3 className="font-serif font-semibold text-lg text-foreground">
                      {cp.label}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {cp.date}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 italic">
                    {cp.description}
                  </p>
                  <Input
                    placeholder="Add a caption..."
                    value={gallery[cp.id]?.caption || ""}
                    onChange={(e) => handleCaptionChange(cp.id, e.target.value)}
                    className="text-sm"
                    data-ocid={`gallery.input.${i + 1}`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {(startGallery?.imageUrl || finalGallery?.imageUrl) && (
          <Card className="card-shadow rounded-2xl border-0 mb-8">
            <CardContent className="p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">
                Before & After ✨
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Badge className="mb-2 bg-muted text-muted-foreground">
                    April 1 — Before
                  </Badge>
                  <div className="bg-muted/40 rounded-xl overflow-hidden h-48">
                    {startGallery?.imageUrl ? (
                      <img
                        src={startGallery.imageUrl}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No photo yet
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Badge className="mb-2 bg-primary/15 text-primary">
                    June 22 — After
                  </Badge>
                  <div className="bg-muted/40 rounded-xl overflow-hidden h-48">
                    {finalGallery?.imageUrl ? (
                      <img
                        src={finalGallery.imageUrl}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Check back on June 22
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="card-shadow rounded-2xl border-0">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">
              Posture Comparison Notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  cp: "April 1",
                  note: "Take a side profile photo. Note shoulder position, head forward position, lower back curve.",
                },
                {
                  cp: "May 20",
                  note: "Compare shoulder alignment. Check if head has come back. Notice waist definition.",
                },
                {
                  cp: "June 22",
                  note: "Final comparison. Document improvements in spine alignment, shoulder opening, overall presence.",
                },
              ].map((item) => (
                <div key={item.cp} className="bg-muted/40 rounded-xl p-4">
                  <p className="font-serif font-semibold text-primary text-sm mb-2">
                    {item.cp}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
