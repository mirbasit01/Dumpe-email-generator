// "use client";

// import { useEffect, useState } from "react";

// interface Message {
//   id: number;
//   content: string;
//   createdAt: string;
// }

// export default function MessagesPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch messages
//   const fetchMessages = async () => {
//     const res = await fetch("/api/messages");
//     const data = await res.json();
//     setMessages(data);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // Add a new message
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     setLoading(true);
//     try {
//       await fetch("/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: newMessage }),
//       });
//       setNewMessage("");
//       fetchMessages(); // refresh messages
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
//       <h1 className="text-2xl font-bold mb-4">📩 Messages</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border rounded-lg px-3 py-2"
//           placeholder="Write a message..."
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </form>

//       {/* Messages list */}
//       <ul className="space-y-3">
//         {messages.length > 0 ? (
//           messages.map((msg) => (
//             <li
//               key={msg.id}
//               className="p-3 border rounded-lg bg-gray-50 shadow-sm"
//             >
//               <p>{msg.content}</p>
//               <span className="text-xs text-gray-500">
//                 {new Date(msg.createdAt).toLocaleString()}
//               </span>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No messages yet.</p>
//         )}
//       </ul>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";

export default function MessagesList() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      {messages.length === 0 && <p>No messages yet.</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.subject}</strong> from {msg.from}
            <p>{msg.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
