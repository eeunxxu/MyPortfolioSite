import './globals.css';
import Providers from './providers';
import TopBar from '@/shared/ui/TopBar';
import { JetBrains_Mono } from 'next/font/google';

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={jetBrains.variable}>
      <body className="font-jetbrains">
        <Providers>
          <header>
            <TopBar />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
