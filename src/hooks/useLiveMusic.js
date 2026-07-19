import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const fallback = [
  { id: 'fri', performer_name: 'Friday Night Live', starts_at: null },
  { id: 'sat', performer_name: 'Saturday Night Live', starts_at: null },
  { id: 'sun', performer_name: 'Sunday Funday Music', starts_at: null },
];

export function useLiveMusic() {
  const [events, setEvents] = useState(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    async function load() {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('events')
        .select('id,title,performer_name,starts_at,ends_at')
        .eq('is_published', true)
        .gte('starts_at', now)
        .order('starts_at', { ascending: true })
        .limit(3);

      if (!active) return;
      if (!error && data?.length) setEvents(data);
      setLoading(false);
    }

    load();
    const channel = supabase
      .channel('public-live-music')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, load)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { events, loading };
}
