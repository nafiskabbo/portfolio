'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const PortfolioChatbot = dynamic(
  () => import('./PortfolioChatbot').then((m) => m.PortfolioChatbot),
  { ssr: false, loading: () => null }
);

/** FAB chat on all routes except the dedicated full-page `/chat` route. */
export function ChatAssistantShell() {
  const pathname = usePathname();
  if (pathname === '/chat') return null;
  return <PortfolioChatbot variant="fab" />;
}
