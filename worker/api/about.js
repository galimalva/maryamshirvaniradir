import { createClient } from '@supabase/supabase-js';

function getClient(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
}

export async function handleGetAbout(request, env) {
  try {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
    const { data, error } = await supabase.from('about').select('*').eq('id', 1).single();
    if (error) return jsonError(error.message);
    return jsonOk({ about: data });
  } catch (e) { return jsonError(e.message); }
}

export async function handleUpdateAbout(request, env) {
  try {
    const supabase = getClient(env);
    const { content } = await request.json();
    if (!content) return jsonError('متن لازم است');
    const { data, error } = await supabase.from('about')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', 1).select();
    if (error) return jsonError(error.message);
    return jsonOk({ about: data[0] });
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