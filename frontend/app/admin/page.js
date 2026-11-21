import Link from 'next/link';
import { ui, cx } from '@/components/ui';

const cards = [
  ['/admin/tugas', 'Tugas praktikum', 'Tambah, edit, dan terbitkan tugas.'],
  ['/admin/anggota', 'Anggota', 'Kelola profil anggota aslab.'],
  ['/admin/info', 'Info website', 'Ubah nama, tentang, kontak, logo, dan gambar utama.'],
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map(([href, title, desc]) => (
          <Link key={href} href={href} className={cx(ui.card, 'p-5 transition-shadow hover:shadow-md')}>
            <p className="font-semibold">{title}</p>
            <p className="mt-1 text-sm text-gray-600">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
