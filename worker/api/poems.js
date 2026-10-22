import { createClient } from '@supabase/supabase-js';

function getClient(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

export async function handleListPoems(request, env, isAdmin = false) {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
    let query = supabase.from('poems').select('*').order('created_at', { ascending: false });
    if (!isAdmin) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) return jsonError(error.message);
    return jsonOk({ poems: data });
  } catch (e) { return jsonError(e.message); }
}

export async function handleCreatePoem(request, env) {
  try {
    const supabase = getClient(env);
    const body = await request.json();
    const { title, content, category, author, is_published, image_url } = body;
    if (!title || !content) return jsonError('عنوان و متن شعر لازم است');
    const { data, error } = await supabase.from('poems').insert([{
      title, content,
      category: category || 'عمومی',
      author: author || 'مریم شروانی راد',
      is_published: is_published !== false,
      image_url: image_url || null
    }]).select();
    if (error) return jsonError(error.message);
    return jsonOk({ poem: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleUpdatePoem(request, env) {
  try {
    const supabase = getClient(env);
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return jsonError('آیدی لازم است');
    updates.updated_at = new Date().toISOString();
    const { data, error } = await supabase.from('poems').update(updates).eq('id', id).select();
    if (error) return jsonError(error.message);
    return jsonOk({ poem: data[0] });
  } catch (e) { return jsonError(e.message); }
}

export async function handleDeletePoem(request, env) {
  try {
    const supabase = getClient(env);
    const { id } = await request.json();
    if (!id) return jsonError('آیدی لازم است');
    const { error } = await supabase.from('poems').delete().eq('id', id);
    if (error) return jsonError(error.message);
    return jsonOk({ success: true });
  } catch (e) { return jsonError(e.message); }
}

function jsonOk(data) {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
function jsonError(message) {
  return new Response(JSON.stringify({ error: message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}