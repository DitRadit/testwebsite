const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function api(path, { body, ...opts } = {}) {
  const res = await fetch(API + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan');
  return data;
}

// Upload gambar ke Cloudinary lewat backend; mengembalikan URL gambar.
export async function uploadImage(file, folder = 'aslab') {
  const fd = new FormData();
  fd.append('folder', folder);
  fd.append('file', file);
  const res = await fetch(API + '/uploads', { method: 'POST', credentials: 'include', body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Upload gagal');
  return data.url;
}

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '');
