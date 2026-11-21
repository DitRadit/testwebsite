'use client';
import ResourceManager from '@/components/ResourceManager';
import { fmtDate } from '@/lib/api';

export default function AdminTugas() {
  return (
    <ResourceManager
      title="Tugas praktikum" noun="tugas" endpoint="/posts"
      columns={[
        { key: 'title', label: 'Judul' },
        { key: 'course', label: 'Mata kuliah' },
        { key: 'status', label: 'Status', render: (r) => (r.status === 'published' ? 'Terbit' : 'Draft') },
        { key: 'deadline', label: 'Deadline', render: (r) => fmtDate(r.deadline) },
      ]}
      fields={[
        { name: 'title', label: 'Judul', type: 'text', required: true },
        { name: 'course', label: 'Mata kuliah', type: 'text', required: true },
        { name: 'content', label: 'Deskripsi tugas', type: 'textarea', required: true, rows: 8 },
        { name: 'deadline', label: 'Deadline', type: 'date' },
        { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Terbit' }] },
        { name: 'is_pinned', label: 'Sematkan di atas daftar', type: 'checkbox' },
        { name: 'cover_image_url', label: 'Gambar sampul (opsional)', type: 'image' },
      ]}
    />
  );
}
