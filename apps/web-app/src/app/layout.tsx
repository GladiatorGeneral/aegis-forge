import { Inter } from 'next/font/google';
import { TRPCProvider } from '../lib/trpc-client';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PHNXForge - Mathematics Education Platform',
  description: 'Advanced mathematics education with chain-of-thought reasoning and Common Core alignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
