"use client";

type Scenario = "weekend" | "weekstart";

export default function TimelineViz({ scenario }: { scenario: Scenario }) {
  return scenario === "weekend" ? <TimelineWeekend /> : <TimelineWeekstart />;
}

type DotType = "order" | "transit" | "arrive" | "delivery" | "event" | "preorder";

const DOT: Record<DotType, { bg: string; border: string }> = {
  order:    { bg: "#DCFCE7", border: "#16A34A" },
  transit:  { bg: "#DBEAFE", border: "#2563EB" },
  arrive:   { bg: "#FEF3C7", border: "#D97706" },
  delivery: { bg: "rgba(232,100,44,0.08)", border: "#E8642C" },
  event:    { bg: "#F3E8FF", border: "#7C3AED" },
  preorder: { bg: "#FCE7F3", border: "#DB2777" },
};

function TlItem({
  type, emoji, day, name, time, highlight = false, isLast = false,
}: {
  type: DotType; emoji: string; day: string; name: string; time: string;
  highlight?: boolean; isLast?: boolean;
}) {
  const dot = DOT[type];
  return (
    <div className="tl-item" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100, position: "relative" }}>
      {isLast === false && (
        <div className="tl-connector" style={{
          position: "absolute", top: 20, left: "50%", width: "100%",
          height: 2, background: "var(--border)", zIndex: 0,
        }} />
      )}
      <div className="tl-dot" style={{
        width: 40, height: 40, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem", position: "relative", zIndex: 1,
        border: `2px solid ${dot.border}`, background: dot.bg,
        flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div className="tl-label" style={{
        marginTop: 12, textAlign: "center",
        ...(highlight ? {
          background: "var(--orange-dim)",
          border: "1.5px dashed var(--orange-border)",
          borderRadius: 8, padding: "4px 8px",
        } : {}),
      }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 4 }}>
          {day}
        </div>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: highlight ? "var(--orange)" : "var(--text)", lineHeight: 1.3 }}>
          {name}
        </div>
        <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: 3 }}>
          {time}
        </div>
      </div>
    </div>
  );
}

function WeekSep() {
  return (
    <div className="tl-weeksep" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 8px 0", minWidth: 36 }}>
      <div style={{ width: 2, height: 48, background: "var(--border)", borderRadius: 2 }} />
      <div style={{ writingMode: "vertical-rl" as const, transform: "rotate(180deg)", fontSize: "0.6rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginTop: 8 }}>
        nuova sett.
      </div>
    </div>
  );
}

type LegendItem = { type: DotType; label: string };

function Legend({ items }: { items: LegendItem[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOT[item.type].border, flexShrink: 0 }} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

function TimelineCard({ title, children, legend }: { title: string; children: React.ReactNode; legend: LegendItem[] }) {
  return (
    <div className="tl-card-inner" style={{
      background: "var(--bg-white)", border: "1px solid var(--border)",
      borderRadius: 20, padding: "40px 48px", marginBottom: 24,
      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 4, height: 18, background: "var(--orange)", borderRadius: 2, flexShrink: 0 }} />
        {title}
      </div>
      <div className="tl-row" style={{ display: "flex", gap: 0, alignItems: "flex-start", overflowX: "auto" as const, paddingBottom: 8 }}>
        {children}
      </div>
      <Legend items={legend} />
    </div>
  );
}

function TimelineWeekend() {
  const legend: LegendItem[] = [
    { type: "order",    label: "Ordine aperto" },
    { type: "transit",  label: "Transito Olanda → Polverigi (AN)" },
    { type: "arrive",   label: "Arrivo magazzino" },
    { type: "delivery", label: "Consegna" },
    { type: "event",    label: "Il tuo evento" },
  ];
  return (
    <TimelineCard title="Timeline - settimana tipo (evento venerdi, sabato o domenica)" legend={legend}>
      <TlItem type="order"    emoji="📋" day="Lunedi"            name="Finestra ordine aperta" time="dalle 14:00 - consigliato" highlight />
      <TlItem type="order"    emoji="⏱️"  day="Martedi"           name="Deadline ordine"        time="entro le 12:00" />
      <TlItem type="transit"  emoji="🚛" day="Martedi"           name="Partenza camion"         time="~16:00 - dall'Olanda" />
      <TlItem type="arrive"   emoji="📦" day="Mer → Gio"         name="Arrivo in magazzino"    time="mer 16:00 - gio 6:00" />
      <TlItem type="delivery" emoji="🌷" day="Giovedi · Venerdi" name="Consegna / ritiro"       time="gio mattina o ven mattina" />
      <TlItem type="event"    emoji="🎉" day="Ven · Sab · Dom"   name="Il tuo evento"           time="fiori freschi pronti" isLast />
    </TimelineCard>
  );
}

function TimelineWeekstart() {
  const legend: LegendItem[] = [
    { type: "preorder", label: "Ordine settimana precedente" },
    { type: "transit",  label: "Transito Olanda → Polverigi (AN)" },
    { type: "arrive",   label: "Arrivo + conservazione in cella" },
    { type: "delivery", label: "Consegna" },
    { type: "event",    label: "Il tuo evento" },
  ];
  return (
    <TimelineCard title="Timeline - 2 settimane (evento lunedi → giovedi)" legend={legend}>
      <TlItem type="preorder" emoji="📋" day="Gio precedente" name="Ordine da fare"    time="settimana -1 - consigliato" highlight />
      <TlItem type="transit"  emoji="🚛" day="Gio / Ven"      name="Partenza camion"   time="dall'Olanda" />
      <TlItem type="arrive"   emoji="📦" day="Sab · Dom"      name="Arrivo + cella"    time="conservati per te" />
      <WeekSep />
      <TlItem type="delivery" emoji="🌷" day="Lun · Mar"      name="Consegna / ritiro" time="su richiesta" />
      <TlItem type="event"    emoji="🎉" day="Lun → Gio"      name="Il tuo evento"    time="fiori freschi pronti" isLast />
    </TimelineCard>
  );
}
