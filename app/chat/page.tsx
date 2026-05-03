import type { Metadata } from 'next';
import { PortfolioChatbot } from '../components/PortfolioChatbot';

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat with the studio about your app or web project.',
};

export default function ChatPage() {
  return (
    <div
      className="flex min-h-dvh flex-col text-white"
      style={{ background: 'var(--theme-background)' }}
    >
      <PortfolioChatbot variant="page" />
    </div>
  );
}
