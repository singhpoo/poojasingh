import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <div className="nf">
        <div className="code">[error] 404 · trace_id=not-found</div>
        <h1>Trace not found.</h1>
        <p>
          The testing agent checked every Azure UI it could reach — this page
          genuinely doesn&apos;t exist. Even the logs have nothing. Suspiciously
          clean, actually.
        </p>
        <Link className="btn primary" href="/" style={{ marginTop: 18 }}>
          ← back to pooja.monitor
        </Link>
        <div className="kbd-hint">
          or try: requests | where page == &quot;this one&quot; → 0 rows :(
        </div>
      </div>
    </main>
  );
}
