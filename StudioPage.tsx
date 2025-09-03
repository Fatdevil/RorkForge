import React, { useState } from "react";
import CodeBox from "./CodeBox";

function StudioPage({ border, cardBg }: { border: string; cardBg: string }) {
  // Mini-doc: en sida med en Hero + List
  const [doc, setDoc] = useState<StudioDoc>({
    meta: { name: "Demo App", theme: "dark" },
    pages: [{
      path: "/", title: "Home",
      tree: [
        { id: "hero1", type: "Hero", props: { title: "Welcome", subtitle: "Build faster" } },
        { id: "list1", type: "List", props: { items: ["Item 1", "Item 2", "Item 3"] } },
      ]
    }]
  });

  const [textSpec, setTextSpec] = useState("");
  const [zipSpec, setZipSpec] = useState<any>(null);
  const [readmeOpen, setReadmeOpen] = useState(false);

  const buildTextSpec = (d: StudioDoc) => {
    const lines: string[] = [];
    lines.push(`App: "${d.meta.name}"`);
    lines.push(`Theme: ${d.meta.theme}`);
    lines.push(`Pages:`);
    d.pages.forEach(p => {
      lines.push(`- ${p.path} (${p.title ?? "Untitled"})`);
      (p.tree || []).forEach(n => {
        lines.push(`  • ${n.type}${n.props?.title ? `("${n.props.title}")` : ""}`);
      });
    });
    return lines.join("\n");
  };

  const buildZipSpec = (d: StudioDoc) => ({
    app: { name: d.meta.name, theme: d.meta.theme },
    pages: d.pages.map(p => ({
      path: p.path, title: p.title,
      tree: p.tree.map(n => ({ type: n.type, props: n.props }))
    })),
    deps: ["tailwindcss"],
    routes: d.pages.map(p => `pages${p.path === "/" ? "/index" : p.path}.tsx`),
    constraints: { framework: "nextjs", style: "tailwind" }
  });

  const download = (name: string, content: string) => {
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const onExportText = () => setTextSpec(buildTextSpec(doc));
  const onExportZip = () => {
    const z = buildZipSpec(doc);
    setZipSpec(z);
    download("rorkforge.manifest.json", JSON.stringify(z, null, 2));
  };

  const openInPreview = () => {
    const url = "https://vercel-preview.example/" + encodeURIComponent(doc.meta.name.toLowerCase().replace(/\s+/g, "-"));
    window.dispatchEvent(new CustomEvent("rorkforge:apply", { detail: { url } }));
    window.dispatchEvent(new CustomEvent("rorkforge:navigate", { detail: { page: "preview" } }));
  };

  // Sätt global window-funktion för README-modal
  React.useEffect(() => {
    (window as any).__rfOpenReadme = () => setReadmeOpen(true);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas (mock) */}
        <div className="rounded-2xl border p-4 lg:col-span-2" style={{ borderColor: border, background: cardBg }}>
          <h2 className="text-xl font-bold mb-2">Studio (drag & drop)</h2>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {[
              "Navbar",
              "Tabs",
              "Card",
              "List",
              "Form",
              "Button",
              "Text",
              "Image",
              "Hero"
            ].map((x) => (
              <div key={x} className="text-xs px-2 py-1 rounded-lg border text-center" style={{ borderColor: border }}>
                {x}
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-0 h-[360px] overflow-hidden" style={{ borderColor: border }}>
            <div className="h-10 px-4 flex items-center justify-between" style={{ background: "#0f172a", borderBottom: `1px solid ${border}` }}>
              <div className="text-xs opacity-80">Navbar</div>
              <div className="text-xs opacity-60">Login</div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3" style={{ borderColor: border }}>
                <div className="text-xs opacity-70 mb-2">Hero</div>
                <div className="h-16 rounded bg-black/10 grid place-items-center text-xs opacity-80">“{doc.pages[0].tree[0].props.title}”</div>
              </div>
              <div className="rounded-lg border p-3" style={{ borderColor: border }}>
                <div className="text-xs opacity-70 mb-2">List</div>
                <ul className="text-xs opacity-80 space-y-1">
                  {doc.pages[0].tree[1].props.items.map((it: string) => <li key={it}>• {it}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Export & Actions */}
        <div className="rounded-2xl border p-4 space-y-3" style={{ borderColor: border, background: cardBg }}>
          <h3 className="font-semibold">Export</h3>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onExportText} className="px-3 py-2 rounded-lg border" style={{ borderColor: border }}>TEXT-spec</button>
            <button onClick={onExportZip} className="px-3 py-2 rounded-lg border" style={{ borderColor: border }}>ZIP-spec JSON</button>
          </div>

          {textSpec && (
            <>
              <div className="text-sm font-semibold mt-2">TEXT-spec</div>
              <CodeBox border={border}>{textSpec}</CodeBox>
            </>
          )}

          {zipSpec && (
            <>
              <div className="text-sm font-semibold mt-2">ZIP-spec (preview)</div>
              <CodeBox border={border}>{JSON.stringify(zipSpec, null, 2)}</CodeBox>
            </>
          )}

          <div className="pt-2">
            <button onClick={openInPreview} className="px-3 py-2 rounded-lg border bg-emerald-600/20" style={{ borderColor: border }}>
              Öppna i Preview
            </button>
          </div>
        </div>
      </div>

      <ReadmeModal open={readmeOpen} onClose={() => setReadmeOpen(false)} />
    </>
  );
}

/* ---- types för Studio ---- */
type StudioDoc = {
  meta: { name: string; theme: "light" | "dark" };
  pages: Array<{ path: string; title?: string; tree: Array<{ id: string; type: string; props?: any }> }>;
};

/* ---- README-mini modal ---- */
function ReadmeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-black/60">
      <div className="w-[680px] max-w-[95vw] rounded-2xl border bg-[#0a1220] p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">RorkForge – README (mini)</div>
          <button className="px-3 py-1.5 rounded-lg border text-sm" style={{ borderColor: "#1f2937" }} onClick={onClose}>Stäng</button>
        </div>
        <div className="text-sm leading-relaxed opacity-90 space-y-2">
          <p>1) <b>Quick Patch</b> → Apply → <b>Visa i Preview</b> för att se ändring i höger telefon (Staging).</p>
          <p>2) <b>Studio</b> → Exportera <b>TEXT</b> eller <b>ZIP</b> (laddas ner som <code>rorkforge.manifest.json</code>) → <b>Öppna i Preview</b>.</p>
          <p>3) <b>Preview</b>: Skriv URLer eller skicka event från andra flikar. Stöder även <code>?staging=...</code> i adressfältet.</p>
          <p>4) <b>Publish</b>: Wizard med Preflight → Build → Submit → Status (mock-steg).</p>
        </div>
      </div>
    </div>
  );
}

export default StudioPage;