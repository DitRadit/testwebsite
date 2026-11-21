'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { ui, cx } from '@/components/ui';

export default function Tugas() {
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true); setError('');
      api('/posts?' + new URLSearchParams({ search, course, page })).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [search, course, page]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Tugas praktikum</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Cari tugas" className={ui.input} />
        <input value={course} onChange={(e) => { setCourse(e.target.value); setPage(1); }} placeholder="Mata kuliah (nama persis)" className={cx(ui.input, 'sm:max-w-xs')} />
      </div>
      {error && <p className={cx(ui.error, 'mt-6')}>{error}</p>}
      {loading && <p className="mt-6 text-sm text-gray-500">Memuat tugas...</p>}
      {!loading && !error && !data.items.length && <p className="mt-6 rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">Belum ada tugas yang cocok.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((p) => <PostCard key={p.id} p={p} />)}</div>
      <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
    </div>
  );
}
