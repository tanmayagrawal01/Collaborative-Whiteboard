"use client";

import { useState } from "react";
import { useAppState } from "../app/providers";

export default function ChatSidebar({ roomId }) {
  const { chatMessages, currentBoard, sendMessage } = useAppState();
  const [draft, setDraft] = useState("");
  const messages = chatMessages[roomId] || [];

  const handleSend = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage(roomId, draft.trim());
    setDraft("");
  };

  return (
    <aside className="w-full max-w-sm p-4 border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Live Chat</h2>
          <p className="text-sm text-slate-500">Discuss ideas while you draw.</p>
        </div>
      </div>

      <div className="space-y-3 h-[calc(100vh-230px)] overflow-y-auto pr-1 pb-2">
        {messages.length === 0 ? (
          <div className="text-sm text-slate-500">No messages yet. Start the conversation.</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">{message.author}</span>
                <span>{message.timestamp}</span>
              </div>
              <p className="text-sm leading-6 text-slate-700">{message.message}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="mt-4">
        <label htmlFor="chat-message" className="sr-only">Enter chat message</label>
        <textarea
          id="chat-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder={`Message the ${currentBoard?.title || "room"} team...`}
        />
        <button
          type="submit"
          className="mt-3 inline-flex w-full justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Send message
        </button>
      </form>
    </aside>
  );
}
