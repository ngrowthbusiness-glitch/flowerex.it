import Image from "next/image";
import { SITE, CONTACT, STRENGTHS } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--nav-h)",
      }}
    >
      {/* Main split: Text left + Map right */}
      <div
        className="hero-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 56,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "80px 48px 48px",
          alignItems: "start",
        }}
      >
        {/* ── Left: Identity + CTA ── */}
        <div>
          <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Image
              src="/logo-flowerex.png"
              alt="Flowerex — Ingrosso Fiori Recisi"
              width={72}
              height={72}
              priority
            />
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--orange)" }}>
                Flowerex
              </span>
              <div className="section-divider" style={{ marginTop: 4 }} />
            </div>
          </div>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 800,
              marginTop: 32,
              color: "var(--text)",
              lineHeight: 1.05,
            }}
          >
            Ingrosso{" "}
            <span style={{ color: "var(--orange)" }}>Fiori Recisi</span>
          </h1>

          <p
            className="animate-fade-up delay-2"
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              marginTop: 20,
              lineHeight: 1.6,
              maxWidth: 460,
            }}
          >
            {SITE.subtitle}
          </p>

          {/* Info pills */}
          <div
            className="animate-fade-up delay-2"
            style={{
              display: "flex",
              gap: 10,
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 16px",
                background: "var(--orange-dim)",
                border: "1px solid var(--orange-border)",
                borderRadius: 100,
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "var(--orange)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {CONTACT.hours}
            </div>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 16px",
                background: "var(--bg-white)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Agugliano (AN)
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className="animate-fade-up delay-3"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 36,
            }}
          >
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* ── Right: Google Maps ── */}
        <div className="animate-fade-up delay-2">
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)" }}>
              Dove ci troviamo
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
              {CONTACT.address}
            </p>
          </div>
          <div
            className="map-container"
            style={{
              height: 380,
              borderRadius: 20,
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
            }}
          >
            <iframe
              src={CONTACT.mapsEmbed}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Flowerex — Fiorista all'ingrosso, Agugliano (AN)"
            />
          </div>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 12,
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--orange)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Apri in Google Maps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Strengths row ── */}
      <div
        className="animate-fade-up delay-5"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 48px 56px",
        }}
      >
        <div
          className="strengths-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {STRENGTHS.map((s) => (
            <div
              key={s.title}
              style={{
                padding: "20px 24px",
                background: "var(--bg-white)",
                borderRadius: 14,
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "var(--orange-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.icon === "flower" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" />
                    <path d="M22 12a4 4 0 0 1-8 0 4 4 0 0 1 8 0z" />
                    <path d="M12 22a4 4 0 0 1 0-8 4 4 0 0 1 0 8z" />
                    <path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" />
                  </svg>
                )}
                {s.icon === "tag" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                    <path d="M7 7h.01" />
                  </svg>
                )}
                {s.icon === "chat" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
