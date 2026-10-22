import { createClient } from '@supabase/supabase-js';

function getClient(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

export async function handleListNotes(request, env, isAdmin = false) {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
    let query = supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (!isAdmin) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) return jsonError(error.message);
    return jsonOk({ notes: data });
  } catch (e) { return jsonError(e.message); }
}

export async function handleCreateNote(request, env) {
  try {
    const supabase = getClient(env);
    const { content, is_published } = await request.json();
    if (!content) return jsonError('متن دلنوشته لازم است');
    const { data, error } = await supabase.from('notes').insert([{
      content, is_published: is_published !== false
    }]).select();
    if (error) return jsonError(error.message);
    return jsonOk({ note: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleDeleteNote(request, env) {
  try {
    const supabase = getClient(env);
    const { id } = await request.json();
    if (!id) return jsonError('آیدی لازم است');
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) return jsonError(error.message);
    return jsonOk({ success: true });
  } catch (e) { return jsonError(e.message); }
}

function jsonOk(data) {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
function jsonError(message) {
  return new Response(JSON.stringify({ error: message }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
  });
}