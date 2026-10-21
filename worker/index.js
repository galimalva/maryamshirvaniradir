export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ 
        message: 'API is active',
        endpoint: url.pathname,
        supabase: env.SUPABASE_URL ? 'configured' : 'missing'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};