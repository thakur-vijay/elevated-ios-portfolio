import iconMyTuur from "@/assets/icon-mytuur.png";
import iconYatts from "@/assets/icon-yatts.png";
import iconYattsArtist from "@/assets/icon-yatts-artist.png";
import screenMyTuur from "@/assets/screen-mytuur.jpg";
import screenYatts from "@/assets/screen-yatts.jpg";
import screenYattsArtist from "@/assets/screen-yatts-artist.jpg";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  icon: string;
  hero: string;
  screenshots: string[];
  stack: string[];
  role: string;
  stats: { label: string; value: string }[];
  features: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  performance: { title: string; description: string }[];
  architecture: string;
  timeline: { phase: string; description: string }[];
  testimonial: { quote: string; author: string; role: string };
  appStoreUrl: string;
  accent: string; // tailwind gradient classes
};

export const projects: Project[] = [
  {
    slug: "mytuur",
    name: "MyTuur",
    tagline: "Discover the world, one journey at a time.",
    description:
      "A native iOS travel companion that turns destinations into beautifully curated journeys. Built with SwiftUI, MapKit, and a fully offline-capable Core Data engine.",
    category: "Travel",
    year: "2024",
    icon: iconMyTuur,
    hero: screenMyTuur,
    screenshots: [screenMyTuur, screenMyTuur, screenMyTuur, screenMyTuur],
    stack: ["Swift", "SwiftUI", "MapKit", "Core Data", "CloudKit", "Combine"],
    role: "iOS Lead · Product Engineering",
    stats: [
      { label: "Downloads", value: "120K+" },
      { label: "Rating", value: "4.8" },
      { label: "Countries", value: "42" },
      { label: "App Size", value: "18 MB" },
    ],
    features: [
      { title: "Offline Maps", description: "Vector tile prefetch with smart region eviction." },
      { title: "Live Activities", description: "Trip progress on the Lock Screen and Dynamic Island." },
      { title: "Shared Journeys", description: "CloudKit sharing for couples and travel groups." },
      { title: "Widgets", description: "Beautiful widgets for next destination, weather, and ETA." },
    ],
    challenges: [
      {
        title: "Smooth map rendering",
        description:
          "Reduced jank to under 1ms per frame via custom tile cache and Metal-backed annotation drawing.",
      },
      {
        title: "Sync conflict resolution",
        description: "Designed a CRDT-inspired merge layer over CloudKit zones for conflict-free trip edits.",
      },
    ],
    performance: [
      { title: "Cold start", description: "Reduced from 1.4s to 380ms via deferred module loading." },
      { title: "Memory", description: "Peak memory cut by 42% with image downsampling pipeline." },
      { title: "Battery", description: "Background location refined with significant-change geofencing." },
    ],
    architecture: "MVVM + Coordinators · Modular SwiftPM packages · Composable side-effects",
    timeline: [
      { phase: "Discovery", description: "Field research with frequent travelers across 6 cities." },
      { phase: "Prototyping", description: "SwiftUI prototypes validated 3 navigation models." },
      { phase: "Engineering", description: "Six-month build with weekly TestFlight cohorts." },
      { phase: "Launch", description: "Featured on the App Store in 14 countries." },
    ],
    testimonial: {
      quote: "Feels like Apple built it. Buttery smooth, every animation pixel-perfect.",
      author: "Liam Chen",
      role: "Design Director, Northwind",
    },
    appStoreUrl: "#",
    accent: "from-sky-400/30 via-cyan-300/10 to-transparent",
  },
  {
    slug: "yatts",
    name: "Yatts",
    tagline: "Music, immersively yours.",
    description:
      "A premium music streaming experience for iOS — spatial audio, lyric sync, and a now-playing engine engineered for buttery 120fps ProMotion.",
    category: "Music",
    year: "2023",
    icon: iconYatts,
    hero: screenYatts,
    screenshots: [screenYatts, screenYatts, screenYatts, screenYatts],
    stack: ["Swift", "SwiftUI", "AVFoundation", "Metal", "GRDB", "AsyncAlgorithms"],
    role: "Founding iOS Engineer",
    stats: [
      { label: "MAU", value: "480K" },
      { label: "Rating", value: "4.9" },
      { label: "Tracks", value: "60M" },
      { label: "Latency", value: "<80ms" },
    ],
    features: [
      { title: "Spatial Audio", description: "Head-tracked Dolby Atmos rendering on AirPods Pro." },
      { title: "Lyric Sync", description: "Frame-accurate karaoke timeline with tap-to-seek." },
      { title: "Crossfade Engine", description: "Beat-aligned crossfades with custom DSP." },
      { title: "Offline Library", description: "Encrypted track cache with smart prefetch." },
    ],
    challenges: [
      {
        title: "Audio gapless playback",
        description:
          "Built a custom AVAudioEngine pipeline replacing AVQueuePlayer to remove sample-level gaps.",
      },
      {
        title: "Real-time lyrics",
        description: "WebSocket-driven lyric stream synchronized to audio clock with drift correction.",
      },
    ],
    performance: [
      { title: "Scroll perf", description: "Constant 120fps on iPhone 15 Pro across 10K-row playlists." },
      { title: "Bandwidth", description: "Adaptive bitrate logic reduced data use by 31%." },
      { title: "Battery", description: "Idle audio playback uses under 4% per hour." },
    ],
    architecture: "TCA (The Composable Architecture) · Modular feature packages · Server-driven UI",
    timeline: [
      { phase: "MVP", description: "0 → 1 launch in 14 weeks with a team of three." },
      { phase: "Scaling", description: "Re-architected playback engine for 10× catalog growth." },
      { phase: "Spatial Audio", description: "Shipped Atmos in collaboration with mastering studios." },
      { phase: "Today", description: "Half a million monthly listeners, growing weekly." },
    ],
    testimonial: {
      quote: "The most considered music app I've used since the original iPod app.",
      author: "Maya Okonkwo",
      role: "Music Editor, Soundwave",
    },
    appStoreUrl: "#",
    accent: "from-fuchsia-400/30 via-purple-400/10 to-transparent",
  },
  {
    slug: "yatts-artist",
    name: "Yatts Artist",
    tagline: "Your studio, in your pocket.",
    description:
      "A pro-grade analytics and release-management app for recording artists. Real-time charts, royalty insights, and direct fan messaging.",
    category: "Creator Tools",
    year: "2024",
    icon: iconYattsArtist,
    hero: screenYattsArtist,
    screenshots: [screenYattsArtist, screenYattsArtist, screenYattsArtist, screenYattsArtist],
    stack: ["Swift", "SwiftUI", "Charts", "GraphQL", "WidgetKit", "App Intents"],
    role: "iOS Engineer · Product Owner",
    stats: [
      { label: "Artists", value: "8.5K" },
      { label: "Rating", value: "4.7" },
      { label: "Streams Tracked", value: "2.1B" },
      { label: "Release Time", value: "−68%" },
    ],
    features: [
      { title: "Live Analytics", description: "Real-time stream counts via WebSocket fan-out." },
      { title: "Smart Releases", description: "Automated ISRC + artwork validation on device." },
      { title: "Fan Messaging", description: "End-to-end encrypted broadcast messaging." },
      { title: "Siri Shortcuts", description: "App Intents for daily stats and release reminders." },
    ],
    challenges: [
      {
        title: "Real-time at scale",
        description: "Reduced WebSocket payload size 9× with binary deltas and ProtoBuf framing.",
      },
      {
        title: "Charts performance",
        description: "Rewrote chart layer in Metal to render 100K data points at 120fps.",
      },
    ],
    performance: [
      { title: "Time-to-interactive", description: "Sub-second for the analytics dashboard." },
      { title: "Network", description: "Deferred non-critical requests after first frame." },
      { title: "Storage", description: "Snapshot caching with LRU eviction under 50MB." },
    ],
    architecture: "Clean Architecture · UseCase-driven · Modular SwiftPM workspace",
    timeline: [
      { phase: "Concept", description: "Born from artist interviews around release-day anxiety." },
      { phase: "Beta", description: "Closed beta with 200 indie artists shaping the roadmap." },
      { phase: "1.0", description: "Launched alongside the Yatts platform expansion." },
      { phase: "Pro Tier", description: "Power-user features for managers and labels." },
    ],
    testimonial: {
      quote: "The dashboard I always wished existed. Fast, calm, beautifully made.",
      author: "Theo Marín",
      role: "Independent Artist",
    },
    appStoreUrl: "#",
    accent: "from-orange-400/30 via-rose-400/10 to-transparent",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
