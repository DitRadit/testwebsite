import { ui, cx } from './ui';

export default function MemberCard({ m }) {
  return (
    <div className={cx(ui.card, 'p-5 text-center')}>
      {m.photo_url
        ? <img src={m.photo_url} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
        : <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-2xl font-semibold text-brand-700">{m.name.slice(0, 1)}</div>}
      <p className="mt-3 font-semibold">{m.name}</p>
      <p className="text-sm text-brand-700">{m.position}</p>
      {m.division && <p className="text-xs text-gray-500">{m.division}</p>}
      {m.bio && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{m.bio}</p>}
      {m.instagram && <a href={m.instagram} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-500">Instagram</a>}
    </div>
  );
}
