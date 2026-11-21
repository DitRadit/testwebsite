'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import MemberCard from '@/components/MemberCard';
import { ui, cx } from '@/components/ui';

export default function Anggota() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const t = setTimeout(() => api('/members?' + new URLSearchParams({ search, limit: 100 })).then((d) => setItems(d.items)).catch((e) => setError(e.message)), 250);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Anggota aslab</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama, jabatan, atau divisi" className={cx(ui.input, 'mt-4 sm:max-w-xs')} />
      {error && <p className={cx(ui.error, 'mt-6')}>{error}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((m) => <MemberCard key={m.id} m={m} />)}</div>
      {!items.length && !error && <p className="mt-6 text-sm text-gray-500">Belum ada anggota yang cocok.</p>}
    </div>
  );
}
