import { mockCameras } from '../data/mockData';

export default function CamerasPage() {
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
