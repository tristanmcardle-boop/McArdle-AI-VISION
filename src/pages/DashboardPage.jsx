import { mockAlarms, mockCameras, mockEvents, metrics } from '../data/mockData';

export default function DashboardPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Operations desk</p>
          <h2>Monitoring overview</h2>
        </div>
        <button className="primary-btn">Raise manual check</button>
      </section>

      <div className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <span className="stat-label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.trend}</small>
          </div>
        ))}
      </div>

      <div className="two-col-layout">
        <div className="panel">
          <h3>Live camera overview</h3>
          <div className="camera-grid">
            {mockCameras.slice(0, 4).map((camera) => (
              <div key={camera.id} className="mini-feed">
                <div className="feed-header">
                  <span>{camera.name}</span>
                  <span className="status online">Online</span>
                </div>
                <div className="feed-sim" />
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Alarm queue</h3>
          <div className="alarm-list">
            {mockAlarms.slice(0, 4).map((alarm) => (
              <div key={alarm.id} className={`alarm-item ${alarm.status.toLowerCase()}`}>
                <div>
                  <strong>#{alarm.id}</strong>
                  <p>{alarm.type}</p>
                </div>
                <span>{alarm.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Recent events</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Camera</th>
                <th>Event</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.slice(0, 8).map((event) => (
                <tr key={event.id}>
                  <td>{event.time}</td>
                  <td>{event.camera}</td>
                  <td>{event.event}</td>
                  <td>{event.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
