'use client';

import { useEffect, useState } from 'react';

export default function AdminInviteAcceptPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = new URLSearchParams(window.location.search).get('token') || '';
    setToken(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setMessage('');
          const res = await fetch('/api/admin/invites/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
          });
          const data = await res.json();
          setLoading(false);
          if (!res.ok) {
            setMessage(data.error || 'Failed to accept invite.');
            return;
          }
          setMessage('Invite accepted. You can now log in at /admin.');
        }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Accept Admin Invite</h1>
        <p className="text-sm text-gray-600">Set your password to activate your admin account.</p>
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Invite token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} className="w-full bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 disabled:opacity-50">
          {loading ? 'Submitting...' : 'Accept Invite'}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
