import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, LogOut, Music2, Pencil, Trash2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const emptyForm = { performer_name: '', title: 'Live Music', starts_at: '', ends_at: '', description: '', is_published: true };

function localInputValue(value) {
  if (!value) return '';
  const d = new Date(value);
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase.from('events').select('*').order('starts_at', { ascending: true });
    if (error) setMessage(error.message); else setEvents(data || []);
  }

  useEffect(() => { if (session) loadEvents(); }, [session]);

  const upcoming = useMemo(() => events.filter((e) => new Date(e.starts_at) >= new Date(Date.now() - 86400000)), [events]);

  async function signIn(e) {
    e.preventDefault(); setBusy(true); setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    setBusy(false);
  }

  async function saveEvent(e) {
    e.preventDefault(); setBusy(true); setMessage('');
    const payload = {
      performer_name: form.performer_name.trim(), title: form.title.trim() || 'Live Music',
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      description: form.description.trim() || null, is_published: form.is_published,
    };
    const query = editingId ? supabase.from('events').update(payload).eq('id', editingId) : supabase.from('events').insert(payload);
    const { error } = await query;
    if (error) setMessage(error.message); else {
      setMessage(editingId ? 'Schedule updated.' : 'Band added to the chalkboard.');
      setForm(emptyForm); setEditingId(null); await loadEvents();
    }
    setBusy(false);
  }

  function editEvent(event) {
    setEditingId(event.id);
    setForm({ performer_name: event.performer_name || '', title: event.title || 'Live Music', starts_at: localInputValue(event.starts_at), ends_at: localInputValue(event.ends_at), description: event.description || '', is_published: event.is_published });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteEvent(id) {
    if (!window.confirm('Remove this live music listing?')) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) setMessage(error.message); else loadEvents();
  }

  if (!isSupabaseConfigured) return <main className="admin-page"><div className="admin-card"><h1>Admin setup needed</h1><p>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.</p></div></main>;

  if (!session) return (
    <main className="admin-page admin-login"><form className="admin-card" onSubmit={signIn}>
      <Music2 size={38} /><h1>The Island Admin</h1><p>Bartender and manager sign-in</p>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {message && <p className="admin-message error">{message}</p>}
      <button className="admin-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      <a href="/">← Back to website</a>
    </form></main>
  );

  return (
    <main className="admin-page">
      <header className="admin-header"><div><small>THE ISLAND</small><h1>Live Music Chalkboard</h1></div><button onClick={() => supabase.auth.signOut()}><LogOut size={17}/> Sign out</button></header>
      <div className="admin-grid">
        <form className="admin-card admin-form" onSubmit={saveEvent}>
          <h2><CalendarPlus size={22}/> {editingId ? 'Edit schedule' : 'Add live music'}</h2>
          <label>Band or performer<input value={form.performer_name} onChange={(e) => setForm({...form, performer_name: e.target.value})} placeholder="Band name" required /></label>
          <label>Date and start time<input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({...form, starts_at: e.target.value})} required /></label>
          <label>End time (optional)<input type="datetime-local" value={form.ends_at} onChange={(e) => setForm({...form, ends_at: e.target.value})} /></label>
          <label>Notes (optional)<textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Acoustic set, no cover, etc." /></label>
          <label className="admin-check"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({...form, is_published: e.target.checked})}/> Show on website chalkboard</label>
          {message && <p className="admin-message">{message}</p>}
          <div className="admin-form-actions"><button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Update schedule' : 'Add to chalkboard'}</button>{editingId && <button type="button" onClick={() => {setEditingId(null); setForm(emptyForm);}}>Cancel</button>}</div>
        </form>

        <section className="admin-card admin-schedule"><h2>Upcoming schedule</h2>{upcoming.length === 0 ? <p>No upcoming music added yet.</p> : upcoming.map((event) => (
          <article key={event.id} className="admin-event"><div><small>{new Intl.DateTimeFormat('en-US', { weekday:'long', month:'short', day:'numeric', hour:'numeric', minute:'2-digit' }).format(new Date(event.starts_at))}</small><h3>{event.performer_name || event.title}</h3><span>{event.is_published ? 'Visible on chalkboard' : 'Hidden'}</span></div><div><button aria-label="Edit" onClick={() => editEvent(event)}><Pencil size={17}/></button><button aria-label="Delete" onClick={() => deleteEvent(event.id)}><Trash2 size={17}/></button></div></article>
        ))}</section>
      </div>
    </main>
  );
}
