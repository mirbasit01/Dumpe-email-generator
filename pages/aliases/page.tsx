"use client";

import { useState, useEffect } from "react";

type Alias = {
  id: number;
  alias: string;
  userEmail: string;
  createdAt: string;
};

export default function AliasesPage() {
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [alias, setAlias] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Fetch aliases
  useEffect(() => {
    fetch("/api/aliases")
      .then((res) => res.json())
      .then((data) => setAliases(data))
      .catch((err) => console.error("Error fetching aliases:", err));
  }, []);

  // Add alias
  const addAlias = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/aliases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias, userEmail }),
      });

      if (res.ok) {
        const newAlias = await res.json();
        setAliases((prev) => [...prev, newAlias]);
        setAlias("");
        setUserEmail("");
      } else {
        console.error("Failed to add alias");
      }
    } catch (error) {
      console.error("Error adding alias:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aliases</h1>

      <form onSubmit={addAlias} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="email"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Alias
        </button>
      </form>

      <div className="space-y-2">
        {aliases.map((a) => (
          <div key={a.id} className="border p-2 rounded">
            <p className="font-semibold">{a.alias}</p>
            <p>{a.userEmail}</p>
            <span className="text-xs text-gray-500">
              {new Date(a.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
