import Link from "next/link";

export default function DeliveryTeaser() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 48px 56px",
      }}
    >
      <Link
        href="/consegne"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="delivery-teaser animate-fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "28px 36px",
            background: "var(--bg-white)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--orange-border)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 6px 24px rgba(232,100,44,0.1)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 12px rgba(0,0,0,0.04)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          {/* Left: icon + text */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--orange-dim)",
                border: "1px solid var(--orange-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Clock icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--orange)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--orange)",
                  marginBottom: 4,
                }}
              >
                Come funziona
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                Scopri i tempi di consegna
              </p>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--text-secondary)",
                  marginTop: 3,
                }}
              >
                Quando fare l&apos;ordine e quando aspettarti i fiori
              </p>
            </div>
          </div>

          {/* Right: arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              color: "var(--orange)",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            <span className="delivery-teaser-label">Scopri la timeline</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  );
}
