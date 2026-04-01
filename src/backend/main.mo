import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

persistent actor {
  // ── Types ───────────────────────────────────────────────────────────────
  public type HabitRow = {
    mon : Bool; tue : Bool; wed : Bool; thu : Bool; fri : Bool; sat : Bool; sun : Bool;
  };

  public type WeekHabits = {
    morningWater : HabitRow;
    proteinBreakfast : HabitRow;
    workout : HabitRow;
    steps : HabitRow;
    healthyMeals : HabitRow;
    noJunk : HabitRow;
    waterIntake : HabitRow;
    corePosture : HabitRow;
    skinCare : HabitRow;
  };

  public type ProgressEntry = {
    week : Nat;
    weight : Float;
    waist : Float;
    avgSteps : Nat;
    workoutDays : Nat;
    confidenceLevel : Nat;
    reflection : Text;
  };

  public type GalleryEntry = {
    id : Text;
    checkpoint : Text;
    date : Text;
    caption : Text;
    blobId : ?Text;
  };

  public type SkinChecklist = {
    cleanser : Bool;
    toner : Bool;
    moisturizer : Bool;
    sunscreen : Bool;
    eyeCream : Bool;
    serum : Bool;
    lipBalm : Bool;
    nightCream : Bool;
    faceOil : Bool;
    sheetMask : Bool;
  };

  public type PostureChecklist = {
    chinTucked : Bool;
    shouldersBack : Bool;
    coreEngaged : Bool;
    feetFlat : Bool;
    screenEyeLevel : Bool;
    walkedTall : Bool;
    stretchedSpine : Bool;
  };

  // ── Persistent Maps ────────────────────────────────────────────────────
  let habitMap : Map.Map<Text, WeekHabits> = Map.empty();
  let progressMap : Map.Map<Nat, ProgressEntry> = Map.empty();
  let galleryMap : Map.Map<Text, GalleryEntry> = Map.empty();
  let skinMap : Map.Map<Text, SkinChecklist> = Map.empty();
  let postureMap : Map.Map<Text, PostureChecklist> = Map.empty();

  // ── Habit Tracker ──────────────────────────────────────────────────────────
  public func saveWeekHabits(weekKey : Text, habits : WeekHabits) : async () {
    habitMap.add(weekKey, habits);
  };

  public query func getWeekHabits(weekKey : Text) : async ?WeekHabits {
    habitMap.get(weekKey)
  };

  // ── Progress Tracker ───────────────────────────────────────────────────────
  public func saveProgressEntry(entry : ProgressEntry) : async () {
    progressMap.add(entry.week, entry);
  };

  public query func getProgressEntry(week : Nat) : async ?ProgressEntry {
    progressMap.get(week)
  };

  public query func getAllProgressEntries() : async [ProgressEntry] {
    let arr = progressMap.values().toArray();
    arr.sort(func(a : ProgressEntry, b : ProgressEntry) : { #less; #equal; #greater } {
      Nat.compare(a.week, b.week)
    })
  };

  // ── Gallery ────────────────────────────────────────────────────────────────
  public func saveGalleryEntry(entry : GalleryEntry) : async () {
    galleryMap.add(entry.id, entry);
  };

  public query func getAllGalleryEntries() : async [GalleryEntry] {
    galleryMap.values().toArray()
  };

  // ── Skin Checklist ─────────────────────────────────────────────────────────
  public func saveSkinChecklist(dateKey : Text, checklist : SkinChecklist) : async () {
    skinMap.add(dateKey, checklist);
  };

  public query func getSkinChecklist(dateKey : Text) : async ?SkinChecklist {
    skinMap.get(dateKey)
  };

  // ── Posture Checklist ──────────────────────────────────────────────────────
  public func savePostureChecklist(dateKey : Text, checklist : PostureChecklist) : async () {
    postureMap.add(dateKey, checklist);
  };

  public query func getPostureChecklist(dateKey : Text) : async ?PostureChecklist {
    postureMap.get(dateKey)
  };
};
