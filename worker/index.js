import { handleLogin } from './api/login.js';
import { handleLogout } from './api/logout.js';
import { checkAuth } from './utils/auth.js';
import { handleUploadImage } from './api/image-upload.js';
import {
  handleListPoems, handleCreatePoem, handleUpdatePoem, handleDeletePoem
} from './api/poems.js';
import {
  handleListStories, handleCreateStory, handleUpdateStory, handleDeleteStory
} from './api/stories.js';
import {
  handleListNotes, handleCreateNote, handleDeleteNote
} from './api/notes.js';
import {
  handleListBooks, handleCreateBook, handleUpdateBook, handleDeleteBook
} from './api/books.js';
import {
  handleListGallery, handleCreateGallery, handleDeleteGallery
} from './api/gallery.js';
import { handleGetAbout, handleUpdateAbout } from './api/about.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      // ===== مسیرهای عمومی (لاگین) =====
      if (path === '/api/login' && method === 'POST') return handleLogin(request, env);
      if (path === '/api/logout' && method === 'POST') return handleLogout(request, env);

      // ===== مسیرهای محافظت‌شده =====
      const protectedPaths = [
        '/api/admin/upload-image',
        '/api/admin/poems/create', '/api/admin/poems/update', '/api/admin/poems/delete',
        '/api/admin/stories/create', '/api/admin/stories/update', '/api/admin/stories/delete',
        '/api/admin/notes/create', '/api/admin/notes/delete',
        '/api/admin/books/create', '/api/admin/books/update', '/api/admin/books/delete',
        '/api/admin/gallery/create', '/api/admin/gallery/delete',
        '/api/admin/about/update'
      ];

      if (protectedPaths.includes(path)) {
        const auth = await checkAuth(request, env);
        if (!auth.ok) return auth.response;
      }

      // ===== آپلود عکس =====
      if (path === '/api/admin/upload-image' && method === 'POST') {
        return handleUploadImage(request, env);
      }

      // ===== شعرها (عمومی) =====
      if (path === '/api/poems' && method === 'GET') return handleListPoems(request, env);

      // ===== شعرها (ادمین) =====
      if (path === '/api/admin/poems' && method === 'GET') return handleListPoems(request, env, true);
      if (path === '/api/admin/poems/create' && method === 'POST') return handleCreatePoem(request, env);
      if (path === '/api/admin/poems/update' && method === 'POST') return handleUpdatePoem(request, env);
      if (path === '/api/admin/poems/delete' && method === 'POST') return handleDeletePoem(request, env);

      // ===== داستان‌ها (عمومی) =====
      if (path === '/api/stories' && method === 'GET') return handleListStories(request, env);

      // ===== داستان‌ها (ادمین) =====
      if (path === '/api/admin/stories' && method === 'GET') return handleListStories(request, env, true);
      if (path === '/api/admin/stories/create' && method === 'POST') return handleCreateStory(request, env);
      if (path === '/api/admin/stories/update' && method === 'POST') return handleUpdateStory(request, env);
      if (path === '/api/admin/stories/delete' && method === 'POST') return handleDeleteStory(request, env);

      // ===== دلنوشته‌ها (عمومی) =====
      if (path === '/api/notes' && method === 'GET') return handleListNotes(request, env);

      // ===== دلنوشته‌ها (ادمین) =====
      if (path === '/api/admin/notes' && method === 'GET') return handleListNotes(request, env, true);
      if (path === '/api/admin/notes/create' && method === 'POST') return handleCreateNote(request, env);
      if (path === '/api/admin/notes/delete' && method === 'POST') return handleDeleteNote(request, env);

      // ===== کتاب‌ها (عمومی) =====
      if (path === '/api/books' && method === 'GET') return handleListBooks(request, env);

      // ===== کتاب‌ها (ادمین) =====
      if (path === '/api/admin/books' && method === 'GET') return handleListBooks(request, env, true);
      if (path === '/api/admin/books/create' && method === 'POST') return handleCreateBook(request, env);
      if (path === '/api/admin/books/update' && method === 'POST') return handleUpdateBook(request, env);
      if (path === '/api/admin/books/delete' && method === 'POST') return handleDeleteBook(request, env);

      // ===== گالری (عمومی) =====
      if (path === '/api/gallery' && method === 'GET') return handleListGallery(request, env);

      // ===== گالری (ادمین) =====
      if (path === '/api/admin/gallery' && method === 'GET') return handleListGallery(request, env, true);
      if (path === '/api/admin/gallery/create' && method === 'POST') return handleCreateGallery(request, env);
      if (path === '/api/admin/gallery/delete' && method === 'POST') return handleDeleteGallery(request, env);

      // ===== درباره من =====
      if (path === '/api/about' && method === 'GET') return handleGetAbout(request, env);
      if (path === '/api/admin/about' && method === 'GET') return handleGetAbout(request, env);
      if (path === '/api/admin/about/update' && method === 'POST') return handleUpdateAbout(request, env);

      // ===== مسیر پیدا نشد =====
      if (path.startsWith('/api/')) {
        return json({ error: 'مسیر پیدا نشد', path }, 404);
      }

      // ===== فایل‌های استاتیک سایت =====
      return env.ASSETS.fetch(request);

    } catch (err) {
      return json({ error: 'خطای سرور: ' + err.message }, 500);
    }
  }
};