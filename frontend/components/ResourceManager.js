'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Field from './Field';
import Pagination from './Pagination';
import { ui, cx } from './ui';

// Halaman admin CRUD generik. Untuk fitur baru cukup beri: endpoint, fields (form), columns (tabel).
export default function ResourceManager({ title, noun, endpoint, fields, columns }) {
  const blank = Object.fromEntries(fields.map((f) => [f.name, f.type === 'checkbox' ? false : f.type === 'select' ? f.options[0].value : '']));
  const [data, setData] = useState({ items: [], totalPages: 1 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null); // null = form tertutup
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api(`${endpoint}/manage?` + new URLSearchParams({ search, page })).then(setData).catch((e) => setError(e.message));
  }, [endpoint, search, page]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  function openForm(row) {
    setError(''); setMessage(''); setEditId(row ? row.id : null);
    setForm(row ? Object.fromEntries(fields.map((f) => [f.name, row[f.name] ?? blank[f.name]])) : blank);
  }

  async function save() {
    setSaving(true); setError('');
    try {
      await api(editId ? `${endpoint}/${editId}` : endpoint, { method: editId ? 'PUT' : 'POST', body: form });
      setForm(null); setMessage(editId ? `${title} diperbarui` : `${title} dibuat`); load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(row) {
    if (!confirm(`Hapus ${noun} "${row[columns[0].key]}"?`)) return;
    setError('');
    try { await api(`${endpoint}/${row.id}`, { method: 'DELETE' }); setMessage(`${title} dihapus`); load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <button onClick={() => openForm(null)} className={cx(ui.btn, ui.primary)}>Tambah {noun}</button>
      </div>
      <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Cari..." className={cx(ui.input, 'mt-4 sm:max-w-xs')} />
      {message && <p className={cx(ui.success, 'mt-4')}>{message}</p>}
      {error && !form && <p className={cx(ui.error, 'mt-4')}>{error}</p>}

      {form && (
        <div className={cx(ui.card, 'mt-6 p-6')}>
          <h2 className="text-lg font-semibold">{editId ? `Edit ${noun}` : `${noun[0].toUpperCase() + noun.slice(1)} baru`}</h2>
          <div className="mt-4 space-y-4">
            {fields.map((f) => <Field key={f.name} f={f} value={form[f.name]} onChange={(k, v) => setForm({ ...form, [k]: v })} />)}
            {error && <p className="text-sm text-red-700">{error}</p>}
            <div className="flex gap-2">
              <button onClick={save} disabled={saving} className={cx(ui.btn, ui.primary)}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
              <button onClick={() => setForm(null)} className={cx(ui.btn, ui.ghost)}>Batal</button>
            </div>
          </div>
        </div>
      )}

      <div className={cx(ui.card, 'mt-6 overflow-x-auto')}>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left font-semibold">
            <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3">{c.label}</th>)}<th className="px-4 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.items.map((row) => (
              <tr key={row.id}>
                {columns.map((c, i) => <td key={c.key} className={cx('px-4 py-3', i === 0 && 'font-medium')}>{c.render ? c.render(row) : row[c.key]}</td>)}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button onClick={() => openForm(row)} className="font-medium text-brand-600 hover:text-brand-500">Edit</button>
                  <button onClick={() => remove(row)} className="ml-4 font-medium text-red-600 hover:text-red-500">Hapus</button>
                </td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">Belum ada data. Klik "Tambah {noun}" untuk membuat yang pertama.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
    </div>
  );
}
