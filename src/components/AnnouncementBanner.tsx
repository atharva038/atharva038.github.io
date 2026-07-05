import { useEffect, useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export interface AnnouncementSettings {
  text: string;
  isVisible: boolean;
}

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<AnnouncementSettings | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const { data, error } = await supabase
          .from('portfolio_settings')
          .select('value')
          .eq('key', 'announcement')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // Ignore "no rows found" error
            console.error('Error fetching announcement setting:', error);
          }
          return;
        }

        if (data && data.value) {
          const val = data.value as AnnouncementSettings;
          setAnnouncement(val);
        }
      } catch (err) {
        console.error('Unexpected error fetching settings:', err);
      }
    }

    fetchAnnouncement();
  }, []);

  if (isDismissed || !announcement || !announcement.isVisible || !announcement.text) {
    return null;
  }

  return (
    <div className="bg-electric text-background text-xs sm:text-sm font-mono py-2.5 px-4 relative z-50 flex items-center justify-center gap-2 border-b border-border shadow-md select-none transition-all duration-300">
      <div className="flex items-center gap-2 max-w-4xl mx-auto text-center pr-8">
        <Megaphone size={14} className="animate-bounce shrink-0" />
        <span className="font-medium tracking-wide">{announcement.text}</span>
      </div>
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-background/75 hover:text-background hover:bg-background/10 rounded-md transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}
