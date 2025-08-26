// pages/builder.tsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BlockRenderer, Block } from "../components/blocks";
import Link from "next/link";

type BlockEdit = Block;

export default function BuilderPage() {
  const [blocks, setBlocks] = useState<BlockEdit[]>([
    { id: uuidv4(), type: "text", content: "<h2 style='margin:0;'>Welcome!</h2><p style='margin-top:8px;color:#374151;'>Start editing this text block.</p>" },
  ]);
  const [sending, setSending] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function addBlock(type: Block["type"]) {
    let newBlock: BlockEdit;
    if (type === "text") newBlock = { id: uuidv4(), type: "text", content: "<p>Edit your text...</p>" };
    else if (type === "image") newBlock = { id: uuidv4(), type: "image", content: "https://via.placeholder.com/600x200" };
    else if (type === "button") newBlock = { id: uuidv4(), type: "button", content: "Click Me" };
    else newBlock = { id: uuidv4(), type: "divider" };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedId(newBlock.id);
  }

  function updateBlock(id: string, patch: Partial<BlockEdit>) {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
  }

  function removeBlock(id: string) {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function newadd(id: string){
    const newBlock: BlockEdit = {id : uuidv4() , type: 'text' , content: '<p> Example Text</p> '}
    setBlocks(prev => [...prev, newBlock]);
    setSelectedId(newBlock.id);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setBlocks(prev => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  }
  function moveDown(index: number) {
    setBlocks(prev => {
      const arr = [...prev];
      if (index === arr.length - 1) return arr;
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      return arr;
    });
  }

  function exportHTML() {
    // Wrap content in a simple email container with inline styles
    const htmlContent = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body style="margin:0;padding:0;background:#f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td align="center" style="padding:24px 0">
              <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:white;border-radius:8px;overflow:hidden;">
                <tr><td style="padding:28px;">
                  ${blocks.map(b => {
                    if (b.type === "text") return `<div style="font-family:Arial, sans-serif;font-size:16px;color:#111827;line-height:1.4;">${b.content || ""}</div>`;
                    if (b.type === "image") return `<div style="text-align:center;"><img src="${b.content || ""}" alt="" style="width:100%;max-width:600px;height:auto;display:block;border:0;" /></div>`;
                    if (b.type === "button") return `<div style="text-align:center;margin:14px 0;"><a href="#" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-family:Arial, sans-serif;">${b.content || "CTA"}</a></div>`;
                    if (b.type === "divider") return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;" />`;
                    return "";
                  }).join("")}
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email.html";
    a.click();
  }

  async function sendTest() {
    if (!testEmail) return alert("Enter recipient email for test.");
    setSending(true);
    try {
      const html = `
        <!doctype html>
        <html><body style="margin:0;padding:0;background:#f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td align="center" style="padding:24px 0">
              <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:white;border-radius:8px;overflow:hidden;">
                <tr><td style="padding:28px;">
                  ${blocks.map(b => {
                    if (b.type === "text") return `<div style="font-family:Arial, sans-serif;font-size:16px;color:#111827;line-height:1.4;">${b.content || ""}</div>`;
                    if (b.type === "image") return `<div style="text-align:center;"><img src="${b.content || ""}" alt="" style="width:100%;max-width:600px;height:auto;display:block;border:0;" /></div>`;
                    if (b.type === "button") return `<div style="text-align:center;margin:14px 0;"><a href="#" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-family:Arial, sans-serif;">${b.content || "CTA"}</a></div>`;
                    if (b.type === "divider") return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;" />`;
                    return "";
                  }).join("")}
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body></html>
      `;
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, to: testEmail }),
      });
      const data = await res.json();
      if (data.success) alert("Test email sent ✅");
      else alert("Send failed. Check server logs.");
    } catch (err) {
      console.error(err);
      alert("Send error — check console and server logs.");
    } finally {
      setSending(false);
    }
  }

  const containerStyle: React.CSSProperties = {
    display: "flex",
    gap: 18,
    padding: 18,
    boxSizing: "border-box",
    minHeight: "100vh",
    background: "#f3f4f6"
  };

  const leftStyle: React.CSSProperties = {
    width: 260,
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12
  };

  const rightStyle: React.CSSProperties = {
    width: 300,
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
  };

  return (
    <div>
      <div style={{
        padding: 12,
        borderBottom: "1px solid #e6e6e6",
        background: "white",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <Link href="/" style={{ textDecoration: "none", color: "#374151", fontWeight: 600 }}>← Home</Link>
        <div style={{ flex: 1 }} />
        <div style={{ color: "#6b7280", fontSize: 13 }}>Inline styles builder</div>
      </div>

      <div style={containerStyle}>
        {/* Left: Add blocks */}
        <div style={leftStyle}>
          <h3 style={{ margin: 0 }}>Blocks</h3>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => addBlock("text")} style={btnStyle}>+ Text</button>
            <button onClick={() => addBlock("image")} style={btnStyle}>+ Image</button>
            <button onClick={() => addBlock("button")} style={btnStyle}>+ Button</button>
            <button onClick={() => addBlock("divider")} style={btnStyle}>+ Divider</button>
          </div>

          <div style={{ marginTop: 18 }}>
            <h4 style={{ margin: "8px 0" }}>Selected</h4>
            <div style={{ color: "#6b7280", fontSize: 13 }}>
              Click a block on the canvas to edit it.
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input placeholder="test@you.com" value={testEmail} onChange={e => setTestEmail(e.target.value)} style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb" }} />
                <button onClick={sendTest} disabled={sending} style={{ ...btnStyle, padding: "8px 10px" }}>{sending ? "Sending..." : "Send"}</button>
              </div>
              <div style={{ marginTop: 10 }}>
                <button onClick={exportHTML} style={{ ...btnStyle, width: "100%" }}>Export HTML</button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Canvas + editor */}
        <div style={mainStyle}>
          <div style={{
            background: "#fff",
            padding: 16,
            borderRadius: 10,
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ marginTop: 0 }}>Canvas</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                {/* Canvas preview area (email width) */}
                <div style={{
                  width: "100%",
                  maxWidth: 680,
                  margin: "0 auto",
                  background: "#ffffff",
                  borderRadius: 8,
                  padding: 24,
                  boxSizing: "border-box",
                  border: "1px solid #e5e7eb"
                }}>
                  {/* Render blocks */}
                  {blocks.length === 0 && <div style={{ color: "#9ca3af" }}>No blocks — add some from left.</div>}
                  {blocks.map((b, idx) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedId(b.id)}
                      style={{
                        marginBottom: 12,
                        cursor: "pointer",
                        outline: selectedId === b.id ? "2px solid #bfdbfe" : "none",
                        padding: selectedId === b.id ? 6 : 0,
                        borderRadius: 6,
                      }}
                    >
                      <BlockRenderer block={b} />
                      {/* controls for each block */}
                      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                        <button onClick={() => moveUp(idx)} style={smallBtn}>↑</button>
                        <button onClick={() => moveDown(idx)} style={smallBtn}>↓</button>
                        <button onClick={() => removeBlock(b.id)} style={smallBtnDanger}>Delete</button>
                        <div style={{ flex: 1 }} />
                        <div style={{ color: "#6b7280", fontSize: 12 }}>{b.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor panel (for selected block) */}
              <div style={{ width: 320 }}>
                <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
                  <h4 style={{ marginTop: 0 }}>Editor</h4>
                  {!selectedId && <div style={{ color: "#9ca3af" }}>Select a block to edit</div>}
                  {selectedId && (() => {
                    const b = blocks.find(x => x.id === selectedId)!;
                    if (!b) return null;
                    if (b.type === "text") {
                      return (
                        <div>
                          <div style={{ marginBottom: 8 }}>Text (HTML allowed)</div>
                          <textarea value={b.content} onChange={e => updateBlock(b.id, { content: e.target.value })} rows={8} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                          <div style={{ marginTop: 8 }}>
                            <button onClick={() => updateBlock(b.id, { content: b.content })} style={btnStyle}>Save</button>
                          </div>
                        </div>
                      );
                    }
                    if (b.type === "image") {
                      return (
                        <div>
                          <div style={{ marginBottom: 8 }}>Image URL</div>
                          <input value={b.content} onChange={e => updateBlock(b.id, { content: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                          <div style={{ marginTop: 8 }}>
                            <button onClick={() => updateBlock(b.id, { content: b.content })} style={btnStyle}>Apply</button>
                          </div>
                        </div>
                      );
                    }
                    if (b.type === "button") {
                      return (
                        <div>
                          <div style={{ marginBottom: 8 }}>Button Label</div>
                          <input value={b.content} onChange={e => updateBlock(b.id, { content: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #e5e7eb" }} />
                          <div style={{ marginTop: 8 }}>
                            <button onClick={() => updateBlock(b.id, { content: b.content })} style={btnStyle}>Apply</button>
                          </div>
                        </div>
                      );
                    }
                    return <div>Nothing to edit for this block</div>;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Settings / Preview */}
        <div style={rightStyle}>
          <h3 style={{ marginTop: 0 }}>Preview & Actions</h3>
          <div style={{ marginTop: 8, marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Preview (desktop width)</div>
            <div style={{ marginTop: 12, borderRadius: 8, overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <div style={{ background: "#fff", padding: 16 }}>
                {blocks.map(b => <div key={b.id} style={{ marginBottom: 10 }}><BlockRenderer block={b} /></div>)}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={exportHTML} style={{ ...btnStyle, flex: 1 }}>Export HTML</button>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
            Note: Exported HTML uses basic inline styles suitable for many email clients.
          </div>
        </div>
      </div>
    </div>
  );
}

// common button styles
const btnStyle: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600
};

const smallBtn: React.CSSProperties = {
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer"
};

const smallBtnDanger: React.CSSProperties = {
  ...smallBtn,
  color: "#dc2626",
  borderColor: "rgba(220,38,38,0.12)"
};
