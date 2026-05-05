"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../providers";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const result = await login({ email: email.trim(), password });
    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12 md:px-12">
      <div className="mx-auto max-w-2xl rounded-[36px] border border-slate-800 bg-slate-900/95 px-8 py-10 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Welcome back</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Log in to your whiteboard workspace</h1>
          <p className="mt-3 text-slate-400">Access your boards, join rooms, and collaborate in real time.</p>
        </div>

        {error ? <div className="mb-6 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-slate-300">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <label className="block text-sm font-medium text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <button className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Continue to Dashboard
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Need an account?{' '}
          <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300">
            Sign up here
          </Link>
        </p>
      </div>
    </main>
  );
}
