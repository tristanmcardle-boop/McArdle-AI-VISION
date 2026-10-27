import { mockEvents } from '../data/mockData';

export default function PlaybackPage() {
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
