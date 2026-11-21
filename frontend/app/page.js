'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import PostCard from '@/components/PostCard';
import MemberCard from '@/components/MemberCard';
import { ui, cx } from '@/components/ui';

export default function Home() {
  const [info, setInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api('/site-info'), api('/posts?limit=3'), api('/members?limit=4')])
      .then(([i, p, m]) => { setInfo(i); setPosts(p.items); setMembers(m.items); })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="space-y-12">
      {error && <p className={ui.error}>{error}</p>}
      <section className={cx(ui.card, 'overflow-hidden md:flex')}>
        <div className="p-8 md:w-1/2">
          <h1 className="text-3xl font-bold tracking-tight">{info.lab_name || 'Laboratorium'}</h1>
          {info.tagline && <p className="mt-2 text-lg text-brand-700">{info.tagline}</p>}
          {info.about && <p className="mt-4 whitespace-pre-line text-gray-600">{info.about}</p>}
          <Link href="/tugas" className={cx(ui.btn, ui.primary, 'mt-6 inline-block')}>Lihat tugas praktikum</Link>
        </div>
        {info.hero_image_url && <img src={info.hero_image_url} alt="" className="h-56 w-full object-cover md:h-auto md:w-1/2" />}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tugas terbaru</h2>
          <Link href="/tugas" className="text-sm font-medium text-brand-600 hover:text-brand-500">Semua tugas</Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.id} p={p} />)}
          {!posts.length && !error && <p className="text-sm text-gray-500">Belum ada tugas yang diterbitkan.</p>}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Anggota</h2>
          <Link href="/anggota" className="text-sm font-medium text-brand-600 hover:text-brand-500">Semua anggota</Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => <MemberCard key={m.id} m={m} />)}
        </div>
      </section>

      {(info.email || info.address || info.instagram) && (
        <section className={cx(ui.card, 'p-6 text-sm text-gray-600')}>
          <h2 className="text-xl font-semibold text-gray-900">Kontak</h2>
          <ul className="mt-3 space-y-1">
            {info.email && <li>Email: {info.email}</li>}
            {info.address && <li>Alamat: {info.address}</li>}
            {info.instagram && <li><a href={info.instagram} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:text-brand-500">Instagram</a></li>}
          </ul>
        </section>
      )}
    </div>
  );
}
