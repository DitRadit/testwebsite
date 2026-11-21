'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, fmtDate } from '@/lib/api';
import { ui, cx } from '@/components/ui';

export default function TugasDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api(`/posts/${slug}`).then(setP).catch((e) => setError(e.message)); }, [slug]);

  return (
    <article className={cx(ui.card, 'mx-auto max-w-2xl p-6')}>
      <Link href="/tugas" className="text-sm font-medium text-brand-600 hover:text-brand-500">Kembali ke daftar tugas</Link>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {!p && !error && <p className="mt-4 text-sm text-gray-500">Memuat...</p>}
      {p && (
        <>
          {p.cover_image_url && <img src={p.cover_image_url} alt="" className="mt-4 max-h-72 w-full rounded-md object-cover" />}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className={ui.badge}>{p.course}</span>
            <span className="text-gray-500">Diposting {fmtDate(p.created_at)}</span>
            {p.deadline && <span className="font-medium text-amber-700">Deadline {fmtDate(p.deadline)}</span>}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{p.title}</h1>
          <p className="mt-4 whitespace-pre-line leading-7 text-gray-700">{p.content}</p>
        </>
      )}
    </article>
  );
}
