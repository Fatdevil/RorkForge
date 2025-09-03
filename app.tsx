// src/app.tsx
import React, { useEffect, useState } from "react";
import RorkForgeVision from "./components/RorkForgeVision";
import ReadmeModal from "./components/ReadmeModal";

export default function App() {
  const [readmeOpen, setReadmeOpen] = useState(false);

  // global trigger som topbar-knappen kan anropa
  useEffect(() => {
    (window as any).__rfOpenReadme = () => setReadmeOpen(true);
  }, []);

  return (
    <div>
      <RorkForgeVision />
      <ReadmeModal open={readmeOpen} onClose={() => setReadmeOpen(false)} />
    </div>
  );
}
