import { AudioWaveform, ScanEye, Gem, HeartPulse, Clapperboard, Dice6, Trophy, Building2, TrendingUp, Activity, GraduationCap, BarChart3, Zap, Layers } from "lucide-react";
import type { Project } from "@/lib/types";

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const projectIcons: Record<string, typeof AudioWaveform> = {
  vaani: AudioWaveform,
  "serenity": HeartPulse,
  "gondilal-saraf": Gem,
  "watch-together": Clapperboard,
  "fair-ludo": Dice6,
  "glass-table-games": Dice6,
  "goel-studio": Layers,
  "mlb-playoff-cogs108": Trophy,
  "arkinvest-anduril-mgt127r": Building2,
  "arkinvest-mgt127r": TrendingUp,
  "har-cse158": Activity,
  "cogs9-final": GraduationCap,
  "redbull-youtube-analytics": BarChart3,
  "power-grid-analysis": Zap,
};

export const DefaultProjectIcon = ScanEye;
