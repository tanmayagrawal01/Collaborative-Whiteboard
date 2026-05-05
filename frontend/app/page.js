"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchHealthCheck } from "../lib/api";

export default function Home() {
  const [healthStatus, setHealthStatus] = useState("Checking...");

  useEffect(() => {
    fetchHealthCheck()
      .then((health) => {
        setHealthStatus(health.status === "UP" ? "Backend is UP ✅" : "Backend is DOWN ❌");
      })
      .catch(() => {
        setHealthStatus("Backend is Unreachable ⚠️");
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 ring-1 ring-blue-200/20">
              UI/UX and navigation ready
            </div>
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white">Collaborative Whiteboard for teams</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Design, share, and discuss ideas in a modern workspace with easy board creation, joining, and real-time chat.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/login" className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Login
              </Link>
              <Link href="/signup" className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:text-white">
                Sign up
              </Link>
            </div>
          </div>

          <div className="rounded-[40px] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
            <div className="rounded-3xl bg-slate-950 p-6">
              <h2 className="text-xl font-semibold text-white">Backend status</h2>
              <p className="mt-4 text-slate-300">{healthStatus}</p>
              <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
                <p>Navigate to your personal dashboard, create new boards, or join with a room code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
