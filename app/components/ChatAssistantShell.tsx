'use client';

import { usePathname } from 'next/navigation';
import { PortfolioChatbot } from './PortfolioChatbot';

/** FAB chat on all routes except the dedicated full-page `/chat` route. */
export function ChatAssistantShell() {
  const pathname = usePathname();
  if (pathname === '/chat') return null;
  return <PortfolioChatbot variant="fab" />;
}
