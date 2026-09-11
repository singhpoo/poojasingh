export default function StatusHeader() {
  return (
    <div className="res-bar rise d1" role="status" aria-label="resource status">
      <span className="res-name">
        <span className="blink" aria-hidden />
        pooja-singh
      </span>
      <span className="badge">resource</span>
      <span>
        status: <span className="ok">● healthy</span>
      </span>
      <span>region: west us 2 (seattle)</span>
      <span>tier: senior swe</span>
      <span>uptime: 8+ yrs in production</span>
    </div>
  );
}
