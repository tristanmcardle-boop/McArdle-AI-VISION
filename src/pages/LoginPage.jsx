import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCameras, mockEvents, mockAlarms, metrics } from '../data/mockData';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: 'Supervisor', password: 'admin123' });

  const handleSubmit = (event) => {
    event.preventDefault();

    const role = form.name.toLowerCase().includes('super') ? 'admin' : 'operator';
    localStorage.setItem('mcardle-user', JSON.stringify({ name: form.name, role }));
    navigate('/dashboard');
  };

  return (
    <div className="auth-screen">
      <div className="auth-panel">
        <div className="brand-block">
          <div className="brand-dot large" />
          <h1>McArdle AI VMS</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Operator
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Supervisor"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="admin123"
            />
          </label>

          <button type="submit" className="primary-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardPage() {
  const activeAlerts = mockAlarms.filter((alarm) => alarm.status !== 'Cleared').length;

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

function CamerasPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Site coverage</p>
          <h2>Camera fleet</h2>
        </div>
        <button className="primary-btn">Add camera</button>
      </section>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Brand</th>
                <th>Health</th>
                <th>Analytics</th>
              </tr>
            </thead>
            <tbody>
              {mockCameras.map((camera) => (
                <tr key={camera.id}>
                  <td>{camera.id}</td>
                  <td>{camera.name}</td>
                  <td>{camera.location}</td>
                  <td>{camera.brand}</td>
                  <td><span className="status online">Healthy</span></td>
                  <td>{camera.analytics.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
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

function PlaybackPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Evidence review</p>
          <h2>Playback</h2>
        </div>
      </section>

      <div className="panel playback-panel">
        <div className="playback-video" />
        <div className="timeline">
          <div className="timeline-track">
            <div className="timeline-progress" />
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Recent incidents</h3>
        <div className="incident-list">
          {mockEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="incident-item">
              <span>{event.time}</span>
              <strong>{event.camera}</strong>
              <span>{event.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlarmsPage() {
  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Response and verification</p>
          <h2>Alarm handling</h2>
        </div>
      </section>

      <div className="panel">
        {mockAlarms.map((alarm) => (
          <div key={alarm.id} className={`sop-card ${alarm.status.toLowerCase()}`}>
            <div className="sop-top">
              <div>
                <strong>#{alarm.id} {alarm.type}</strong>
                <p>{alarm.location}</p>
              </div>
              <span>{alarm.status}</span>
            </div>

            <ul>
              {alarm.sop.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPage() {
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

export {
  LoginPage,
  DashboardPage,
  CamerasPage,
  AnalyticsPage,
  PlaybackPage,
  AlarmsPage,
  AdminPage
};
