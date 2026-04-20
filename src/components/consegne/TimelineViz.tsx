"use client";

/**
 * TimelineViz — infografica timeline consegne
 * Renderizzata in HTML/CSS puro, niente PNG.
 * scenario "weekend"  → 1 settimana (evento Ven/Sab/Dom)
 * scenario "weekstart" → 2 settimane (evento Lun/Mar/Mer/Gio)
 */

type Scenario = "weekend" | "weekstart";

/* ── Palette ─────────────────────────────────────────────────── */
const C = {
  order:    "#16A34A",
  transit:  "#2563EB",
  arrive:   "#CA8A04",
  delivery: "#E8642C",
  event:    "#7C3AED",
  preorder: "#BE185D",
  deadline: "#DC2626",
  bg:       "#FAFAF8",
  white:    "#FFFFFF",
  text:     "#1A1A1A",
  textSec:  "#555555",
  textFaint:"#A3A3A1",
  border:   "#E5E5E3",
};

/* ── Helpers ─────────────────────────────────────────────────── */
function hex2rgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── Sub-components ──────────────────────────────────────────── */

/** Single day-column header */
function DayLabel({
  label, sub, highlight,
}: { label: string; sub?: string; highlight?: "order" | "event" | "preorder" }) {
  const bg =
    highlight === "order"    ? hex2rgba(C.order,    0.10) :
    highlight === "event"    ? hex2rgba(C.event,    0.10) :
    highlight === "preorder" ? hex2rgba(C.preorder, 0.10) : "transparent";
  const col =
    highlight === "order"    ? C.order :
    highlight === "event"    ? C.event :
    highlight === "preorder" ? C.preorder : C.textFaint;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{
        padding: "4px 12px", borderRadius: 8, background: bg,
        textAlign: "center", minWidth: 40,
      }}>
        {label.split("\n").map((l, i) => (
          <div key={i} style={{ fontSize: "0.72rem", fontWeight: 700, color: col, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.4 }}>
            {l}
          </div>
        ))}
        {sub && <div style={{ fontSize: "0.62rem", color: col, lineHeight: 1.3, opacity: 0.85 }}>{sub}</div>}
      </div>
    </div>
  );
}

/** A phase bar on the track */
function PhaseBar({
  left, width, color, zIndex = 1,
}: { left: number; width: number; color: string; zIndex?: number }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, bottom: 0,
      left: `${left}%`,
      width: `${width}%`,
      background: color,
      borderRadius: 999,
      zIndex,
    }} />
  );
}

/** A circular node on the track */
function TrackNode({
  x, color, time,
}: { x: number; color: string; time?: string }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    }}>
      {time && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          fontSize: "0.65rem",
          fontWeight: 700,
          color,
          whiteSpace: "nowrap",
          background: C.white,
          padding: "1px 5px",
          borderRadius: 4,
          border: `1px solid ${hex2rgba(color, 0.3)}`,
        }}>
          {time}
        </div>
      )}
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: color,
        border: `3px solid ${C.white}`,
        boxShadow: `0 0 0 2px ${hex2rgba(color, 0.3)}`,
        flexShrink: 0,
      }} />
    </div>
  );
}

/** Phase label below the track */
function PhaseLabel({
  x, name, detail, color,
}: { x: number; name: string; detail?: string; color: string }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`,
      top: 0,
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      minWidth: 120,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: "50%",
        background: color, marginBottom: 4,
      }} />
      <div style={{ fontSize: "0.75rem", fontWeight: 700, color, textAlign: "center", whiteSpace: "nowrap" }}>
        {name}
      </div>
      {detail && (
        <div style={{ fontSize: "0.68rem", color: C.textSec, textAlign: "center", whiteSpace: "nowrap" }}>
          {detail}
        </div>
      )}
    </div>
  );
}

/** Legend row */
function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "10px 20px",
      paddingTop: 20, borderTop: `1px solid ${C.border}`,
      marginTop: 8,
    }}>
      {items.map(({ color, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: "0.72rem", color: C.textSec }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Week band header (for scenario B) */
function WeekBand({
  label, color, left, width,
}: { label: string; color: string; left: number; width: number }) {
  return (
    <div style={{
      position: "absolute",
      left: `${left}%`, width: `${width}%`,
      background: hex2rgba(color, 0.08),
      border: `1px solid ${hex2rgba(color, 0.2)}`,
      borderRadius: 8,
      padding: "4px 0",
      textAlign: "center",
      fontSize: "0.65rem",
      fontWeight: 700,
      color,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}>
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENARIO A  —  evento venerdì · sabato · domenica
════════════════════════════════════════════════════════════════ */
function TimelineWeekend() {
  // 6 equal columns: LUN MAR MER GIO VEN SAB/DOM
  const N = 6;
  const W = 100 / N; // 16.666…% per column

  // col(i, frac) → percentage x of the track
  const x = (col: number, frac = 0.5) => (col + frac) * W;

  // Phase bars: [left%, width%]
  const phases = [
    { left: x(0, 0.28), right: x(1, 0.50), color: C.order,    z: 2 },
    { left: x(1, 0.56), right: x(2, 0.90), color: C.transit,  z: 2 },
    { left: x(2, 0.62), right: x(3, 0.28), color: C.arrive,   z: 3 },
    { left: x(3, 0.22), right: x(4, 0.58), color: C.delivery, z: 2 },
    { left: x(4, 0.42), right: x(5, 0.88), color: C.event,    z: 2 },
  ];

  return (
    <div style={{ padding: "36px 40px 32px", background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

      {/* Day headers */}
      <div style={{ display: "flex", marginBottom: 24 }}>
        <DayLabel label="LUN"      highlight="order" />
        <DayLabel label="MAR"      highlight="order" />
        <DayLabel label="MER"      />
        <DayLabel label="GIO"      />
        <DayLabel label="VEN"      highlight="event" />
        <DayLabel label={"SAB\nDOM"} highlight="event" />
      </div>

      {/* Track */}
      <div style={{ position: "relative", height: 48, marginBottom: 8 }}>
        {/* Rail */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: C.border, transform: "translateY(-50%)", borderRadius: 1 }} />

        {/* Phase bars */}
        {phases.map((p, i) => (
          <PhaseBar key={i} left={p.left} width={p.right - p.left} color={p.color} zIndex={p.z} />
        ))}

        {/* Nodes */}
        <TrackNode x={x(0, 0.28)} color={C.order}    time="Lun 14:00" />
        <TrackNode x={x(1, 0.50)} color={C.deadline} time="Mar 12:00" />
        <TrackNode x={x(1, 0.56)} color={C.transit}  time="Mar 16:00" />
        <TrackNode x={x(3, 0.22)} color={C.delivery} />
        <TrackNode x={x(5, 0.50)} color={C.event}    />
      </div>

      {/* Phase labels */}
      <div style={{ position: "relative", height: 52, marginTop: 12 }}>
        <PhaseLabel x={(x(0,0.28)+x(1,0.50))/2}     color={C.order}    name="Finestra ordine"     detail="Lun 14:00 → Mar 12:00" />
        <PhaseLabel x={(x(1,0.56)+x(2,0.90))/2 + 2} color={C.transit}  name="Camion dall'Olanda"  detail="Mar ~16:00 in poi" />
        <PhaseLabel x={(x(3,0.22)+x(4,0.58))/2}     color={C.delivery} name="Consegna / ritiro"   detail="Gio mattina · Ven mattina" />
        <PhaseLabel x={(x(4,0.42)+x(5,0.88))/2}     color={C.event}    name="Il tuo evento"       />
      </div>

      {/* Legend */}
      <Legend items={[
        { color: C.order,    label: "Ordine aperto" },
        { color: C.transit,  label: "Transito Olanda → Polverigi (AN)" },
        { color: C.arrive,   label: "Arrivo magazzino" },
        { color: C.delivery, label: "Consegna" },
        { color: C.event,    label: "Il tuo evento" },
      ]} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENARIO B  —  evento lunedì · martedì · mercoledì · giovedì
════════════════════════════════════════════════════════════════ */
function TimelineWeekstart() {
  // Layout: 4 cols week-1 | separator | 3 cols week-0
  // Represent as 8 equal slots where slot 4 is the separator
  const TOTAL = 8;
  const W = 100 / TOTAL; // 12.5% per slot

  // Week -1: slots 0-3 (0%–50%)
  // Separator: slot 4 (50%–62.5%)
  // Week 0: slots 5-7 (62.5%–100%)

  // col position helpers
  // w1(i, f) = slot i in week-1, fraction f
  const w1 = (i: number, f = 0.5) => (i + f) * W;
  // w2(i, f) = slot (5+i) in week-0, fraction f
  const w2 = (i: number, f = 0.5) => (5 + i + f) * W;

  // Separator centre
  const sepX = 4.5 * W; // 56.25%

  const phases = [
    // pre-order block
    { left: w1(0,0.20), right: w1(0,0.80), color: C.preorder, z: 2 },
    // transit: VEN → SAB/DOM
    { left: w1(1,0.30), right: w1(3,0.40), color: C.transit,  z: 2 },
    // cold storage: SAB → end of week-1
    { left: w1(2,0.25), right: 4*W - 1,    color: C.arrive,   z: 3 },
    // delivery: LUN → MAR
    { left: w2(0,0.18), right: w2(1,0.55), color: C.delivery, z: 2 },
    // event span: LUN → MER/GIO
    { left: w2(0,0.48), right: w2(2,0.82), color: C.event,    z: 2 },
  ];

  return (
    <div style={{ padding: "36px 40px 32px", background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

      {/* Week band labels */}
      <div style={{ position: "relative", height: 28, marginBottom: 12 }}>
        <WeekBand label="Settimana precedente"  color={C.preorder} left={0}      width={4*W - 1} />
        <WeekBand label="Settimana dell'evento" color={C.event}    left={5*W + 1} width={3*W - 1} />
      </div>

      {/* Day headers */}
      <div style={{ display: "flex", marginBottom: 16 }}>
        {/* Week -1: 4 slots */}
        <DayLabel label={"GIO\n(sett. prec.)"} highlight="preorder" />
        <DayLabel label="VEN" />
        <DayLabel label="SAB" />
        <DayLabel label="DOM" />
        {/* Separator slot */}
        <div style={{ width: `${W}%`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </div>
        {/* Week 0: 3 slots */}
        <DayLabel label="LUN" />
        <DayLabel label="MAR" />
        <DayLabel label={"MER\nGIO"} highlight="event" />
      </div>

      {/* Separator dashed line */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute",
          left: `${sepX}%`,
          top: -8, bottom: -8,
          width: 1,
          background: `repeating-linear-gradient(to bottom, ${C.border} 0, ${C.border} 5px, transparent 5px, transparent 9px)`,
          zIndex: 5,
        }} />

        {/* Track */}
        <div style={{ position: "relative", height: 48, marginBottom: 8 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: C.border, transform: "translateY(-50%)", borderRadius: 1 }} />

          {phases.map((p, i) => (
            <PhaseBar key={i} left={p.left} width={p.right - p.left} color={p.color} zIndex={p.z} />
          ))}

          {/* Nodes */}
          <TrackNode x={w1(0,0.20)} color={C.preorder} time="Gio prec." />
          <TrackNode x={w1(1,0.30)} color={C.transit}  />
          <TrackNode x={w1(2,0.25)} color={C.arrive}   />
          <TrackNode x={w2(0,0.18)} color={C.delivery} />
          <TrackNode x={w2(2,0.80)} color={C.event}    />
        </div>
      </div>

      {/* Phase labels */}
      <div style={{ position: "relative", height: 52, marginTop: 12 }}>
        <PhaseLabel x={w1(0,0.50)}                         color={C.preorder} name="Preordine"           detail="entro giovedì sett. prec." />
        <PhaseLabel x={(w1(1,0.30)+w1(3,0.40))/2}          color={C.transit}  name="Camion dall'Olanda"  detail="ven → sab/dom" />
        <PhaseLabel x={(w1(2,0.25)+(4*W-1))/2}             color={C.arrive}   name="In cella frigorifera" detail="sab/dom in attesa" />
        <PhaseLabel x={(w2(0,0.18)+w2(1,0.55))/2}          color={C.delivery} name="Consegna / ritiro"   detail="lun o mar" />
        <PhaseLabel x={(w2(0,0.48)+w2(2,0.82))/2 + 3}      color={C.event}    name="Il tuo evento"       />
      </div>

      {/* Legend */}
      <Legend items={[
        { color: C.preorder, label: "Preordine sett. precedente" },
        { color: C.transit,  label: "Transito Olanda → Polverigi (AN)" },
        { color: C.arrive,   label: "Arrivo + conservazione in cella" },
        { color: C.delivery, label: "Consegna" },
        { color: C.event,    label: "Il tuo evento" },
      ]} />
    </div>
  );
}

/* ── Export ───────────────────────────────────────────────────── */
export default function TimelineViz({ scenario }: { scenario: Scenario }) {
  return scenario === "weekend" ? <TimelineWeekend /> : <TimelineWeekstart />;
}
