"use client";

import Link from "next/link";
import { useAppState } from "../providers";
import BoardCard from "../../components/BoardCard";
import RoomCreateJoin from "../../components/RoomCreateJoin";

export default function Dashboard() {
  const { user, boards, logout } = useAppState();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-slate-800 bg-slate-900/95 p-10 text-center shadow-2xl shadow-slate-950/40">
          <h1 className="text-4xl font-semibold">You are not signed in yet</h1>
          <p className="mt-4 text-slate-400">Please log in or create an account to access your personal boards.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/login" className="rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Login
            </Link>
            <Link href="/signup" className="rounded-3xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-blue-500">
              Signup
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[36px] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Welcome back</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">{user.name}'s Dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Manage your boards, join rooms, and keep your team conversation flowing from one place.</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-slate-300">
            <span className="font-medium text-white">Signed in as {user.email}</span>
            <button
              onClick={logout}
              className="rounded-3xl bg-slate-800 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[0.7fr_0.3fr]">
          <div className="space-y-6">
            <div className="rounded-[36px] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Recent boards</h2>
                  <p className="mt-2 text-sm text-slate-400">Open a board or continue where you left off.</p>
                </div>
                <Link href="/login" className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Refresh list
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {boards.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-700 p-8 text-slate-400">No boards yet, create one to get started.</div>
                ) : (
                  boards.map((board) => <BoardCard key={board.id} board={board} />)
                )}
              </div>
            </div>

            <div className="rounded-[36px] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold text-white">Create & join rooms</h2>
              <p className="mt-2 text-sm text-slate-400">A shared room code makes it easy for your team to join the same whiteboard.</p>
              <div className="mt-6">
                <RoomCreateJoin />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[36px] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">How to start</h3>
              <ol className="mt-5 space-y-3 text-sm text-slate-400">
                <li className="rounded-3xl bg-slate-950 p-4">1. Create a room or enter an existing board code.</li>
                <li className="rounded-3xl bg-slate-950 p-4">2. Click a board card to open the whiteboard and chat.</li>
                <li className="rounded-3xl bg-slate-950 p-4">3. Share the board code with your team.</li>
              </ol>
            </div>
            <div className="rounded-[36px] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">Need a board code?</h3>
              <p className="mt-3 text-sm text-slate-400">Copy any board ID from the sample list after creating a room, then share it with teammates.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
