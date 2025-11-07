import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../hooks/useToast";
import { ToggleSwitch } from "../components/ui/ToggleSwitch";
import { SettingsCard } from "../components/ui/SettingsCard";
import Button from "../components/ui/Button";
import { UserSettings, defaultSettings } from "../types/settings";

export default function Settings(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const { showSuccess, showError } = useToast();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("tintly-settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }, []);

  // Auto-save settings with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveSettings();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [settings, theme]);

  const saveSettings = async () => {
    try {
      const settingsToSave = { ...settings, theme };
      localStorage.setItem("tintly-settings", JSON.stringify(settingsToSave));
      showSuccess("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save settings:", error);
      showError("Failed to save settings");
    }
  };

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
  };

  const handleSettingChange = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleClearData = async () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      try {
        localStorage.removeItem("tintly-settings");
        localStorage.removeItem("tintly-wardrobe");
        setSettings(defaultSettings);
        showSuccess("All data cleared successfully");
      } catch (error) {
        console.error("Failed to clear data:", error);
        showError("Failed to clear data");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Settings</h1>
        <p className="text-white/70">
          Customize your Tintly experience with these preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <SettingsCard title="Appearance">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block">
                Theme
              </label>
              <div className="flex gap-2">
                {(["dark", "light", "auto"] as const).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => handleThemeChange(themeOption)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${theme === themeOption
                        ? "btn-primary-sheen text-black"
                        : "glass-subtle text-white/80 hover:text-white border border-white/20"
                      }
                    `}
                  >
                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <ToggleSwitch
              checked={settings.animationsEnabled}
              onChange={(checked) => handleSettingChange("animationsEnabled", checked)}
              label="Enable Animations"
              description="Smooth transitions and micro-interactions"
            />

            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block">
                Glass Effect Intensity
              </label>
              <div className="flex gap-2">
                {(["subtle", "balanced", "prominent"] as const).map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => handleSettingChange("glassIntensity", intensity)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${settings.glassIntensity === intensity
                        ? "btn-primary-sheen text-black"
                        : "glass-subtle text-white/80 hover:text-white border border-white/20"
                      }
                    `}
                  >
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Wardrobe Preferences Section */}
        <SettingsCard title="Wardrobe Preferences">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block">
                Default Context
              </label>
              <select
                value={settings.defaultContext}
                onChange={(e) => handleSettingChange("defaultContext", e.target.value as typeof settings.defaultContext)}
                className="select-glass rounded-lg px-3 py-2 text-sm w-full focus-ring"
              >
                <option value="casual">Casual</option>
                <option value="work">Work</option>
                <option value="evening">Evening</option>
                <option value="relaxed">Relaxed</option>
              </select>
            </div>

            <ToggleSwitch
              checked={settings.smartSuggestions}
              onChange={(checked) => handleSettingChange("smartSuggestions", checked)}
              label="Smart Suggestions"
              description="AI-powered outfit recommendations"
            />

            <ToggleSwitch
              checked={settings.showColorAnalysis}
              onChange={(checked) => handleSettingChange("showColorAnalysis", checked)}
              label="Show Color Analysis"
              description="Display detailed color information"
            />

            <ToggleSwitch
              checked={settings.autoCategorize}
              onChange={(checked) => handleSettingChange("autoCategorize", checked)}
              label="Auto-categorize Items"
              description="Suggest categories based on image analysis"
            />
          </div>
        </SettingsCard>

        {/* Data & Privacy Section */}
        <SettingsCard title="Data & Privacy">
          <div className="space-y-4">
            <ToggleSwitch
              checked={settings.localStorageOnly}
              onChange={(checked) => handleSettingChange("localStorageOnly", checked)}
              label="Local Storage Only"
              description="Keep all data on your device (recommended)"
            />

            <ToggleSwitch
              checked={settings.autoBackup}
              onChange={(checked) => handleSettingChange("autoBackup", checked)}
              label="Auto-backup to Browser"
              description="Save to browser storage for recovery"
              disabled={!settings.localStorageOnly}
            />

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={handleClearData}
                className="bg-red-500 hover:bg-red-600 text-white border-0"
              >
                Clear All Data
              </Button>
              <p className="text-xs text-white/60 mt-2">
                This will permanently delete all your wardrobe items and settings
              </p>
            </div>
          </div>
        </SettingsCard>

        {/* Save Status */}
        <div className="text-center py-4">
          <p className="text-sm text-white/60">
            Settings are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}


