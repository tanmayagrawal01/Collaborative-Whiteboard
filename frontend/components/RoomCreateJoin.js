"use client";

import { useState } from "react";
import { useAppState } from "../app/providers";

export default function RoomCreateJoin() {
  const { createBoard, joinBoard, boards } = useAppState();
  const [roomName, setRoomName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [status, setStatus] = useState(null);

  const handleCreate = async (event) => {
    event.preventDefault();
    setStatus(null);
    const result = await createBoard(roomName.trim());
    if (result.error) {
      setStatus({ type: "error", message: result.error });
      return;
    }
    setStatus({ type: "success", message: `Created board ${result.board.title}` });
    setRoomName("");
  };

  const handleJoin = async (event) => {
    event.preventDefault();
    setStatus(null);
    const result = await joinBoard(joinCode.trim());
    if (result.error) {
      setStatus({ type: "error", message: result.error });
      return;
    }
    setStatus({ type: "success", message: "Joined board successfully." });
    setJoinCode("");
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-xl shadow-slate-900/20">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Create or Join a Room</h2>
        <p className="text-sm text-slate-400">Start a new session or enter an existing board code.</p>
      </div>

      {status ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "error" ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"}`}>
          {status.message}
        </div>
      ) : null}

      <form onSubmit={handleCreate} className="space-y-4">
        <label className="block text-sm font-medium text-slate-300">New Room Name</label>
        <input
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          placeholder="Enter board name"
          className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <button className="inline-flex w-full justify-center rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Create new room
        </button>
      </form>

      <div className="border-t border-slate-700 pt-6">
        <form onSubmit={handleJoin} className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Join with board code</label>
          <input
            value={joinCode}
            onChange={(event) => setJoinCode(event.target.value)}
            placeholder="Paste board code"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <button className="inline-flex w-full justify-center rounded-3xl border border-blue-600 bg-transparent px-4 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-600/10">
            Join existing room
          </button>
        </form>
      </div>

      <div className="rounded-3xl bg-slate-900 p-4 text-sm text-slate-400">
        <p className="font-medium text-slate-100">Room codes</p>
        <p className="mt-2">Use one of these sample IDs if you want to join quickly:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {boards.slice(0, 3).map((board) => (
            <span key={board.id} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {board.id}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
