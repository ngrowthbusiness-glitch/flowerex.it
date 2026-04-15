import Image from "next/image";
import { CONTACT, HAMIFLEURS } from "@/lib/constants";

export default function HamifleursPage() {
  return (
    <>
      {/* ── Disclaimer bar: servizio riservato ── */}
      <div
        style={{
          background: "var(--orange-dim)",
          borderBottom: "1px solid var(--orange-border)",
          padding: "12px 16px",
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: 500,
          lineHeight: 1.45,
          color: "var(--text)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "inline-block", verticalAlign: "-3px", marginRight: 8 }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <strong style={{ color: "var(--orange)", fontWeight: 700 }}>
          Servizio riservato.
        </strong>{" "}
        Questa sezione è dedicata esclusivamente ai clienti Flowerex che hanno
        attivato il servizio di acquisto su Hamifleurs.{" "}
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--orange)", fontWeight: 700, textDecoration: "none" }}
        >
          Richiedi accesso →
        </a>
      </div>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "64px 0 48px",
        }}
      >
        <div
          className="hf-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 56,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 48px",
            alignItems: "start",
          }}
        >
          {/* Left: intro + checklist */}
          <div className="animate-fade-up">
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--orange)",
              }}
            >
              Onboarding Hamifleurs
            </span>
            <div className="section-divider" style={{ marginTop: 4 }} />

            <h1
              style={{
                fontSize: "clamp(2rem, 4.2vw, 2.9rem)",
                fontWeight: 800,
                marginTop: 24,
                lineHeight: 1.08,
              }}
            >
              Prima di entrare nel{" "}
              <span style={{ color: "var(--orange)" }}>webshop</span>,<br />
              leggi qui.
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                marginTop: 18,
                maxWidth: 520,
                lineHeight: 1.6,
              }}
            >
              Hamifleurs è il fornitore olandese da cui acquisti con il tuo
              sub-account. I fiori arrivano a noi a Flowerex e li consegniamo
              a te. Trovi qui tutto quello che ti serve ricordare{" "}
              <strong>ogni volta</strong> che fai un ordine.
            </p>

            {/* Checklist */}
            <div
              style={{
                marginTop: 32,
                background: "var(--bg-white)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "24px 26px",
              }}
            >
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: "var(--orange-dim)",
                    color: "var(--orange)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Checklist pre-acquisto
              </h3>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    title: "Verifica la data di partenza",
                    desc: "Appena fai login, controlla che sia quella corretta. Una data sbagliata significa ordine annullato o consegnato nel giorno sbagliato.",
                  },
                  {
                    title: "Controlla la quantità del secchio",
                    desc: "Le quantità non sempre sono modificabili a carrello. Verifica prima di aggiungere.",
                  },
                  {
                    title: "Conferma l'ordine dal carrello",
                    desc: "Puoi farlo manualmente. Se non lo fai, dopo alcuni minuti la conferma parte in automatico.",
                  },
                  {
                    title: "Rispetta le tempistiche",
                    desc: "Ordine entro lunedì pomeriggio → consegna giovedì. Per partenza martedì: termine ultimo martedì ore 12:00.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: 18,
                        height: 18,
                        marginTop: 2,
                        borderRadius: "50%",
                        border: "2px solid var(--orange)",
                        background: "var(--orange-dim)",
                      }}
                    />
                    <div>
                      <strong style={{ fontWeight: 700 }}>{item.title}</strong>
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.82rem",
                          marginTop: 3,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: video Loom + login screenshots */}
          <div className="animate-fade-up delay-2">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>
              Tutorial webshop
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginBottom: 16,
              }}
            >
              2 minuti per capire come navigare, scegliere i fiori e confermare l&apos;ordine.
            </p>

            {/* Loom embed responsive 16:9 */}
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                background: "#1a1a1a",
              }}
            >
              <iframe
                src={HAMIFLEURS.loomEmbedUrl}
                allowFullScreen
                title="Tutorial webshop Hamifleurs"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>

            {/* Login screenshots — il passaggio non mostrato nel video */}
            <div style={{ marginTop: 28 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  i
                </span>
                <h4 style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                  Come accedere al webshop
                </h4>
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                Il video parte dall&apos;interno dell&apos;area riservata: queste due
                immagini ti mostrano il percorso di login da fare prima.
              </p>

              <div
                className="hf-login-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { src: "/hamifleurs/login-1.png", caption: "1. Pagina di accesso" },
                  { src: "/hamifleurs/login-2.png", caption: "2. Inserisci le credenziali" },
                ].map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hf-login-thumb"
                    aria-label={`${img.caption} — apri in dimensione intera`}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <figure
                      style={{
                        margin: 0,
                        background: "var(--bg-white)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        overflow: "hidden",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                      }}
                    >
                      <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          sizes="(max-width: 900px) 50vw, 300px"
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                        <span
                          aria-hidden
                          className="hf-login-zoom"
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "rgba(26,26,26,0.75)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.2s ease",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </span>
                      </div>
                      <figcaption
                        style={{
                          padding: "8px 12px",
                          fontSize: "0.78rem",
                          color: "var(--text-secondary)",
                          borderTop: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span>{img.caption}</span>
                        <span style={{ color: "var(--orange)", fontWeight: 600, fontSize: "0.72rem" }}>
                          Apri →
                        </span>
                      </figcaption>
                    </figure>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALERT BAR ── */}
      <section
        style={{
          background: "#FFF8F1",
          borderTop: "1px solid #F2C48E",
          borderBottom: "1px solid #F2C48E",
          padding: "28px 0",
        }}
      >
        <div
          className="hf-alerts-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <AlertItem
            icon="!"
            title="Fiori «Direct Grower» non annullabili"
            body="Una volta confermati innescano un processo irreversibile: nemmeno i referenti olandesi possono annullarli. Verifica sempre prima di comprare."
          />
          <AlertItem
            icon="⏱"
            title="Lavorazioni lun / mar / mer?"
            body="Per eventi o lavorazioni a inizio settimana, l'ordine va fatto la settimana precedente. Contattaci prima per coordinare le tempistiche."
          />
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section style={{ padding: "72px 0 48px" }}>
        <div className="hf-wrap">
          <div className="hf-section-heading" style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--orange)",
              }}
            >
              Come funziona
            </span>
            <div className="section-divider" style={{ margin: "4px auto 0" }} />
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: 8 }}>
              Cosa aspettarti operativamente
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: 12,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Tutto ciò che riguarda fatturazione, prezzi, trasporto e consegne.
            </p>
          </div>

          <div
            className="hf-info-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
          >
            <InfoCard
              title="Fattura emessa da Flowerex"
              body="Non riceverai fattura dall'Olanda. L'intestatario del documento fiscale siamo noi."
              path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8"
            />
            <InfoCard
              title="Prezzi al netto di IVA"
              body="I prezzi a webshop sono prezzi finiti, al netto di IVA (da aggiungere in fattura)."
              path="M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            />
            <InfoCard
              title="Trasporto variabile"
              body="Dipende dalla quantità: meno fiori = più incide. Ti inviamo il tariffario dedicato su richiesta."
              path="M1 3 16 3 16 16 1 16Z M16 8 20 8 23 11 23 16 16 16"
            />
            <InfoCard
              title="Tempistiche standard"
              body="Ordine lunedì → arrivo a noi e consegna a te il giovedì della stessa settimana."
              path="M3 4 21 4 21 22 3 22Z M3 10 21 10 M8 2 8 6 M16 2 16 6"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "48px 0 64px" }} id="accedi">
        <div className="hf-wrap">
          <div
            className="hf-cta-box"
            style={{
              background: "linear-gradient(135deg, var(--orange), var(--orange-light))",
              borderRadius: 24,
              padding: "56px 40px",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(232,100,44,0.25)",
            }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>
              Tutto chiaro? Entra nel webshop.
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                opacity: 0.95,
                maxWidth: 520,
                margin: "0 auto 32px",
              }}
            >
              Accedi con il tuo sub-account. Quando sei pronto, clicca qui sotto.
            </p>
            <a
              href={HAMIFLEURS.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 36px",
                background: "#fff",
                color: "var(--orange)",
                fontWeight: 700,
                fontSize: "1.05rem",
                borderRadius: 12,
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Vai al webshop Hamifleurs
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <div style={{ marginTop: 20, fontSize: "0.82rem", opacity: 0.85 }}>
              Il link apre Hamifleurs in una nuova scheda
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="hf-wrap">
          <div className="hf-section-heading" style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--orange)",
              }}
            >
              Domande frequenti
            </span>
            <div className="section-divider" style={{ margin: "4px auto 0" }} />
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: 8 }}>FAQ</h2>
          </div>

          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Faq
              q="Dove arrivano i fiori dopo l'acquisto?"
              a="I fiori arrivano a noi (Flowerex, Agugliano AN). Siamo noi a consegnarli a te — non vengono spediti direttamente dall'Olanda al tuo indirizzo."
              open
            />
            <Faq
              q="Quando devo fare l'ordine?"
              a="Regola generale: ordine il lunedì per ricevere il giovedì della stessa settimana. Per partenza martedì il termine ultimo è martedì alle 12:00. Per lavorazioni lun/mar/mer l'ordine va fatto la settimana precedente — in questi casi contattaci prima."
            />
            <Faq
              q="Chi mi emette la fattura?"
              a="Flowerex. Non riceverai nessun documento fiscale dall'Olanda."
            />
            <Faq
              q="I prezzi includono IVA e trasporto?"
              a="I prezzi a webshop sono prezzi finiti, al netto di IVA (da aggiungere in fattura). Il costo di trasporto è variabile in base alla quantità — più bassa è la quantità, più incide."
            />
            <Faq
              q="Cosa significa «Direct Grower»?"
              a="Sono fiori acquistati direttamente dal produttore. Una volta confermati non sono annullabili, nemmeno dai referenti olandesi, perché l'acquisto innesca un processo irreversibile. Verifica sempre prima di confermare."
            />
            <Faq
              q="Posso annullare gli articoli dal carrello?"
              a="Non sempre in modo semplice: non è un ecommerce tradizionale. Meglio essere sicuri di quantità e data prima di aggiungere al carrello."
            />
            <Faq
              q="Devo confermare manualmente l'ordine?"
              a="Puoi farlo manualmente dal carrello. Se non lo fai, la conferma avviene comunque in automatico dopo alcuni minuti."
            />
          </div>
        </div>
      </section>

      {/* ── Help footer ── */}
      <section
        style={{
          background: "var(--bg-white)",
          borderTop: "1px solid var(--border)",
          padding: "40px 0",
          textAlign: "center",
        }}
      >
        <div className="hf-wrap">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
            Dubbi prima di ordinare?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
            Scrivici su WhatsApp, ti rispondiamo nel minor tempo possibile.
          </p>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#25D366",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contattaci su WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

/* ── Subcomponents ── */

function AlertItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "var(--orange)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
        }}
      >
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 4 }}>{title}</h4>
        <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ title, body, path }: { title: string; body: string; path: string }) {
  return (
    <div
      style={{
        background: "var(--bg-white)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "22px 24px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "var(--orange-dim)",
          color: "var(--orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={path} />
        </svg>
      </div>
      <div>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 4 }}>{title}</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function Faq({ q, a, open = false }: { q: string; a: string; open?: boolean }) {
  return (
    <details
      className="hf-faq"
      open={open}
      style={{
        background: "var(--bg-white)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          padding: "18px 24px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.98rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
        }}
      >
        <span>{q}</span>
        <span
          aria-hidden
          style={{
            color: "var(--orange)",
            fontSize: "1.4rem",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </summary>
      <div
        style={{
          padding: "0 24px 20px",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        {a}
      </div>
    </details>
  );
}
