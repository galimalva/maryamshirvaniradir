import { createClient } from '@supabase/supabase-js';

function getClient(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

export async function handleListGallery(request, env, isAdmin = false) {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
    let query = supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (!isAdmin) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) return jsonError(error.message);
    return jsonOk({ gallery: data });
  } catch (e) { return jsonError(e.message); }
}

export async function handleCreateGallery(request, env) {
  try {
    const supabase = getClient(env);
    const { title, description, image_url, is_published } = await request.json();
    if (!image_url) return jsonError('عکس لازم است');
    const { data, error } = await supabase.from('gallery').insert([{
      title: title || '', description: description || '',
      image_url, is_published: is_published !== false
    }]).select();
    if (error) return jsonError(error.message);
    return jsonOk({ item: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleDeleteGallery(request, env) {
  try {
    const supabase = getClient(env);
    const { id } = await request.json();
    if (!id) return jsonError('آیدی لازم است');
    const { error } = await supabase.from('gallery').delete().eq('id', id);
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