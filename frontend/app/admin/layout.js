'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { cx } from '@/components/ui';

// Tambah menu admin baru cukup dengan menambah satu baris di sini.
const menu = [['/admin', 'Dashboard'], ['/admin/tugas', 'Tugas praktikum'], ['/admin/anggota', 'Anggota'], ['/admin/info', 'Info website']];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const path = usePathname();
  const [me, setMe] = useState(null);
  useEffect(() => { api('/auth/me').then(setMe).catch(() => router.replace('/login')); }, [router]);

  if (!me) return <p className="text-sm text-gray-500">Memeriksa sesi...</p>;
  return (
    <div className="gap-8 md:flex">
      <aside className="mb-6 md:mb-0 md:w-48 md:flex-none">
        <p className="mb-3 text-xs text-gray-500">Masuk sebagai {me.email} ({me.role})</p>
        <nav className="flex flex-wrap gap-1 md:flex-col">
          {menu.map(([href, label]) => (
            <Link key={href} href={href} className={cx('rounded-md px-3 py-2 text-sm font-medium', path === href ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-100')}>{label}</Link>
          ))}
          <button onClick={async () => { await api('/auth/logout', { method: 'POST' }); router.push('/login'); }} className="rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">Keluar</button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
