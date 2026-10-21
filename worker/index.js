import { handleLogin } from './api/login.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // مسیرهای API
    if (path === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({ 
        error: 'مسیر پیدا نشد',
        path: path 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // فایل‌های استاتیک سایت
    return env.ASSETS.fetch(request);
  }
};