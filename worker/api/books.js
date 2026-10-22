import { createClient } from '@supabase/supabase-js';

function getClient(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

export async function handleListBooks(request, env, isAdmin = false) {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
    let query = supabase.from('books').select('*').order('created_at', { ascending: false });
    if (!isAdmin) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) return jsonError(error.message);
    return jsonOk({ books: data });
  } catch (e) { return jsonError(e.message); }
}

export async function handleCreateBook(request, env) {
  try {
    const supabase = getClient(env);
    const { title, author, description, cover_url, rating, is_published } = await request.json();
    if (!title) return jsonError('عنوان کتاب لازم است');
    const { data, error } = await supabase.from('books').insert([{
      title, author, description, cover_url,
      rating: rating || 0,
      is_published: is_published !== false
    }]).select();
    if (error) return jsonError(error.message);
    return jsonOk({ book: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleUpdateBook(request, env) {
  try {
    const supabase = getClient(env);
    const { id, ...updates } = await request.json();
    if (!id) return jsonError('آیدی لازم است');
    const { data, error } = await supabase.from('books').update(updates).eq('id', id).select();
    if (error) return jsonError(error.message);
    return jsonOk({ book: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleDeleteBook(request, env) {
  try {
    const supabase = getClient(env);
    const { id } = await request.json();
    if (!id) return jsonError('آیدی لازم است');
    const { error } = await supabase.from('books').delete().eq('id', id);
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