import './globals.css';
import Header from '@/components/Header';

export const metadata = { title: 'Website Aslab', description: 'Informasi, tugas praktikum, dan anggota asisten laboratorium' };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
