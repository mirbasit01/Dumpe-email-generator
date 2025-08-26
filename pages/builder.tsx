"use client";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Block, BlockRenderer } from "@/components/blocks";
import { v4 as uuidv4 } from "uuid";

const availableBlocks: Omit<Block, "id">[] = [
  { type: "text", content: "<p>Edit your text...</p>" },
  { type: "image" },
  { type: "button", content: "Click Me" },
  { type: "divider" },
];

function DraggableItem({ block, id }: { block: any; id: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-move bg-gray-100 p-2 rounded mb-2 shadow text-center"
    >
      {block.type.toUpperCase()}
    </div>
  );
}

function DroppableCanvas({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  return (
    <div
      ref={setNodeRef}
      className="min-h-[400px] border-2 border-dashed border-gray-400 bg-white p-4 rounded-xl"
    >
      {children}
    </div>
  );
}

export default function Builder() {
  const [canvasBlocks, setCanvasBlocks] = useState<Block[]>([]);

  const handleDragEnd = (event: any) => {
    if (event.over?.id === "canvas") {
      const draggedBlock = availableBlocks.find((b) => b.type === event.active.id);
      if (draggedBlock) {
        setCanvasBlocks([...canvasBlocks, { ...draggedBlock, id: uuidv4() }]);
      }
    }
  };

  const exportHTML = () => {
    const html = canvasBlocks
      .map((block) => {
        switch (block.type) {
          case "text": return `<div>${block.content}</div>`;
          case "image": return `<img src="${block.content || "https://via.placeholder.com/600x200"}" />`;
          case "button": return `<a href="#" style="background:#2563eb;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">${block.content || "Click Me"}</a>`;
          case "divider": return `<hr />`;
        }
      })
      .join("");

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email.html";
    a.click();
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Left sidebar - Available blocks */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Blocks</h2>
        {availableBlocks.map((block) => (
          <DraggableItem key={block.type} id={block.type} block={block} />
        ))}
      </div>

      {/* Middle - Canvas */}
      <div className="col-span-2">
        <DndContext onDragEnd={handleDragEnd}>
          <DroppableCanvas>
            {canvasBlocks.length === 0 ? (
              <p className="text-gray-400 text-center">Drag blocks here...</p>
            ) : (
              <div className="space-y-4">
                {canvasBlocks.map((block) => (
                  <BlockRenderer key={block.id} block={block} />
                ))}
              </div>
            )}
          </DroppableCanvas>
        </DndContext>
      </div>

      {/* Right sidebar - Controls */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Actions</h2>
        <button
          onClick={exportHTML}
          className="bg-green-500 text-white w-full py-2 rounded mb-2"
        >
          Export HTML
        </button>
      </div>
    </div>
  );
}
