import { handleLogin } from './api/login.js';
import { handleUpload } from './api/upload.js';
import { handleList } from './api/list.js';
import { handleDelete } from './api/delete.js';
import { handleLogout } from './api/logout.js';
import { checkAuth } from './utils/auth.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // مسیرهای API
    if (path === '/api/login' && method === 'POST') {
      return handleLogin(request, env);
    }
    
    if (path === '/api/logout' && method === 'POST') {
      return handleLogout(request, env);
    }

    // مسیرهای محافظت‌شده (نیاز به ورود دارند)
    if (path === '/api/upload' && method === 'POST') {
      const auth = await checkAuth(request, env);
      if (!auth.ok) return auth.response;
      return handleUpload(request, env);
    }

    if (path === '/api/list' && method === 'GET') {
      const auth = await checkAuth(request, env);
      if (!auth.ok) return auth.response;
      return handleList(request, env);
    }

    if (path === '/api/delete' && method === 'POST') {
      const auth = await checkAuth(request, env);
      if (!auth.ok) return auth.response;
      return handleDelete(request, env);
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