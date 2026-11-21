'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Field from '@/components/Field';
import { ui, cx } from '@/components/ui';

const fields = [
  { name: 'lab_name', label: 'Nama laboratorium', type: 'text', required: true },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'about', label: 'Tentang', type: 'textarea', rows: 6 },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'address', label: 'Alamat', type: 'text' },
  { name: 'instagram', label: 'Link Instagram', type: 'url' },
  { name: 'logo_url', label: 'Logo', type: 'image' },
  { name: 'hero_image_url', label: 'Gambar utama', type: 'image' },
];

export default function AdminInfo() {
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api('/site-info').then((d) => setForm(Object.fromEntries(fields.map((f) => [f.name, d[f.name] ?? ''])))).catch((e) => setError(e.message));
  }, []);

  async function save() {
    setSaving(true); setError(''); setMessage('');
    try { await api('/site-info', { method: 'PUT', body: form }); setMessage('Info website disimpan'); }
    catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  if (!form) return error ? <p className={ui.error}>{error}</p> : <p className="text-sm text-gray-500">Memuat...</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Info website</h1>
      <div className={cx(ui.card, 'mt-6 space-y-4 p-6')}>
        {fields.map((f) => <Field key={f.name} f={f} value={form[f.name]} onChange={(k, v) => setForm({ ...form, [k]: v })} />)}
        {message && <p className={ui.success}>{message}</p>}
        {error && <p className={ui.error}>{error}</p>}
        <button onClick={save} disabled={saving} className={cx(ui.btn, ui.primary)}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </div>
  );
}
