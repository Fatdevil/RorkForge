import React from "react";

interface ReadmeModalProps {
  open: boolean;
  onClose: () => void;
}

const ReadmeModal: React.FC<ReadmeModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[600px] max-w-[95vw] rounded-xl border bg-white dark:bg-[#0a1220] text-black dark:text-white shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">RorkForge – README</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Stäng
          </button>
        </div>
        <div className="space-y-2 text-sm leading-relaxed">
          <p>1. <b>Quick Patch</b> → Apply → <b>Visa i Preview</b> för att se ändringen i staging-telefonen.</p>
          <p>2. <b>Studio</b> → Exportera <b>TEXT</b> eller <b>ZIP</b> → <b>Öppna i Preview</b>.</p>
          <p>3. <b>Preview</b>: Main vs Staging, byt skin/rotation, stöder även <code>?staging=</code>-param.</p>
          <p>4. <b>Publish</b>: Preflight → Build → Submit → Status (mock för nu).</p>
        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;