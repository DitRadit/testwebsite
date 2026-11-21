'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ui, cx } from '@/components/ui';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true); setError('');
    try { await api('/auth/login', { method: 'POST', body: { email, password } }); router.push('/admin'); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className={cx(ui.card, 'mx-auto max-w-sm p-6')}>
      <h1 className="text-xl font-bold">Masuk sebagai admin</h1>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-medium">Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={cx(ui.input, 'mt-2')} />
        </label>
        <label className="block text-sm font-medium">Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} className={cx(ui.input, 'mt-2')} />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button onClick={submit} disabled={busy} className={cx(ui.btn, ui.primary, 'w-full')}>{busy ? 'Memproses...' : 'Masuk'}</button>
      </div>
    </div>
  );
}
