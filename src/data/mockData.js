export default function AdminPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Configuration</p>
          <h2>System administration</h2>
        </div>
      </section>

      <div className="admin-grid">
        <div className="panel">
          <h3>Site policy</h3>
          <ul className="settings-list">
            <li>Watch-list plate checks enabled</li>
            <li>Speed threshold set to 65 km/h</li>
            <li>Evidence retention configured for 90 days</li>
          </ul>
        </div>

        <div className="panel">
          <h3>Operator access</h3>
          <ul className="settings-list">
            <li>Supervisor — full access</li>
            <li>Operator 1 — alarm handling</li>
            <li>Operator 2 — camera checks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
