'use client';
import { useState } from 'react';
import { uploadImage } from '@/lib/api';

// Pemakaian di form mana pun:  <ImageUpload label="Poster" value={form.poster_url} onChange={(url) => setForm({ ...form, poster_url: url })} />
export default function ImageUpload({ value, onChange, label = 'Gambar', folder = 'aslab' }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function pick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError('');
    try { onChange(await uploadImage(file, folder)); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); e.target.value = ''; }
  }

  return (
    <div className="text-sm font-medium">
      {label}
      {value && <img src={value} alt="Pratinjau" className="mt-2 h-32 rounded-md object-cover ring-1 ring-gray-200" />}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={pick} disabled={busy} className="text-sm font-normal" />
        {busy && <span className="font-normal text-gray-500">Mengunggah...</span>}
        {value && <button type="button" onClick={() => onChange('')} className="font-normal text-red-600 hover:text-red-500">Hapus gambar</button>}
      </div>
      {error && <p className="mt-1 font-normal text-red-700">{error}</p>}
    </div>
  );
}
