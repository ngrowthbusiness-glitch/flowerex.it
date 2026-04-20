"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import TimelineViz from "./TimelineViz";

type Scenario = "weekend" | "weekstart";

export default function ConsegnePage() {
  const [scenario, setScenario] = useState<Scenario>("weekend");

  return (
    <main>
      {/* Hero */}
      <section
        className="animate-fade-up consegne-hero"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 48px 56px", textAlign: "center" }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 18px", borderRadius: 999,
          background: "var(--orange-dim)", border: "1px solid var(--orange-border)",
          fontSize: "0.8rem", fontWeight: 600, color: "var(--orange)",
          marginBottom: 24, letterSpacing: "0.04em",
        }}>
          Tempistiche &amp; Consegne
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
          Quando ricevi i tuoi{" "}
          <span style={{ color: "var(--orange)" }}>fiori</span>?
        </h1>

        <div className="section-divider" style={{ margin: "0 auto 20px" }} />

        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
          Tutto dipende da quando hai bisogno dei fiori. Scegli il tuo scenario
          e scopri esattamente quando fare l&apos;ordine.
        </p>
      </section>

      {/* Tab switcher */}
      <div
        className="animate-fade-up delay-1 consegne-tabs-wrap"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 40, padding: "0 48px" }}
      >
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Il mio evento cade di…
        </span>
        <div
          className="consegne-tabs"
          style={{ display: "inline-flex", background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: 14, padding: 5, gap: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <TabBtn active={scenario === "weekend"} onClick={() => setScenario("weekend")} recommended>
            Venerdì · Sabato · Domenica
          </TabBtn>
          <TabBtn active={scenario === "weekstart"} onClick={() => setScenario("weekstart")}>
            Lunedì · Martedì · Mercoledì · Giovedì
          </TabBtn>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            di solito gli eventi ricadono qui
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="consegne-page-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Nota */}
        <div className="animate-fade-up delay-2" style={{ marginBottom: 24 }}>
          {scenario === "weekend" ? (
            <NotaBox color="#166534" bg="#F0FDF4" border="#BBF7D0">
              <strong>Regola d&apos;oro:</strong> ordina il{" "}
              <strong>lunedì pomeriggio dalle 14:00</strong> per avere il massimo
              assortimento. Il martedì mattina entro le 12:00 è il limite assoluto
              — ma la scelta di varietà si riduce sensibilmente.
            </NotaBox>
          ) : (
            <NotaBox color="#1e3a5f" bg="#EFF6FF" border="#BFDBFE">
              Se il tuo evento cade a inizio settimana, la logica è la stessa —
              anticipata di una settimana. L&apos;ordine va fatto il{" "}
              <strong>giovedì della settimana precedente</strong>, con partenza
              giovedì o venerdì dall&apos;Olanda.
            </NotaBox>
          )}
        </div>

        {/* Timeline — scroll orizzontale su mobile */}
        <div className="animate-fade-up delay-2 timeline-scroll-wrap" style={{ marginBottom: 20 }}>
          <div className="timeline-inner">
            <TimelineViz scenario={scenario} />
          </div>
        </div>

        {/* Conservazione */}
        <div
          className="animate-fade-up delay-3"
          style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "16px 20px", marginBottom: 56 }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🌡️</span>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#166534" }}>
            {scenario === "weekend" ? (
              <><strong>Conservazione in cella:</strong> quasi tutti i fiori possono essere conservati
              nelle celle frigorifere — se il tuo evento è domenica, i fiori restano freschi dal giovedì.
              Solo pochissime varietà delicate fanno eccezione.</>
            ) : (
              <><strong>Alternativa standard:</strong> nel 95% dei casi è possibile fare l&apos;ordine
              normale (il lunedì) e conservare i fiori in cella fino al giorno della consegna. Solo
              pochissime varietà perdono freschezza con la conservazione prolungata.</>
            )}
          </p>
        </div>

        {/* Disclaimer Sud America */}
        <div className="animate-fade-up delay-3 consegne-sudamerica">
          <DisclaimerSudAmerica />
        </div>
      </div>

      {/* CTA */}
      <section
        className="animate-fade-up delay-4 consegne-cta"
        style={{ textAlign: "center", padding: "64px 48px 80px", borderTop: "1px solid var(--border)", marginTop: 48 }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>
          Hai dubbi sulle tempistiche?
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: 32 }}>
          Scrivici su WhatsApp — ti rispondiamo in pochi minuti.
        </p>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.25)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#20BC5A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#25D366"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Scrivici su WhatsApp
        </a>
      </section>
    </main>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function TabBtn({ active, onClick, recommended, children }: { active: boolean; onClick: () => void; recommended?: boolean; children: React.ReactNode }) {
  const showGlow = recommended && active === false;
  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {recommended && (
        <div style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "2px 10px", borderRadius: 999,
          background: "var(--orange)", color: "#fff",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
          whiteSpace: "nowrap", zIndex: 2,
          boxShadow: "0 2px 8px rgba(232,100,44,0.30)",
        }}>
          Piu scelto
        </div>
      )}
      <button
        onClick={onClick}
        style={{
          display: "flex", alignItems: "center", padding: "13px 22px",
          borderRadius: 10, cursor: "pointer",
          fontSize: "0.9rem", fontWeight: active ? 600 : 500,
          color: active ? "#fff" : showGlow ? "var(--orange)" : "var(--text-secondary)",
          background: active ? "var(--orange)" : showGlow ? "var(--orange-dim)" : "transparent",
          border: showGlow ? "1.5px dashed var(--orange-border)" : "1.5px solid transparent",
          boxShadow: active ? "0 4px 16px rgba(232,100,44,0.25)" : "none",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { if (active === false) { e.currentTarget.style.color = "var(--orange)"; e.currentTarget.style.background = "var(--orange-dim)"; } }}
        onMouseLeave={(e) => {
          if (active === false) {
            e.currentTarget.style.color = showGlow ? "var(--orange)" : "var(--text-secondary)";
            e.currentTarget.style.background = showGlow ? "var(--orange-dim)" : "transparent";
          }
        }}
      >
        {children}
      </button>
    </div>
  );
}

function NotaBox({ bg, border, color, children }: { bg: string; border: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: "18px 22px", fontSize: "0.9rem", lineHeight: 1.65, color }}>
      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>💡</span>
      <span>{children}</span>
    </div>
  );
}

function DisclaimerSudAmerica() {
  return (
    <div
      className="consegne-disclaimer-grid"
      style={{ background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px 40px", marginBottom: 40, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}
    >
      <div style={{ width: 52, height: 52, borderRadius: 14, background: "#FCE7F3", border: "1px solid #FBCFE8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
        ✈️
      </div>
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
          Fiori dal Sud America — preordine obbligatorio
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
          Rose Ecuador, Ortensie Colombiane e Garofani Colombiani viaggiano su aerei dal Sud America
          con frequenza limitata (due partenze a settimana). Per garantire disponibilità e prezzo
          competitivo, queste varietà <strong>devono essere preordinate entro il giovedì–venerdì
          della settimana precedente</strong> all&apos;ordine standard. Se acquistate all&apos;asta
          olandese dell&apos;ultimo momento, il prezzo sale significativamente e la disponibilità
          non è garantita.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {["Rose Ecuador", "Ortensie Colombiane", "Garofani Colombiani"].map((tag) => (
            <span key={tag} style={{ padding: "5px 14px", background: "#FCE7F3", border: "1px solid #FBCFE8", borderRadius: 999, fontSize: "0.78rem", fontWeight: 600, color: "#9D174D" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
