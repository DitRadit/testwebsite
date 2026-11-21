'use client';
import ResourceManager from '@/components/ResourceManager';

export default function AdminAnggota() {
  return (
    <ResourceManager
      title="Anggota" noun="anggota" endpoint="/members"
      columns={[
        { key: 'name', label: 'Nama' },
        { key: 'position', label: 'Jabatan' },
        { key: 'division', label: 'Divisi' },
        { key: 'sort_order', label: 'Urutan' },
      ]}
      fields={[
        { name: 'name', label: 'Nama', type: 'text', required: true },
        { name: 'position', label: 'Jabatan', type: 'text', required: true },
        { name: 'division', label: 'Divisi', type: 'text' },
        { name: 'bio', label: 'Bio singkat', type: 'textarea' },
        { name: 'photo_url', label: 'Foto', type: 'image' },
        { name: 'instagram', label: 'Link Instagram', type: 'url' },
        { name: 'sort_order', label: 'Urutan tampil (angka kecil dulu)', type: 'number' },
      ]}
    />
  );
}
