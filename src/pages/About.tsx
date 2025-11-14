import React from "react";
import { FeatureCard } from "../components/ui/FeatureCard";
import { Badge } from "../components/ui/Badge";
import { SettingsCard } from "../components/ui/SettingsCard";

export default function About(): JSX.Element {
  const features = [
    {
      icon: "🎨",
      title: "Smart Color Analysis",
      description: "Advanced color theory algorithms analyze your wardrobe pieces for perfect harmony"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Pure client-side processing means instant results without waiting for servers"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "All data stays on your device. No accounts, no tracking, no cloud storage"
    },
    {
      icon: "👗",
      title: "Context-Aware",
      description: "Get outfit suggestions tailored to casual, work, evening, or relaxed occasions"
    }
  ];

  const technologies = [
    "React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Color Theory"
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gradient mb-6">
          Tintly
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          A minimalist wardrobe management system that helps you discover perfect outfit combinations
          through intelligent color analysis and style recommendations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Why Choose Tintly?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          How It Works
        </h2>
        <SettingsCard title="Intelligent Outfit Curation">
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p className="text-base">
              Tintly uses sophisticated color theory principles to analyze your wardrobe pieces and suggest
              harmonious combinations. Each clothing item is evaluated for its dominant colors, undertones,
              and visual weight to create mathematically pleasing outfit matches.
            </p>
            <p className="text-base">
              Our proprietary algorithm considers multiple factors including color wheel relationships,
              seasonal appropriateness, and occasion context to deliver personalized recommendations that
              enhance your personal style while maintaining visual cohesion.
            </p>
          </div>
        </SettingsCard>
      </div>

      {/* Technologies Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Built With Modern Technology
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center py-8 border-t border-white/10">
        <div className="glass-liquid rounded-2xl p-6 inline-block">
          <p className="text-white/60 mb-2">
            Version 1.0.0
          </p>
          <p className="text-white/80 text-sm">
            Made with ❤️ for minimal style enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
}


