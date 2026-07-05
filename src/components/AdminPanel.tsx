import { useEffect, useState, useMemo } from 'react';
import {
  Eye,
  Mail,
  Settings,
  ShieldCheck,
  Trash2,
  Check,
  RefreshCw,
  X,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  Calendar,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Types
interface VisitRow {
  id: string;
  created_at: string;
  visitor_id: string;
  is_owner: boolean;
  page_path: string;
  user_agent: string;
}

interface MessageRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
}

interface AnnouncementSettings {
  text: string;
  isVisible: boolean;
}

export default function AdminPanel() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab state: 'overview' | 'messages' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'settings'>('overview');

  // Loading/data state
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  
  // Settings edit state
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const role = localStorage.getItem('portfolio_role');
    if (role === 'owner') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all dashboard data
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      // Fetch visits (max 1000 for stats)
      const { data: visitsData, error: visitsErr } = await supabase
        .from('portfolio_visits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (visitsErr) throw visitsErr;
      setVisits(visitsData || []);

      // Fetch messages
      const { data: messagesData, error: messagesErr } = await supabase
        .from('portfolio_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesErr) throw messagesErr;
      setMessages(messagesData || []);

      // Fetch announcement settings
      const { data: settingsData, error: settingsErr } = await supabase
        .from('portfolio_settings')
        .select('*')
        .eq('key', 'announcement')
        .single();

      if (!settingsErr && settingsData) {
        const val = settingsData.value as AnnouncementSettings;
        setAnnouncementText(val.text || '');
        setAnnouncementVisible(val.isVisible || false);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Auth handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (passcode === adminPassword) {
      localStorage.setItem('portfolio_role', 'owner');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_role');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Helper: format User Agent
  const getDeviceIcon = (ua: string) => {
    const lowerUA = ua.toLowerCase();
    if (lowerUA.includes('mobi') || lowerUA.includes('android') || lowerUA.includes('iphone')) {
      return (
        <span className="text-muted-foreground text-xs px-1.5 py-0.5 rounded border border-border bg-surface-light inline-flex items-center gap-1">
          <Smartphone size={12} /> Mobile
        </span>
      );
    }
    return (
      <span className="text-muted-foreground text-xs px-1.5 py-0.5 rounded border border-border bg-surface-light inline-flex items-center gap-1">
        <Laptop size={12} /> Desktop
      </span>
    );
  };

  const getBrowserName = (ua: string) => {
    const lowerUA = ua.toLowerCase();
    if (lowerUA.includes('chrome') || lowerUA.includes('chromium')) return 'Chrome';
    if (lowerUA.includes('firefox')) return 'Firefox';
    if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) return 'Safari';
    if (lowerUA.includes('edge')) return 'Edge';
    return 'Other';
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const viewerVisits = visits.filter((v) => !v.is_owner);
    const ownerVisits = visits.filter((v) => v.is_owner);
    
    // Unique viewers by visitor_id
    const uniqueViewers = new Set(viewerVisits.map((v) => v.visitor_id)).size;

    return {
      totalViewers: viewerVisits.length,
      totalOwner: ownerVisits.length,
      uniqueViewers
    };
  }, [visits]);

  // SVG Chart calculation: Last 7 Days
  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const counts = days.map((day) => {
      return visits.filter((v) => !v.is_owner && v.created_at.startsWith(day)).length;
    });

    const maxCount = Math.max(...counts, 5); // Fallback to 5 to avoid flat chart

    return { days, counts, maxCount };
  }, [visits]);

  // Message handlers
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio_messages')
        .update({ is_read: !currentRead })
        .eq('id', id);

      if (error) throw error;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, is_read: !currentRead } : msg))
      );
    } catch (err) {
      console.error('Error toggling read status:', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const { error } = await supabase.from('portfolio_messages').delete().eq('id', id);
      if (error) throw error;
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // Settings handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsSuccess(false);

    try {
      const { error } = await supabase.from('portfolio_settings').upsert({
        key: 'announcement',
        value: {
          text: announcementText,
          isVisible: announcementVisible
        },
        updated_at: new Date().toISOString()
      });

      if (error) throw error;
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSettingsSaving(false);
    }
  };

  // 1. Password Protection wall
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-mono select-none relative overflow-hidden">
        {/* Cool industrial background grid elements */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--theme-border)_1px,transparent_1px),linear-gradient(90deg,var(--theme-border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] pointer-events-none" />
        
        <form
          onSubmit={handleAuth}
          className="glass-panel p-6 sm:p-10 rounded-2xl w-full max-w-md border border-border shadow-2xl relative z-10 flex flex-col items-center text-center gap-6"
        >
          <div className="p-4 rounded-full bg-electric/10 border border-electric/30 text-electric">
            <ShieldCheck size={36} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">Admin Gate</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-light">
              Enter passcode to access monitoring & controls.
            </p>
          </div>

          <div className="w-full">
            <input
              type="password"
              placeholder="••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 text-center text-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all font-sans"
              required
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-xs mt-2 font-mono flex items-center justify-center gap-1">
                <X size={12} /> Access Denied. Invalid Passcode.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-electric text-background font-mono font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            Authenticate
          </button>
          
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-electric flex items-center gap-1 transition-colors mt-2"
          >
            <ArrowLeft size={12} /> Return Home
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-electric text-background">
              <LayoutDashboard size={18} />
            </span>
            <span className="font-serif text-lg font-bold tracking-tight">Console v1.0</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="p-2 rounded-lg border border-border hover:bg-surface-light transition-colors text-muted-foreground disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg border border-border text-xs sm:text-sm font-mono hover:text-red-500 hover:border-red-500/30 transition-all flex items-center gap-1.5"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border mb-8 overflow-x-auto select-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-6 font-mono text-sm border-b-2 font-medium transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'border-electric text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview & Traffic
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3.5 px-6 font-mono text-sm border-b-2 font-medium transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'border-electric text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Inbox
            {messages.filter((m) => !m.is_read).length > 0 && (
              <span className="bg-electric text-background text-[10px] font-sans px-1.5 py-0.5 rounded-full font-bold">
                {messages.filter((m) => !m.is_read).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-6 font-mono text-sm border-b-2 font-medium transition-all cursor-pointer shrink-0 ${
              activeTab === 'settings'
                ? 'border-electric text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Announcement Config
          </button>
        </div>

        {isLoading ? (
          <div className="py-24 text-center">
            <RefreshCw size={36} className="animate-spin text-electric mx-auto" />
            <p className="text-muted-foreground text-sm font-mono mt-4">Loading system matrices...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW & TRAFFIC */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Stats Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="glass p-5 rounded-2xl border border-border">
                    <div className="flex justify-between items-start text-muted-foreground">
                      <span className="text-xs font-mono uppercase tracking-wider">Viewer Visits</span>
                      <Globe size={16} className="text-electric" />
                    </div>
                    <p className="text-3xl font-serif font-bold mt-2">{metrics.totalViewers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">General public hits logged</p>
                  </div>

                  <div className="glass p-5 rounded-2xl border border-border">
                    <div className="flex justify-between items-start text-muted-foreground">
                      <span className="text-xs font-mono uppercase tracking-wider">Unique Viewers</span>
                      <Eye size={16} className="text-electric" />
                    </div>
                    <p className="text-3xl font-serif font-bold mt-2">{metrics.uniqueViewers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Distinct browser identifiers</p>
                  </div>

                  <div className="glass p-5 rounded-2xl border border-border">
                    <div className="flex justify-between items-start text-muted-foreground">
                      <span className="text-xs font-mono uppercase tracking-wider">Owner Visits</span>
                      <ShieldCheck size={16} className="text-electric" />
                    </div>
                    <p className="text-3xl font-serif font-bold mt-2">{metrics.totalOwner.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Localhost & flagged browser hits</p>
                  </div>
                </div>

                {/* SVG Traffic Activity Chart */}
                <div className="glass p-5 sm:p-6 rounded-2xl border border-border">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Traffic Activity (Last 7 Days)</h3>
                  
                  <div className="h-64 w-full">
                    <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--theme-electric)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="var(--theme-electric)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Helper Lines */}
                      <line x1="0" y1="40" x2="700" y2="40" stroke="var(--theme-border)" strokeDasharray="4 4" strokeWidth="1" />
                      <line x1="0" y1="120" x2="700" y2="120" stroke="var(--theme-border)" strokeDasharray="4 4" strokeWidth="1" />
                      <line x1="0" y1="200" x2="700" y2="200" stroke="var(--theme-border)" strokeDasharray="4 4" strokeWidth="1" />

                      {/* Area & Stroke Paths */}
                      {(() => {
                        const points = chartData.counts.map((c, i) => {
                          const x = (i / 6) * 700;
                          const y = 200 - (c / chartData.maxCount) * 160;
                          return { x, y };
                        });

                        const dArea = `M 0,200 ${points.map((p) => `L ${p.x},${p.y}`).join(' ')} L 700,200 Z`;
                        const dLine = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;

                        return (
                          <>
                            <path d={dArea} fill="url(#chartGrad)" />
                            <path d={dLine} fill="none" stroke="var(--theme-electric)" strokeWidth="2.5" />
                            {points.map((p, idx) => (
                              <g key={idx} className="group cursor-pointer">
                                <circle cx={p.x} cy={p.y} r="5" fill="var(--theme-background)" stroke="var(--theme-electric)" strokeWidth="2.5" />
                                <text x={p.x} y={p.y - 12} textAnchor="middle" fill="currentColor" className="text-[10px] font-mono hidden group-hover:block font-bold">
                                  {chartData.counts[idx]}
                                </text>
                              </g>
                            ))}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  {/* Days labels */}
                  <div className="flex justify-between items-center px-1.5 mt-2 font-mono text-[10px] sm:text-xs text-muted-foreground select-none">
                    {chartData.days.map((day, i) => {
                      const label = new Date(day).toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
                      return <span key={i}>{label}</span>;
                    })}
                  </div>
                </div>

                {/* Recent Visits Table */}
                <div className="glass rounded-2xl border border-border overflow-hidden">
                  <div className="p-5 border-b border-border bg-surface-light/40 flex items-center justify-between">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Recent Visits</h3>
                    <span className="text-xs text-muted-foreground font-mono">Showing last {Math.min(visits.length, 25)} items</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground bg-surface-light/10 select-none">
                          <th className="p-4 font-medium">Time (Local)</th>
                          <th className="p-4 font-medium">Path</th>
                          <th className="p-4 font-medium">Role</th>
                          <th className="p-4 font-medium">Platform</th>
                          <th className="p-4 font-medium">Browser</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {visits.slice(0, 25).map((visit) => (
                          <tr key={visit.id} className="hover:bg-surface-light/20 transition-colors">
                            <td className="p-4 text-muted-foreground">
                              {new Date(visit.created_at).toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </td>
                            <td className="p-4 font-medium text-foreground">{visit.page_path}</td>
                            <td className="p-4">
                              {visit.is_owner ? (
                                <span className="text-[10px] text-amber-500 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">Owner</span>
                              ) : (
                                <span className="text-[10px] text-emerald-500 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">Viewer</span>
                              )}
                            </td>
                            <td className="p-4">{getDeviceIcon(visit.user_agent)}</td>
                            <td className="p-4 text-muted-foreground">{getBrowserName(visit.user_agent)}</td>
                          </tr>
                        ))}
                        {visits.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-muted-foreground">No visits logged in the database yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INBOX & MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center select-none">
                  <h3 className="text-base sm:text-lg font-serif font-bold tracking-tight">Inbox Submissions ({messages.length})</h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {messages.filter(m => !m.is_read).length} unread
                  </span>
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`glass p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 ${
                        msg.is_read ? 'border-border/50 opacity-75' : 'border-electric shadow-[0_0_15px_rgba(245,208,0,0.06)]'
                      }`}
                    >
                      {/* Read status light indicators */}
                      {!msg.is_read && (
                        <div className="absolute right-0 top-0 w-2.5 h-2.5 bg-electric" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                            {msg.name}
                            {!msg.is_read && (
                              <span className="bg-electric/15 text-electric text-[9px] font-sans px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">New</span>
                            )}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                              <Mail size={12} /> <a href={`mailto:${msg.email}`}>{msg.email}</a>
                            </span>
                            {msg.phone && (
                              <span>Phone: {msg.phone}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-mono shrink-0 sm:text-right">
                          <span className="flex items-center gap-1 sm:justify-end">
                            <Calendar size={12} /> {new Date(msg.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-light text-foreground whitespace-pre-line leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                        <button
                          onClick={() => handleToggleRead(msg.id, msg.is_read)}
                          className={`text-xs font-mono font-medium py-1 px-3 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                            msg.is_read
                              ? 'border-border/60 hover:bg-surface-light text-muted-foreground'
                              : 'border-electric hover:bg-electric text-background bg-electric/10'
                          }`}
                        >
                          <Check size={12} />
                          {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-xs font-mono font-medium py-1 px-3 rounded-lg border border-red-500/20 hover:border-red-500 hover:text-red-500 bg-red-500/[0.03] text-red-500/80 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="glass p-12 rounded-2xl border border-border text-center">
                      <Mail size={32} className="text-muted-foreground opacity-55 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm font-mono">No submissions received yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CONFIG & SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="glass p-6 sm:p-8 rounded-2xl border border-border">
                  <div className="flex items-center gap-2 mb-6 border-b border-border/40 pb-3">
                    <Settings size={18} className="text-electric" />
                    <h3 className="font-serif text-lg font-bold tracking-tight">Announcement Configuration</h3>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="banner-text" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Banner Text
                      </label>
                      <textarea
                        id="banner-text"
                        placeholder="Currently open to full-time React/Node developer roles..."
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="w-full bg-surface-light border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-electric transition-all font-mono h-24 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-3 select-none">
                      <input
                        type="checkbox"
                        id="banner-visible"
                        checked={announcementVisible}
                        onChange={(e) => setAnnouncementVisible(e.target.checked)}
                        className="w-4 h-4 accent-electric cursor-pointer rounded"
                      />
                      <label htmlFor="banner-visible" className="text-sm text-foreground cursor-pointer font-mono font-medium">
                        Enable Display Banner
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={settingsSaving}
                        className="w-full py-2.5 rounded-xl bg-electric text-background font-mono font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {settingsSaving ? 'Saving settings...' : 'Save Settings'}
                      </button>

                      {settingsSuccess && (
                        <p className="text-emerald-500 text-xs text-center font-mono mt-3 flex items-center justify-center gap-1 select-none animate-bounce">
                          <Check size={12} /> Configuration Updated Live!
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
