import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
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
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Supervisor"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
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
