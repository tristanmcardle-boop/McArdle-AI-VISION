import { useMemo, useState } from 'react';
import { deviceTypes, mockDevices } from '../data/mockData';

function isValidIp(value) {
  return /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(value.trim());
}

export default function CamerasPage() {
  const [devices, setDevices] = useState(mockDevices);
  const [form, setForm] = useState({
    name: '',
    type: 'Camera',
    ip: '',
    model: '',
    username: '',
    password: '',
    notes: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const deviceSummary = useMemo(() => {
    const online = devices.filter((device) => device.status === 'Online').length;
    return { total: devices.length, online };
  }, [devices]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleAddDevice = () => {
    const trimmed = {
      name: form.name.trim() || 'New device',
      type: form.type,
      ip: form.ip.trim() || '192.168.1.10',
      model: form.model.trim() || 'Generic device',
      username: form.username.trim() || 'admin',
      password: form.password.trim() || 'password',
      notes: form.notes.trim() || 'Awaiting status check'
    };

    const nextDevice = {
      id: Date.now(),
      ...trimmed,
      status: isValidIp(trimmed.ip) ? 'Online' : 'Offline'
    };

    setDevices((current) => [nextDevice, ...current]);
    setForm({ name: '', type: 'Camera', ip: '', model: '', username: '', password: '', notes: '' });
    setStatusMessage(`Added ${trimmed.name} at ${trimmed.ip}`);
  };

  const handleTestConnection = (device) => {
    const reachable = isValidIp(device.ip) && !device.ip.startsWith('10.0.0.');
    setDevices((current) =>
      current.map((item) =>
        item.id === device.id
          ? { ...item, status: reachable ? 'Online' : 'Offline' }
          : item
      )
    );
    setStatusMessage(`${device.name} connection check: ${reachable ? 'reachable' : 'not reachable'}`);
  };

  return (
    <div className="content-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Network device management</p>
          <h2>Cameras and devices</h2>
        </div>
      </section>

      <div className="device-summary-grid">
        <div className="stat-card compact">
          <span className="stat-label">Total devices</span>
          <strong>{deviceSummary.total}</strong>
        </div>
        <div className="stat-card compact">
          <span className="stat-label">Reachable</span>
          <strong>{deviceSummary.online}</strong>
        </div>
      </div>

      <div className="panel add-device-panel">
        <h3>Add device by IP</h3>
        <div className="device-form-grid">
          <label>
            Device name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Main Gate Camera" />
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              {deviceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            IP address
            <input name="ip" value={form.ip} onChange={handleChange} placeholder="192.168.1.30" />
          </label>
          <label>
            Model
            <input name="model" value={form.model} onChange={handleChange} placeholder="Hikvision DS-2CD" />
          </label>
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} placeholder="admin" />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="password" />
          </label>
          <label className="full-width">
            Notes
            <input name="notes" value={form.notes} onChange={handleChange} placeholder="Access point, security zone, or site notes" />
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-btn" onClick={handleAddDevice}>Add device</button>
          {statusMessage && <span className="status-message">{statusMessage}</span>}
        </div>
      </div>

      <div className="panel device-table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>IP</th>
                <th>Model</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.ip}</td>
                  <td>{device.model}</td>
                  <td>
                    <span className={`status ${device.status === 'Online' ? 'online' : 'offline'}`}>
                      {device.status}
                    </span>
                  </td>
                  <td>{device.notes}</td>
                  <td><button className="secondary-btn" onClick={() => handleTestConnection(device)}>Test</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
