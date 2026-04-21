"use client";

import { useState, useRef, useCallback } from "react";
import type { CalcolatoreProduct, CalcolatoreResult } from "@/app/api/calcolatore/route";

const DEFAULT_MARGIN_FIXED = 0.25;
const DEFAULT_MARGIN_PERCENT = 33;

type InputMode = "text" | "image";
type Status = "idle" | "loading" | "success" | "error";

export default function CalcolatoreClient() {
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [marginFixed, setMarginFixed] = useState(DEFAULT_MARGIN_FIXED);
  const [marginPercent, setMarginPercent] = useState(DEFAULT_MARGIN_PERCENT);
  const [showMarginSettings, setShowMarginSettings] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<CalcolatoreResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // --- Image handling ---
  const handleImageFile = useCallback((file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      handleImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  // --- Submit ---
  const handleSubmit = async () => {
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      let body: Record<string, unknown> = {
        marginFixed,
        marginPercent,
      };

      if (inputMode === "image" && imageFile) {
        const base64 = await fileToBase64(imageFile);
        body.imageBase64 = base64;
        body.imageMediaType = imageFile.type || "image/jpeg";
      } else {
        body.text = text;
      }

      const res = await fetch("/api/calcolatore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Errore sconosciuto.");
        setStatus("error");
        return;
      }

      setResult(data as CalcolatoreResult);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Errore di rete.");
      setStatus("error");
    }
  };

  const canSubmit =
    status !== "loading" &&
    (inputMode === "text" ? text.trim().length > 10 : imageFile !== null);

  // --- Copy table as CSV ---
  const copyAsCSV = () => {
    if (!result) return;
    const rows = [
      ["Prodotto", "Qtà", "Prezzo costo (€)", "Prezzo cliente (€)", "Tot. costo (€)", "Tot. cliente (€)"],
      ...result.products.map((p) => [
        p.name,
        p.qty,
        fmt(p.unitCost),
        fmt(p.unitPrice),
        fmt(p.totalCost),
        fmt(p.totalPrice),
      ]),
      ["", "", "", "", "TOTALE costo", fmt(result.grandTotalCost)],
      ["", "", "", "", "TOTALE cliente", fmt(result.grandTotalPrice)],
    ];
    const csv = rows.map((r) => r.join("\t")).join("\n");
    navigator.clipboard.writeText(csv).then(() => alert("Tabella copiata negli appunti!"));
  };

  return (
    <main>
      {/* Header */}
      <section
        className="animate-fade-up"
        style={{ maxWidth: 860, margin: "0 auto", padding: "64px 48px 40px", textAlign: "center" }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 18px", borderRadius: 999,
          background: "var(--orange-dim)", border: "1px solid var(--orange-border)",
          fontSize: "0.78rem", fontWeight: 600, color: "var(--orange)",
          marginBottom: 20, letterSpacing: "0.05em",
        }}>
          🔒 Strumento interno
        </div>
        <h1 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
          Calcolatore <span style={{ color: "var(--orange)" }}>prezzi cliente</span>
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
          Incolla il testo della fattura olandese oppure carica uno screenshot: Claude calcola automaticamente i prezzi da mostrare ai tuoi clienti.
        </p>
      </section>

      {/* Main card */}
      <div
        className="animate-fade-up delay-1"
        style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px 80px" }}
      >
        <div style={{
          background: "var(--bg-white)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "36px 40px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}>

          {/* Input mode toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {(["text", "image"] as InputMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setInputMode(mode)}
                style={{
                  padding: "10px 20px", borderRadius: 10, cursor: "pointer",
                  fontSize: "0.875rem", fontWeight: inputMode === mode ? 600 : 500,
                  color: inputMode === mode ? "#fff" : "var(--text-secondary)",
                  background: inputMode === mode ? "var(--orange)" : "transparent",
                  border: inputMode === mode ? "1.5px solid var(--orange)" : "1.5px solid var(--border)",
                  transition: "all 0.18s",
                }}
              >
                {mode === "text" ? "📄 Incolla testo" : "🖼️ Carica immagine / screenshot"}
              </button>
            ))}
          </div>

          {/* Text input */}
          {inputMode === "text" && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Testo fattura
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Incolla qui le righe della fattura, ad esempio:\n\n1 x 20  20  Anthurium graciosa  690 127409 BI  9  A1 NL  1,57  31,40\n1 x 30  30  Hydrangea white in box  QBA 6254 BI  60  A1 CO  1,85  55,50\n...`}
                rows={12}
                style={{
                  width: "100%", borderRadius: 12, border: "1.5px solid var(--border)",
                  padding: "14px 16px", fontSize: "0.85rem", fontFamily: "monospace",
                  lineHeight: 1.7, color: "var(--text)", background: "var(--bg)",
                  resize: "vertical", outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.18s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--orange)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
              />
            </div>
          )}

          {/* Image input */}
          {inputMode === "image" && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Screenshot o PDF fattura
              </label>
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${imageFile ? "var(--orange)" : "var(--border)"}`,
                  borderRadius: 14, padding: "32px 20px", textAlign: "center",
                  cursor: "pointer", background: imageFile ? "var(--orange-dim)" : "var(--bg)",
                  transition: "all 0.18s",
                }}
              >
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Anteprima fattura"
                      style={{ maxHeight: 220, maxWidth: "100%", borderRadius: 8, objectFit: "contain", marginBottom: 12 }}
                    />
                    <p style={{ fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600 }}>
                      {imageFile?.name} — clicca per cambiare
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📎</div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 6 }}>
                      Trascina qui lo screenshot o il PDF della fattura
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                      oppure clicca per selezionare il file
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Margin settings (collapsible) */}
          <div style={{ marginBottom: 28 }}>
            <button
              onClick={() => setShowMarginSettings(!showMarginSettings)}
              style={{
                display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
                fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)",
                background: "none", border: "none", padding: 0,
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: showMarginSettings ? "rotate(90deg)" : "none", transition: "transform 0.18s" }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              Impostazioni margini (Profilo Standard)
            </button>

            {showMarginSettings && (
              <div style={{
                marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
                background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12,
                padding: "20px 22px",
              }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
                    Margine fisso per unità (€)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={marginFixed}
                    onChange={(e) => setMarginFixed(Number(e.target.value))}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid var(--border)", fontSize: "0.9rem",
                      color: "var(--text)", background: "var(--bg-white)", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
                    Margine percentuale (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={marginPercent}
                    onChange={(e) => setMarginPercent(Number(e.target.value))}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid var(--border)", fontSize: "0.9rem",
                      color: "var(--text)", background: "var(--bg-white)", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-faint)", margin: 0 }}>
                    Formula: <code style={{ background: "var(--border)", padding: "2px 6px", borderRadius: 4 }}>(costo + €fisso) × (1 + %/100)</code>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              width: "100%", padding: "16px 24px", borderRadius: 14, cursor: canSubmit ? "pointer" : "not-allowed",
              fontSize: "1rem", fontWeight: 700, color: "#fff",
              background: canSubmit ? "var(--orange)" : "var(--border)",
              border: "none", transition: "all 0.18s",
              boxShadow: canSubmit ? "0 4px 20px rgba(232,100,44,0.25)" : "none",
            }}
          >
            {status === "loading" ? (
              <>
                <Spinner />
                Claude sta analizzando la fattura…
              </>
            ) : (
              <>
                ✨ Calcola prezzi cliente
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {status === "error" && (
          <div
            className="animate-fade-up"
            style={{
              marginTop: 20, display: "flex", alignItems: "flex-start", gap: 12,
              background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 14,
              padding: "16px 20px", color: "#B91C1C", fontSize: "0.875rem", lineHeight: 1.6,
            }}
          >
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results */}
        {status === "success" && result && (
          <div className="animate-fade-up" style={{ marginTop: 28 }}>
            {/* Summary bar */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20,
            }}>
              <SummaryCard label="Prodotti trovati" value={String(result.products.length)} />
              <SummaryCard
                label="Totale fattura (costo)"
                value={`€ ${fmt(result.grandTotalCost)}`}
                sub="tuo prezzo acquisto"
              />
              <SummaryCard
                label="Totale prezzi cliente"
                value={`€ ${fmt(result.grandTotalPrice)}`}
                sub={`+€ ${fmt(result.grandTotalPrice - result.grandTotalCost)} di margine`}
                highlight
              />
            </div>

            {/* Table */}
            <div style={{
              background: "var(--bg-white)", border: "1px solid var(--border)",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Dettaglio prodotti</span>
                <button
                  onClick={copyAsCSV}
                  style={{
                    padding: "7px 14px", borderRadius: 8, cursor: "pointer",
                    fontSize: "0.78rem", fontWeight: 600, color: "var(--orange)",
                    background: "var(--orange-dim)", border: "1px solid var(--orange-border)",
                  }}
                >
                  Copia tabella
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "var(--bg)" }}>
                      {["Prodotto", "Qtà", "Costo/unit", "Prezzo cl./unit", "Tot. costo", "Tot. cliente"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "11px 14px", textAlign: h === "Prodotto" ? "left" : "right",
                            fontSize: "0.75rem", fontWeight: 600, color: "var(--text-faint)",
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            borderBottom: "1px solid var(--border)", whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.products.map((p: CalcolatoreProduct, i: number) => (
                      <tr
                        key={i}
                        style={{ borderBottom: "1px solid var(--border)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "var(--bg)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}
                      >
                        <td style={{ padding: "12px 14px", fontWeight: 500, color: "var(--text)" }}>
                          {p.name}
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right", color: "var(--text-secondary)" }}>
                          {p.qty}
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right", color: "var(--text-secondary)" }}>
                          € {fmt(p.unitCost)}
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, color: "var(--orange)" }}>
                          € {fmt(p.unitPrice)}
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right", color: "var(--text-secondary)" }}>
                          € {fmt(p.totalCost)}
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, color: "var(--text)" }}>
                          € {fmt(p.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "var(--bg)", borderTop: "2px solid var(--border)" }}>
                      <td colSpan={4} style={{ padding: "13px 14px", fontWeight: 700, fontSize: "0.85rem" }}>
                        Totali
                      </td>
                      <td style={{ padding: "13px 14px", textAlign: "right", fontWeight: 700 }}>
                        € {fmt(result.grandTotalCost)}
                      </td>
                      <td style={{ padding: "13px 14px", textAlign: "right", fontWeight: 700, color: "var(--orange)" }}>
                        € {fmt(result.grandTotalPrice)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Reset */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                onClick={() => {
                  setStatus("idle");
                  setResult(null);
                  setText("");
                  setImageFile(null);
                  setImagePreview(null);
                }}
                style={{
                  padding: "10px 24px", borderRadius: 10, cursor: "pointer",
                  fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)",
                  background: "transparent", border: "1.5px solid var(--border)",
                }}
              >
                Nuova fattura
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ── Helpers ─────────────────────────────────────────── */

function fmt(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Spinner() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function SummaryCard({
  label, value, sub, highlight,
}: {
  label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div style={{
      background: highlight ? "var(--orange)" : "var(--bg-white)",
      border: `1px solid ${highlight ? "var(--orange)" : "var(--border)"}`,
      borderRadius: 14, padding: "18px 20px",
      boxShadow: highlight ? "0 4px 20px rgba(232,100,44,0.18)" : "none",
    }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: highlight ? "rgba(255,255,255,0.75)" : "var(--text-faint)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: "1.35rem", fontWeight: 800, color: highlight ? "#fff" : "var(--text)", letterSpacing: "-0.02em" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: "0.75rem", color: highlight ? "rgba(255,255,255,0.8)" : "var(--text-faint)", marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
