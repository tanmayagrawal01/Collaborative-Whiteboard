import Link from "next/link";

export default function BoardCard({ board }) {
  return (
    <article className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-xl shadow-slate-900/10 transition hover:border-blue-500">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{board.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{board.description}</p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
          {board.updatedAt}
        </span>
      </div>
      <Link href={`/board/${board.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
        Open room
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
