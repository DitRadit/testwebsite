import Link from 'next/link';
import { fmtDate } from '@/lib/api';
import { ui, cx } from './ui';

export default function PostCard({ p }) {
  return (
    <Link href={`/tugas/${p.slug}`} className={cx(ui.card, 'flex flex-col overflow-hidden transition-shadow hover:shadow-md')}>
      {p.cover_image_url && <img src={p.cover_image_url} alt="" className="h-36 w-full object-cover" />}
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={ui.badge}>{p.course}</span>
          {p.is_pinned && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Disematkan</span>}
        </div>
        <p className="mt-2 font-semibold">{p.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.content}</p>
        {p.deadline && <p className="mt-3 text-xs text-gray-500">Deadline {fmtDate(p.deadline)}</p>}
      </div>
    </Link>
  );
}
