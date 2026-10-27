import { mockAlarms } from '../data/mockData';

export default function AlarmsPage() {
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
