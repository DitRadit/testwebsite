// Satu tempat untuk gaya bersama. Ubah di sini untuk mengubah tampilan di semua halaman.
export const cx = (...c) => c.filter(Boolean).join(' ');
export const ui = {
  input: 'block w-full rounded-md border-0 px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 focus:outline-none',
  btn: 'rounded-md px-3 py-2 text-sm font-semibold shadow-sm disabled:opacity-50',
  primary: 'bg-brand-600 text-white hover:bg-brand-500',
  ghost: 'bg-white ring-1 ring-gray-300 hover:bg-gray-50',
  card: 'rounded-lg bg-white shadow',
  badge: 'rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700',
  error: 'rounded-md bg-red-50 p-3 text-sm text-red-700',
  success: 'rounded-md bg-green-50 p-3 text-sm text-green-700',
};
