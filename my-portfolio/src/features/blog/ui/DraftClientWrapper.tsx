'use client';

import dynamic from 'next/dynamic';

const Draft = dynamic(() => import('./Draft'), {
  ssr: false,
});

export default function DraftClientWrapper() {
  return <Draft />;
}
