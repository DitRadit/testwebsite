'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

const links = [['/', 'Beranda'], ['/tugas', 'Tugas praktikum'], ['/anggota', 'Anggota'], ['/admin', 'Admin']];

export default function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => { api('/site-info').then(setInfo).catch(() => {}); }, []);
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-600">
          {info.logo_url && <img src={info.logo_url} alt="" className="h-8 w-8 rounded object-cover" />}
          {info.lab_name || 'Laboratorium'}
        </Link>
        <div className="flex gap-4 text-sm font-medium text-gray-600">
          {links.map(([href, label]) => <Link key={href} href={href} className="hover:text-gray-900">{label}</Link>)}
        </div>
      </nav>
    </header>
  );
}
