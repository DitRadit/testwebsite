import { ui, cx } from './ui';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} className={cx(ui.btn, ui.ghost)}>Sebelumnya</button>
      <span className="text-gray-600">Halaman {page} dari {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className={cx(ui.btn, ui.ghost)}>Berikutnya</button>
    </div>
  );
}
