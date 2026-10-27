export default function AnalyticsPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Behavioural intelligence</p>
          <h2>Site analytics</h2>
        </div>
      </section>

      <div className="analytics-grid">
        <div className="panel">
          <h3>Movement summary</h3>
          <div className="chart-bars">
            {[60, 72, 58, 88, 76, 92].map((value, index) => (
              <div key={index} className="bar-wrap">
                <span className="bar" style={{ height: `${value}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Detection mix</h3>
          <div className="legend-list">
            <div><span className="legend-dot red" /> Person</div>
            <div><span className="legend-dot blue" /> Vehicle</div>
            <div><span className="legend-dot amber" /> Speed</div>
            <div><span className="legend-dot green" /> Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}
