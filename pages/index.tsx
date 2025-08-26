// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
      padding: 24,
      boxSizing: "border-box"
    }}>
      <div style={{
        width: 920,
        background: "white",
        borderRadius: 10,
        padding: 28,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>📨 Email Generator</h1>
        <p style={{ color: "#374151", marginTop: 8 }}>
          Build responsive email templates, export HTML, or send a test email.
        </p>

        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/builder" style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600
          }}>Start Creating</Link>
        </div>

        <div style={{ marginTop: 18, color: "#6b7280", fontSize: 13 }}>
          Built with inline styles — no Tailwind required.
        </div>
      </div>
    </div>
  );
}
