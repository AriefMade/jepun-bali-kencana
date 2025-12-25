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

      console.log('🔍 Visitor Tracker Debug:');
      console.log('  Last tracked:', lastTrack);
      console.log('  Today:', today);
      console.log('  Should track?', lastTrack !== today);

      if (lastTrack !== today) {
        console.log('  📤 Sending POST to /api/admin/visitor...');
        const response = await fetch('/api/admin/visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log('  ✅ Response:', data);
        
        if (data.success) {
          localStorage.setItem('visitor_tracked', today);
          console.log('  💾 LocalStorage updated');
        }
      } else {
        console.log('  ⏭️ Already tracked today, skipping');
      }
    } catch (error) {
      console.error('❌ Visitor tracking failed:', error);
    }
  };

  return null;
}