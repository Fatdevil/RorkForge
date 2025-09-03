import React, { useState, useEffect } from "react";
import ReadmeModal from "./ReadmeModal"; // Justera importväg om nödvändigt

function RorkForgeVision(props) {
  const [readmeOpen, setReadmeOpen] = useState(false);

  useEffect(() => {
    (window as any).__rfOpenReadme = () => setReadmeOpen(true);
  }, []);

  // ...din övriga root-komponentkod

  return (
    <div>
      {/* Din övriga layout, routes, children, etc */}

      {/* LÄGG DENNA NÄRA SLUTET */}
      <ReadmeModal open={readmeOpen} onClose={() => setReadmeOpen(false)} />
    </div>
  );
}

export default RorkForgeVision;