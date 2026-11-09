"use client";
import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { FeatureStack } from "./FeatureStack";
import {
  Problem,
  CanvasSection,
  CourseworkSection,
  AdminSection,
  HowItWorks,
  AccountControl,
} from "./ContentSections";
import { WeeklyPlanner } from "./WeeklyPlanner";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { ExperienceDialog } from "./ExperienceDialog";
export function CubbieHome() {
  const [dialog, setDialog] = useState<"watch" | "start" | null>(null);
  const start = () => setDialog("start");
  const watch = () => setDialog("watch");
  return (
    <>
      <a href="#overview" className="skip-link">
        Skip to content
      </a>
      <Header onStart={start} />
      <main>
        <Hero onWatch={watch} onStart={start} />
        <Problem />
        <FeatureStack />
        <CanvasSection onWatch={watch} />
        <CourseworkSection />
        <AdminSection />
        <WeeklyPlanner />
        <HowItWorks />
        <AccountControl />
        <FAQ />
      </main>
      <Footer onStart={start} />
      {dialog && (
        <ExperienceDialog
          key={dialog}
          mode={dialog}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
}
