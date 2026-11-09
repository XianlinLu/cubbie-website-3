import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const sans = localFont({ src: [
  { path: '../../public/fonts/brand-sans.woff2', weight: '400' },
  { path: '../../public/fonts/brand-sans-medium.woff2', weight: '500' },
  { path: '../../public/fonts/brand-sans-bold.woff2', weight: '700' },
], variable: '--font-sans', display: 'swap' });
const display = localFont({src: '../../public/fonts/brand-display.woff2', variable: '--font-display', display: 'swap'});
export const metadata: Metadata = {
  title: 'Cubbie — Your schoolwork, connected',
  description: 'Student Planner Powered by Your AI School Assistant. Bring assignments, course materials, school email, your calendar and reminders into one conversation.',
  metadataBase: new URL('https://xianlinlu.github.io/cubbie-website-3/'),
  openGraph: { title: 'Cubbie — Your schoolwork, connected', description: 'One student planner for the whole school week.', images: ['/cubbie-website-3/images/cubbie-crew.png'] },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html>;
}
