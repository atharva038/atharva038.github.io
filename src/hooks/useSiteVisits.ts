import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface VisitStats {
  viewerVisits: number;
  ownerVisits: number;
  isOwner: boolean;
  isLoading: boolean;
  error: string | null;
}

const getOrCreateVisitorId = (): string => {
  let id = localStorage.getItem('portfolio_visitor_id');
  if (!id) {
    // Generate simple UUID-like string
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    localStorage.setItem('portfolio_visitor_id', id);
  }
  return id;
};

export function useSiteVisits() {
  const [stats, setStats] = useState<VisitStats>({
    viewerVisits: 0,
    ownerVisits: 0,
    isOwner: false,
    isLoading: true,
    error: null,
  });

  // Function to check and update roles and fetch stats
  const fetchStats = useCallback(async (currentIsOwner: boolean) => {
    try {
      const [viewerRes, ownerRes] = await Promise.all([
        supabase
          .from('portfolio_visits')
          .select('*', { count: 'exact', head: true })
          .eq('is_owner', false),
        supabase
          .from('portfolio_visits')
          .select('*', { count: 'exact', head: true })
          .eq('is_owner', true),
      ]);

      if (viewerRes.error) throw viewerRes.error;
      if (ownerRes.error) throw ownerRes.error;

      setStats((prev) => ({
        ...prev,
        viewerVisits: viewerRes.count || 0,
        ownerVisits: ownerRes.count || 0,
        isOwner: currentIsOwner,
        isLoading: false,
      }));
    } catch (err: any) {
      console.error('Error fetching site visits:', err);
      setStats((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Failed to fetch visitor statistics',
      }));
    }
  }, []);

  useEffect(() => {
    const handleVisits = async () => {
      // 1. Process URL search parameters to toggle owner mode
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode');
      
      if (modeParam === 'owner') {
        localStorage.setItem('portfolio_role', 'owner');
        // Clean URL parameter
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      } else if (modeParam === 'viewer') {
        localStorage.removeItem('portfolio_role');
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      }

      const isOwner =
        localStorage.getItem('portfolio_role') === 'owner' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      const visitorId = getOrCreateVisitorId();
      const sessionRecorded = sessionStorage.getItem('portfolio_session_recorded');

      // 2. Record visit if not already done in this session
      if (!sessionRecorded) {
        try {
          const { error } = await supabase.from('portfolio_visits').insert({
            visitor_id: visitorId,
            is_owner: isOwner,
            page_path: window.location.pathname,
            user_agent: navigator.userAgent,
          });

          if (!error) {
            sessionStorage.setItem('portfolio_session_recorded', 'true');
          } else {
            console.error('Failed to log visit:', error);
          }
        } catch (err) {
          console.error('Error logging visit:', err);
        }
      }

      // 3. Fetch initial stats
      await fetchStats(isOwner);
    };

    handleVisits();
  }, [fetchStats]);

  return {
    ...stats,
    refetch: () => fetchStats(stats.isOwner),
  };
}
