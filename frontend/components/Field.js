'use client';
import ImageUpload from './ImageUpload';
import { ui, cx } from './ui';

// Satu field form berdasarkan definisi { name, label, type, required, options, rows }
// type: text | textarea | number | date | url | select | checkbox | image
export default function Field({ f, value, onChange }) {
  const set = (v) => onChange(f.name, v);
  if (f.type === 'image') return <ImageUpload label={f.label} value={value} onChange={set} />;
  if (f.type === 'checkbox')
    return (
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-600" />
        {f.label}
      </label>
    );
  const common = { value: value ?? '', onChange: (e) => set(e.target.value), className: cx(ui.input, 'mt-2') };
  return (
    <label className="block text-sm font-medium">
      {f.label}{f.required && ' *'}
      {f.type === 'textarea' ? <textarea rows={f.rows || 5} {...common} />
        : f.type === 'select' ? <select {...common}>{f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        : <input type={f.type === 'number' || f.type === 'date' || f.type === 'url' ? f.type : 'text'} {...common} />}
    </label>
  );
}
