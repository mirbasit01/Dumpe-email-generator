// components/BlockRenderer.tsx
import React from "react";

export type Block = {
  id: string;
  type: "text" | "image" | "button" | "divider";
  content?: string; // for text/button: innerHTML or label, for image: src
};

export function BlockRenderer({ block, editable }: { block: Block; editable?: boolean }) {
  // email-safe inline styles for rendered block
  if (block.type === "text") {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 16,
          color: "#111827",
          lineHeight: 1.4,
        }}
        // when rendering into final HTML we expect block.content to be HTML
        dangerouslySetInnerHTML={{ __html: block.content || "<p>Your text here</p>" }}
      />
    );
  }

  if (block.type === "image") {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src={block.content || "https://via.placeholder.com/600x200"}
          alt="email image"
          style={{ width: "100%", maxWidth: 600, height: "auto", display: "block", margin: "0 auto" }}
        />
      </div>
    );
  }

  if (block.type === "button") {
    const label = block.content || "Call to action";
    // render a link styled as inline-block button
    return (
      <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
        <a
          href="#"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            background: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {label}
        </a>
      </div>
    );
  }

  // divider
  return <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "18px 0" }} />;
}
