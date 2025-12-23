'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith('/admin') && !pathname?.startsWith('/auth')) {
      trackVisitor();
    }
  }, [pathname]);

  const trackVisitor = async () => {
    try {
      const lastTrack = localStorage.getItem('visitor_tracked');
      const today = new Date().toDateString();

      if (lastTrack !== today) {
        await fetch('/api/admin/visitor', {
          method: 'POST'
        });
        localStorage.setItem('visitor_tracked', today);
      }
    } catch (error) {
      console.error('Visitor tracking failed:', error);
    }
  };

  return null;
}