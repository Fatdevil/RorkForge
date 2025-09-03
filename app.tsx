import React, { useEffect, useState } from "react";

/**
 * RorkForge – Vision UI (Single-file mock for CodeSandbox)
 * Merged features:
 * - Full nav & pages (Vision, Quick Patch, Studio, Templates, Packs, Preview, Publish, Market, Settings)
 * - Vision page with Phone Preview (single phone)
 * - PREVIEW (Two Phones): Main & Staging with iPhone/Android + Rotate
 * - PacksMock → dispatch "rorkforge:apply" to auto-fill staging URL in Two Phones
 * - Small components (DeviceFrame, SkinSelector, Badge, Switch, etc.)
 *
 * Tip: Use a React + TS + Tailwind template for best visuals.
 */

/* ===================== App Shell ===================== */

export default function RorkForgeVision() {
  const [page, setPage] = useState<PageKey>("preview");
  const [plan, setPlan] = useState<PlanKey>("pro");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [phoneRot, setPhoneRot] = useState<Rotation>("portrait");
  const [phoneSkin, setPhoneSkin] = useState<Skin>("iphone");
  const [previewUrl, setPreviewUrl] = useState<string>(
    "https://preview.rorkforge.example/app"
  );

  const bg = theme === "dark" ? "#0b0f15" : "#f7fafc";
  const fg = theme === "dark" ? "#e6edf3" : "#0b1220";
  const cardBg = theme === "dark" ? "#0a1220" : "#ffffff";
  const border = theme === "dark" ? "#1f2937" : "#e2e8f0";

  // ---- Smoke tests (basic)
  useEffect(() => {
    const mustExist = [
      IconTarget,
      IconBolt,
      IconBlocks,
      IconTemplates,
      IconPackage,
      IconPhone,
      IconRocket,
      IconStore,
      IconSettings,
      Badge,
      Switch,
      PlanSelector,
      DeviceFrame,
      VisionPage,
      QuickPatchPage,
      PreviewPage,
      PreviewTwoPhones,
      StudioPage,
      TemplatesPage,
      PacksPage,
      PublishPage,
      MarketPage,
      SettingsPage,
    ];
    mustExist.forEach((fn, i) => {
      if (typeof fn !== "function")
        console.error("Smoke: missing component at index", i);
    });
  }, []);

  const nav: Array<{ key: PageKey; label: string; icon: JSX.Element }> = [
    { key: "vision", label: "Vision", icon: <IconTarget /> },
    { key: "quick", label: "Quick Patch", icon: <IconBolt /> },
    { key: "studio", label: "Studio", icon: <IconBlocks /> },
    { key: "templates", label: "Templates", icon: <IconTemplates /> },
    { key: "packs", label: "Packs", icon: <IconPackage /> },
    { key: "preview", label: "Preview", icon: <IconPhone /> },
    { key: "publish", label: "Publish", icon: <IconRocket /> },
    { key: "market", label: "Marketplace", icon: <IconStore /> },
    { key: "settings", label: "Settings", icon: <IconSettings /> },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: bg,
        color: fg,
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      {/* Topbar */}
      <div
        className="sticky top-0 z-20 border-b"
        style={{ borderColor: border, background: bg }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-xl"
              style={{ background: "linear-gradient(135deg,#22c55e,#3b82f6)" }}
            />
            <div className="text-lg font-bold">RorkForge</div>
            <Badge tone="emerald">Vision Preview</Badge>
          </div>
          <div className="flex items-center gap-3">
            <PlanSelector value={plan} onChange={setPlan} />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm opacity-80">Theme</span>
              <Switch
                checked={theme === "dark"}
                onChange={(v) => setTheme(v ? "dark" : "light")}
                labels={["Light", "Dark"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shell */}
      <div className="mx-auto max-w-[1200px] px-2 md:px-4 py-4 grid grid-cols-12 gap-3 md:gap-4">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div
            className="rounded-2xl border"
            style={{ borderColor: border, background: cardBg }}
          >
            <div className="p-2">
              {nav.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setPage(n.key)}
                  className={`w-full flex items-center gap-2 p-2 rounded-xl text-left hover:opacity-100 ${
                    page === n.key
                      ? "bg-emerald-600/10 border border-emerald-500/20"
                      : "opacity-90"
                  }`}
                >
                  <span className="opacity-90">{n.icon}</span>
                  <span className="text-sm font-medium">{n.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Roadmap hint */}
          <div
            className="mt-3 rounded-2xl border"
            style={{ borderColor: border, background: cardBg }}
          >
            <div className="p-4">
              <div className="text-sm font-semibold mb-2">Roadmap</div>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• M6: Diff + Undo</li>
                <li>• v1.6: Dashboard, AI-Coach MVP</li>
                <li>• v2.0: Marketplace, Publish 2.0</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 space-y-4">
          {page === "vision" && (
            <VisionPage
              plan={plan}
              cardBg={cardBg}
              border={border}
              theme={theme}
              phoneRot={phoneRot}
              setPhoneRot={setPhoneRot}
              phoneSkin={phoneSkin}
              setPhoneSkin={setPhoneSkin}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          )}

          {page === "quick" && (
            <QuickPatchPage border={border} cardBg={cardBg} />
          )}
          {page === "studio" && <StudioPage border={border} cardBg={cardBg} />}
          {page === "templates" && (
            <TemplatesPage border={border} cardBg={cardBg} />
          )}
          {page === "packs" && (
            <>
              <PacksPage border={border} cardBg={cardBg} />
              <PacksMock border={border} />
            </>
          )}

          {/* Two-phones preview as main preview */}
          {page === "preview" && (
            <PreviewTwoPhones border={border} cardBg={cardBg} />
          )}

          {page === "publish" && (
            <PublishPage border={border} cardBg={cardBg} />
          )}
          {page === "market" && <MarketPage border={border} cardBg={cardBg} />}
          {page === "settings" && (
            <SettingsPage
              border={border}
              cardBg={cardBg}
              theme={theme}
              setTheme={setTheme}
              plan={plan}
              setPlan={setPlan}
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* ===================== Types ===================== */

type PlanKey = "free" | "pro" | "ent";
type PageKey =
  | "vision"
  | "quick"
  | "studio"
  | "templates"
  | "packs"
  | "preview"
  | "publish"
  | "market"
  | "settings";

type Rotation = "portrait" | "landscape";
type Skin = "iphone" | "android";

/* ===================== Pages ===================== */

function VisionPage(props: {
  plan: PlanKey;
  cardBg: string;
  border: string;
  theme: "dark" | "light";
  phoneRot: Rotation;
  setPhoneRot: (v: Rotation) => void;
  phoneSkin: Skin;
  setPhoneSkin: (s: Skin) => void;
  previewUrl: string;
  setPreviewUrl: (s: string) => void;
}) {
  const {
    plan,
    cardBg,
    border,
    phoneRot,
    setPhoneRot,
    phoneSkin,
    setPhoneSkin,
    previewUrl,
    setPreviewUrl,
  } = props;

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-4 md:p-6"
        style={{ borderColor: border, background: cardBg }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: plans + marketplace */}
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Bygg snabbare – välj vägen som passar dig
            </h1>
            <p className="opacity-80 max-w-[58ch]">
              RorkForge förenar <b>Free ZIP</b>, <b>Studio Pro</b> och{" "}
              <b>Full AI</b> i ett enda flöde. Alla vägar leder till{" "}
              <b>Preview → Testa → Merge/Publish</b>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <PlanCard
                title="Free / Hobby"
                bullets={[
                  "ZIP från ChatGPT",
                  "Preview → Testa → Merge",
                  "Ingen API-kostnad",
                ]}
                highlight={plan === "free"}
              />
              <PlanCard
                title="Pro / Indie"
                bullets={[
                  "Studio drag & drop",
                  "Prompt/API → Preview",
                  "Billiga patchar",
                ]}
                highlight={plan === "pro"}
              />
              <PlanCard
                title="Enterprise / Full AI"
                bullets={[
                  "Chat i RorkForge",
                  "GitHub + Vercel + Publish",
                  "Roller, CI, guardrails",
                ]}
                highlight={plan === "ent"}
              />
            </div>

            <div
              className="rounded-xl border p-3"
              style={{ borderColor: border }}
            >
              <div className="text-sm font-semibold mb-2">
                Community / Marketplace
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { name: "Todo", badge: "Verified" },
                  { name: "Blog", badge: "Community" },
                  { name: "CRM", badge: "Verified" },
                  { name: "Onboarding", badge: "Community" },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                    style={{ borderColor: border }}
                  >
                    <span className="text-sm">{t.name}</span>
                    <Badge tone={t.badge === "Verified" ? "emerald" : "slate"}>
                      {t.badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: phone preview mock (single) */}
          <div className="w-full lg:max-w-[360px]">
            <div
              className="rounded-2xl border p-3"
              style={{ borderColor: border, background: cardBg }}
            >
              <div className="text-sm font-semibold mb-2">Phone Preview</div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  className="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm"
                  style={{ borderColor: border }}
                  placeholder="https://preview.your-app.dev"
                />
                <button
                  className="px-3 py-2 rounded-lg text-sm border"
                  style={{ borderColor: border }}
                >
                  QR
                </button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <SkinSelector value={phoneSkin} onChange={setPhoneSkin} />
                <button
                  className="px-3 py-1.5 rounded-lg border text-xs"
                  style={{ borderColor: border }}
                  onClick={() =>
                    setPhoneRot(
                      phoneRot === "portrait" ? "landscape" : "portrait"
                    )
                  }
                >
                  Rotate
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg border text-xs"
                  style={{ borderColor: border }}
                  onClick={() => alert("Screenshot saved (mock)")}
                >
                  Screenshot
                </button>
              </div>
              <DeviceFrame
                url={previewUrl}
                rotation={phoneRot}
                skin={phoneSkin}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card
          title="1) Quick Patch"
          subtitle="Snabba UI-fixar med budget"
          border={border}
        >
          <Step text="Välj fil i repo" />
          <Step text="Skriv ändring (t.ex. färg)" />
          <Step text="Preflight → Apply → Preview" />
        </Card>
        <Card
          title="2) Studio"
          subtitle="Bygg visuellt – exportera prompt/JSON"
          border={border}
        >
          <Step text="Dra in komponenter" />
          <Step text="Sätt flows & actions" />
          <Step text="Export TEXT/JSON → kod" />
        </Card>
        <Card
          title="3) Publish"
          subtitle="Vercel / Expo / Stores"
          border={border}
        >
          <Step text="Preflight" />
          <Step text="Build → Submit" />
          <Step text="Status + QR" />
        </Card>
      </div>
    </div>
  );
}

function QuickPatchPage({
  border,
  cardBg,
}: {
  border: string;
  cardBg: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div
        className="lg:col-span-2 rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h2 className="text-xl font-bold mb-3">Quick Patch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Repository"
            placeholder="my-user/my-repo"
            border={border}
          />
          <Input
            label="Fil"
            placeholder="app/(auth)/login/page.tsx"
            border={border}
          />
          <TextArea
            label="Instruktion"
            placeholder="Byt primär knappfärg #2563eb → #16a34a"
            border={border}
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Preflight & Kostnad
          </button>
          <button
            className="px-3 py-2 rounded-lg border bg-emerald-600/20"
            style={{ borderColor: border }}
          >
            Apply → Staging
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoTile title="Estimat" value="0.34 kr" border={border} />
          <InfoTile title="Tokens" value="in 2.1k / out 500" border={border} />
          <InfoTile title="Guardrails" value="OK" border={border} />
        </div>
      </div>
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold mb-2">Diff-preview</h3>
        <CodeBox border={border}>
          {`1  - bg-[#2563eb]\n2  + bg-[#16a34a]\n3    <Button>Logga in</Button>`}
        </CodeBox>
        <div className="mt-3 flex gap-2">
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Undo
          </button>
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Open PR
          </button>
        </div>
      </div>
    </div>
  );
}

/* PREVIEW (Two Phones) with event hook from Packs → Apply */
function PreviewTwoPhones({
  border,
  cardBg,
}: {
  border: string;
  cardBg: string;
}) {
  const [mainUrl, setMainUrl] = useState("https://production.example.com");
  const [stagingUrl, setStagingUrl] = useState("https://staging.example.com");
  const [rotL, setRotL] = useState<Rotation>("portrait");
  const [rotR, setRotR] = useState<Rotation>("portrait");
  const [skinL, setSkinL] = useState<Skin>("iphone");
  const [skinR, setSkinR] = useState<Skin>("android");

  useEffect(() => {
    const handler = (e: any) => {
      const url = e?.detail?.url;
      if (typeof url === "string") setStagingUrl(url);
    };
    window.addEventListener("rorkforge:apply", handler as any);
    (window as any).rorkforgeApply = (url: string) =>
      window.dispatchEvent(
        new CustomEvent("rorkforge:apply", { detail: { url } })
      );
    return () => window.removeEventListener("rorkforge:apply", handler as any);
  }, []);

  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: border, background: cardBg }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-bold">Preview (Two Phones)</h2>
        <Badge tone="slate">Main vs Staging</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhonePanel
          title="Main"
          url={mainUrl}
          setUrl={setMainUrl}
          rot={rotL}
          setRot={setRotL}
          skin={skinL}
          setSkin={setSkinL}
        />
        <PhonePanel
          title="Staging"
          url={stagingUrl}
          setUrl={setStagingUrl}
          rot={rotR}
          setRot={setRotR}
          skin={skinR}
          setSkin={setSkinR}
        />
      </div>
    </div>
  );
}

function PhonePanel({
  title,
  url,
  setUrl,
  rot,
  setRot,
  skin,
  setSkin,
}: {
  title: string;
  url: string;
  setUrl: (s: string) => void;
  rot: Rotation;
  setRot: (r: Rotation) => void;
  skin: Skin;
  setSkin: (s: Skin) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold mb-2">{title}</div>
      <div className="flex gap-2 mb-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <SkinSelector value={skin} onChange={setSkin} />
        <button
          className="px-2 py-1 border rounded text-xs"
          onClick={() => setRot(rot === "portrait" ? "landscape" : "portrait")}
        >
          Rotate
        </button>
      </div>
      <DeviceFrame url={url} rotation={rot} skin={skin} />
    </div>
  );
}

function PreviewPage({
  border,
  cardBg,
  phoneRot,
  setPhoneRot,
  phoneSkin,
  setPhoneSkin,
  previewUrl,
  setPreviewUrl,
}: {
  border: string;
  cardBg: string;
  phoneRot: Rotation;
  setPhoneRot: (v: Rotation) => void;
  phoneSkin: Skin;
  setPhoneSkin: (s: Skin) => void;
  previewUrl: string;
  setPreviewUrl: (s: string) => void;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: border, background: cardBg }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-bold">Preview (Phone)</h2>
        <Badge tone="slate">QR + Frames</Badge>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <input
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
          className="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm"
          style={{ borderColor: border }}
          placeholder="https://preview.vercel.app"
        />
        <button
          className="px-3 py-2 rounded-lg border"
          style={{ borderColor: border }}
        >
          QR
        </button>
        <SkinSelector value={phoneSkin} onChange={setPhoneSkin} />
        <button
          className="px-3 py-2 rounded-lg border"
          style={{ borderColor: border }}
          onClick={() =>
            setPhoneRot(phoneRot === "portrait" ? "landscape" : "portrait")
          }
        >
          Rotate
        </button>
        <button
          className="px-3 py-2 rounded-lg border"
          style={{ borderColor: border }}
          onClick={() => alert("Screenshot saved (mock)")}
        >
          Screenshot
        </button>
      </div>
      <DeviceFrame url={previewUrl} rotation={phoneRot} skin={phoneSkin} />
    </div>
  );
}

function StudioPage({ border, cardBg }: { border: string; cardBg: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div
        className="rounded-2xl border p-4 lg:col-span-2"
        style={{ borderColor: border, background: cardBg }}
      >
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
          ].map((x) => (
            <div
              key={x}
              className="text-xs px-2 py-1 rounded-lg border text-center"
              style={{ borderColor: border }}
            >
              {x}
            </div>
          ))}
        </div>
        {/* Canvas mock */}
        <div
          className="rounded-xl border p-0 h-[360px] overflow-hidden"
          style={{ borderColor: border }}
        >
          {/* Navbar */}
          <div
            className="h-10 px-4 flex items-center justify-between"
            style={{
              background: "#0f172a",
              borderBottom: `1px solid ${border}`,
            }}
          >
            <div className="text-xs opacity-80">Navbar</div>
            <div className="text-xs opacity-60">Login</div>
          </div>
          {/* Body */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: border }}
            >
              <div className="text-xs opacity-70 mb-2">Card</div>
              <div className="h-16 rounded bg-black/10" />
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: border }}
            >
              <div className="text-xs opacity-70 mb-2">List</div>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Item 1</li>
                <li>• Item 2</li>
                <li>• Item 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold">Export</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            TEXT-spec
          </button>
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            ZIP-spec JSON
          </button>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-semibold mb-1">Actions</h4>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• onClick(LoginBtn) → navigate("/dashboard")</li>
            <li>• onChange(Tab) → setState("calendarView=week")</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TemplatesPage({ border, cardBg }: { border: string; cardBg: string }) {
  const items = [
    { name: "Todo", tag: "Verified" },
    { name: "Blog", tag: "Community" },
    { name: "CRM", tag: "Verified" },
    { name: "Onboarding", tag: "Community" },
    { name: "Expo Starter", tag: "Verified" },
  ];
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: border, background: cardBg }}
    >
      <h2 className="text-xl font-bold mb-3">Templates</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((t) => (
          <div
            key={t.name}
            className="rounded-xl border p-3 flex flex-col gap-2"
            style={{ borderColor: border }}
          >
            <div className="text-sm font-semibold">{t.name}</div>
            <Badge tone={t.tag === "Verified" ? "emerald" : "slate"}>
              {t.tag}
            </Badge>
            <button
              className="mt-auto px-3 py-2 rounded-lg border"
              style={{ borderColor: border }}
            >
              Install to staging
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PacksPage({ border, cardBg }: { border: string; cardBg: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h2 className="text-xl font-bold mb-3">Packs Importer</h2>
        <div
          className="rounded-xl border p-6 text-center"
          style={{ borderColor: border }}
        >
          Släpp ZIP här (rorkforge.manifest.json)
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoTile title="Validate" value="OK" border={border} />
          <InfoTile title="Plan" value="6 files" border={border} />
          <InfoTile title="Deps" value="date-fns" border={border} />
        </div>
        <div className="mt-3 flex gap-2">
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Apply → Staging
          </button>
          <button
            className="px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Revert
          </button>
        </div>
      </div>
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold mb-2">Diff Before Apply</h3>
        <CodeBox border={border}>
          {`/app/crm/page.tsx (new)\n/app/crm/[id]/page.tsx (new)\n+ import "@/styles/crm.css";`}
        </CodeBox>
      </div>
    </div>
  );
}

/* Packs → Apply (mock) that emits event to fill Two Phones staging URL */
function PacksMock({ border }: { border: string }) {
  const [plannedUrl, setPlannedUrl] = useState(
    "https://vercel-preview.example/your-staging"
  );
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: border }}>
      <h3 className="font-semibold mb-2">Packs – Apply (mock)</h3>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          value={plannedUrl}
          onChange={(e) => setPlannedUrl(e.target.value)}
        />
        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("rorkforge:apply", {
                detail: { url: plannedUrl },
              })
            )
          }
        >
          Apply → Staging
        </button>
      </div>
      <pre className="text-xs bg-black/10 p-2 rounded">
        {`Diff Before Apply:
  /app/crm/page.tsx        (new)
  /app/crm/[id]/page.tsx   (new)
  + import "@/styles/crm.css";`}
      </pre>
    </div>
  );
}

function PublishPage({ border, cardBg }: { border: string; cardBg: string }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: border, background: cardBg }}
    >
      <h2 className="text-xl font-bold mb-3">Publish Wizard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <StepCard
          title="Preflight"
          desc="Env, manifest, version"
          border={border}
          status="ok"
        />
        <StepCard
          title="Build"
          desc="Next.js / Expo EAS"
          border={border}
          status="ok"
        />
        <StepCard
          title="Submit"
          desc="Vercel / Stores"
          border={border}
          status="pending"
        />
        <StepCard
          title="Status"
          desc="Logs + QR"
          border={border}
          status="pending"
        />
      </div>
    </div>
  );
}

function MarketPage({ border, cardBg }: { border: string; cardBg: string }) {
  const packs = [
    { name: "Auth (Supabase)", badge: "Premium", price: "$9/mo" },
    { name: "Analytics", badge: "Verified", price: "Free" },
    { name: "Payments", badge: "Premium", price: "$15/mo" },
    { name: "Chatbot", badge: "Community", price: "Free" },
    { name: "Mailing", badge: "Verified", price: "Free" },
    { name: "Landing Page", badge: "Verified", price: "Free" },
  ];
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: border, background: cardBg }}
    >
      <h2 className="text-xl font-bold mb-3">Marketplace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {packs.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border p-3 flex flex-col gap-2"
            style={{ borderColor: border }}
          >
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="flex items-center gap-2">
              <Badge
                tone={
                  p.badge === "Premium"
                    ? "amber"
                    : p.badge === "Verified"
                    ? "emerald"
                    : "slate"
                }
              >
                {p.badge}
              </Badge>
              <span className="text-xs opacity-80">{p.price}</span>
            </div>
            <button
              className="mt-auto px-3 py-2 rounded-lg border"
              style={{ borderColor: border }}
            >
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({
  border,
  cardBg,
  theme,
  setTheme,
  plan,
  setPlan,
}: {
  border: string;
  cardBg: string;
  theme: "dark" | "light";
  setTheme: (v: "dark" | "light") => void;
  plan: PlanKey;
  setPlan: (p: PlanKey) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold mb-2">Appearance</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Theme</span>
          <Switch
            checked={theme === "dark"}
            onChange={(v) => setTheme(v ? "dark" : "light")}
            labels={["Light", "Dark"]}
          />
        </div>
      </div>
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold mb-2">Plan</h3>
        <PlanSelector value={plan} onChange={setPlan} />
        <p className="text-sm opacity-80 mt-2">
          Free (ZIP), Pro (Studio), Enterprise (Full AI)
        </p>
      </div>
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: border, background: cardBg }}
      >
        <h3 className="font-semibold mb-2">API Keys (mock)</h3>
        <div className="grid grid-cols-1 gap-2">
          <Input
            label="GitHub Token"
            placeholder="ghp_****************"
            border={border}
          />
          <Input
            label="Vercel Token"
            placeholder="vercel_****************"
            border={border}
          />
          <Input
            label="OpenAI API Key"
            placeholder="sk-****************"
            border={border}
          />
          <button
            className="mt-2 px-3 py-2 rounded-lg border"
            style={{ borderColor: border }}
          >
            Spara (mock)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== Small Components ===================== */

function PlanSelector({
  value,
  onChange,
}: {
  value: PlanKey;
  onChange: (p: PlanKey) => void;
}) {
  const items: Array<{ k: PlanKey; label: string }> = [
    { k: "free", label: "Free" },
    { k: "pro", label: "Pro" },
    { k: "ent", label: "Enterprise" },
  ];
  return (
    <div
      className="flex items-center gap-1 rounded-xl border p-1"
      style={{ borderColor: "#1f2937" }}
    >
      {items.map((it) => (
        <button
          key={it.k}
          onClick={() => onChange(it.k)}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            value === it.k
              ? "bg-emerald-600 text-white"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Badge({
  tone = "slate",
  children,
}: {
  tone?: "slate" | "emerald" | "amber";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    slate: "#64748b",
    emerald: "#10b981",
    amber: "#f59e0b",
  };
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full"
      style={{ background: `${map[tone]}20`, color: map[tone] }}
    >
      {children}
    </span>
  );
}

function Switch({
  checked,
  onChange,
  labels,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labels?: [string, string];
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-1 px-1 py-0.5 rounded-full border text-xs ${
        checked ? "bg-emerald-600/20" : ""
      }`}
      style={{ borderColor: "#1f2937" }}
    >
      <span
        className={`px-2 py-0.5 rounded-full ${
          !checked ? "bg-white text-black" : "opacity-70"
        }`}
      >
        {labels?.[0] ?? "Off"}
      </span>
      <span
        className={`px-2 py-0.5 rounded-full ${
          checked ? "bg-white text-black" : "opacity-70"
        }`}
      >
        {labels?.[1] ?? "On"}
      </span>
    </button>
  );
}

function Input({
  label,
  placeholder,
  border,
}: {
  label: string;
  placeholder?: string;
  border: string;
}) {
  return (
    <label className="text-sm w-full">
      <div className="mb-1 opacity-80">{label}</div>
      <input
        className="w-full bg-transparent border rounded-lg px-3 py-2"
        placeholder={placeholder}
        style={{ borderColor: border }}
      />
    </label>
  );
}

function TextArea({
  label,
  placeholder,
  border,
}: {
  label: string;
  placeholder?: string;
  border: string;
}) {
  return (
    <label className="text-sm w-full col-span-2">
      <div className="mb-1 opacity-80">{label}</div>
      <textarea
        rows={4}
        className="w-full bg-transparent border rounded-lg px-3 py-2"
        placeholder={placeholder}
        style={{ borderColor: border }}
      />
    </label>
  );
}

function InfoTile({
  title,
  value,
  border,
}: {
  title: string;
  value: string;
  border: string;
}) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: border }}>
      <div className="text-xs opacity-70 mb-1">{title}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function CodeBox({
  border,
  children,
}: {
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border p-3 text-xs font-mono overflow-auto"
      style={{ borderColor: border, background: "#0b1220" }}
    >
      <div
        className="opacity-90"
        dangerouslySetInnerHTML={{ __html: String(children) }}
      />
    </div>
  );
}

function PlanCard({
  title,
  bullets,
  highlight,
}: {
  title: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight ? "ring-2 ring-emerald-500/50" : ""
      }`}
      style={{ borderColor: "#1f2937" }}
    >
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm opacity-90 space-y-1">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}

function Card({
  title,
  subtitle,
  border,
  children,
}: {
  title: string;
  subtitle?: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: border }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold">{title}</div>
          {subtitle && (
            <div className="text-sm opacity-70 -mt-0.5">{subtitle}</div>
          )}
        </div>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm opacity-90">
      <span className="h-5 w-5 rounded-full grid place-items-center bg-emerald-600/20">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
}

function StepCard({
  title,
  desc,
  border,
  status,
}: {
  title: string;
  desc: string;
  border: string;
  status: "ok" | "pending" | "error";
}) {
  const tone =
    status === "ok" ? "emerald" : status === "pending" ? "amber" : "rose";
  const col =
    tone === "emerald" ? "#10b981" : tone === "amber" ? "#f59e0b" : "#f43f5e";
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: border }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm opacity-80">{desc}</div>
        </div>
        <span
          className="text-[11px] px-2 py-0.5 rounded-full"
          style={{ background: `${col}20`, color: col }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function DeviceFrame({
  url,
  rotation = "portrait",
  skin = "iphone",
}: {
  url?: string;
  rotation?: Rotation;
  skin?: Skin;
}) {
  const isPortrait = rotation === "portrait";
  const w = isPortrait ? 280 : 460;
  const h = isPortrait ? 560 : 260;
  const chrome = skin === "android" ? "#1f2937" : "#0f172a";
  const slot = skin === "android" ? "#00000055" : "#00000066";
  return (
    <div className="grid place-items-center">
      <div className="relative" style={{ width: w + 24, height: h + 80 }}>
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: chrome,
            boxShadow: "0 8px 30px rgba(0,0,0,.35)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-2 h-1.5 w-24 rounded-full"
          style={{ background: slot }}
        />
        <div
          className="absolute left-3 right-3 top-8 rounded-xl overflow-hidden border"
          style={{ height: h, borderColor: "#111827", background: "#020617" }}
        >
          <div className="h-full w-full grid place-items-center text-xs opacity-80">
            <div className="px-4 text-center">
              <div className="opacity-70 mb-1">Preview URL</div>
              <div className="font-mono break-all">{url}</div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-3 h-2 w-24 rounded-full"
          style={{ background: slot }}
        />
      </div>
    </div>
  );
}

function SkinSelector({
  value,
  onChange,
}: {
  value: Skin;
  onChange: (s: Skin) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange("iphone")}
        className={`px-2 py-1 rounded-lg text-xs ${
          value === "iphone" ? "bg-emerald-600/20" : ""
        }`}
      >
        iPhone
      </button>
      <button
        onClick={() => onChange("android")}
        className={`px-2 py-1 rounded-lg text-xs ${
          value === "android" ? "bg-emerald-600/20" : ""
        }`}
      >
        Android
      </button>
    </div>
  );
}

/* ===================== Icons ===================== */

function IconTarget() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" opacity=".25" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" fill="currentColor" />
    </svg>
  );
}
function IconBlocks() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" stroke="currentColor" />
      <path d="M12 3v18M3 7l9 4 9-4" stroke="currentColor" />
    </svg>
  );
}
function IconTemplates() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="6" rx="2" stroke="currentColor" />
      <rect x="3" y="14" width="10" height="6" rx="2" stroke="currentColor" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c4 2 7 6 7 10 0 5-4 9-7 10-3-1-7-5-7-10 0-4 3-8 7-10z"
        stroke="currentColor"
      />
      <path d="M9 13l-1 4 4-1 5-5-3-3-5 5z" stroke="currentColor" />
    </svg>
  );
}
function IconStore() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l2-5h14l2 5v11H3V9z" stroke="currentColor" />
      <path d="M8 14h8v6H8z" stroke="currentColor" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 8a4 4 0 110 8 4 4 0 010-8z" stroke="currentColor" />
      <path
        d="M4 12h2m12 0h2M12 4v2m0 12v2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6"
        stroke="currentColor"
      />
    </svg>
  );
}
