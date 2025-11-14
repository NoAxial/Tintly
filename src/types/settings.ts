export interface UserSettings {
  // Appearance
  theme: "dark" | "light" | "auto";
  glassIntensity: "subtle" | "balanced" | "prominent";
  animationsEnabled: boolean;

  // Wardrobe Preferences
  defaultContext: "casual" | "work" | "evening" | "relaxed";
  smartSuggestions: boolean;
  showColorAnalysis: boolean;
  autoCategorize: boolean;

  // Data & Privacy
  localStorageOnly: boolean;
  autoBackup: boolean;
}

export const defaultSettings: UserSettings = {
  theme: "dark",
  glassIntensity: "balanced",
  animationsEnabled: true,
  defaultContext: "casual",
  smartSuggestions: true,
  showColorAnalysis: true,
  autoCategorize: false,
  localStorageOnly: true,
  autoBackup: true,
};

export interface SettingsSection {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export type GlassIntensity = UserSettings["glassIntensity"];
export type DefaultContext = UserSettings["defaultContext"];