"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppState } from "../../providers";
import ChatSidebar from "../../../components/ChatSidebar";

export default function BoardRoom({ params }) {
  const { id } = params;
  const { boards, currentBoard, joinBoard, user } = useAppState();

  useEffect(() => {
    joinBoard(id);
  }, [id, joinBoard]);

  const board = boards.find((boardItem) => boardItem.id === id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Room</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{board?.title || `Board ${id}`}</h1>
            <p className="mt-2 text-sm text-slate-400">{board?.description || "Collaborate in real time with your team."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span>{user ? `Signed in as ${user.name}` : "Guest mode"}</span>
            <Link href="/dashboard" className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-blue-500 hover:text-white">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.4fr_0.6fr] lg:px-10">
        <section className="rounded-[36px] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Canvas space</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Interactive whiteboard</h2>
            </div>
            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">Room code: {id}</span>
          </div>

          <div className="min-h-[560px] rounded-[32px] border border-dashed border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-slate-400 shadow-inner shadow-slate-950/40">
            <p className="mb-4 text-lg font-medium text-slate-200">Whiteboard canvas placeholder</p>
            <p className="max-w-2xl leading-7 text-slate-400">
              Use this area for drawing, notes, and collaborative sketches. The chat panel on the right keeps your team conversation visible while you work.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Tip</p>
                <p className="mt-3 text-sm text-slate-300">Invite teammates by sharing the room code.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</p>
                <p className="mt-3 text-sm text-slate-300">{board?.updatedAt ? `Last active ${board.updatedAt}` : "Ready to collaborate"}</p>
              </div>
            </div>
          </div>
        </section>

        <ChatSidebar roomId={id} />
      </main>
    </div>
  );
}
