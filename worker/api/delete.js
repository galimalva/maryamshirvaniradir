import { createClient } from '@supabase/supabase-js';

export async function handleDelete(request, env) {
  try {
    const { path } = await request.json();
    
    if (!path) {
      return new Response(JSON.stringify({ 
        error: 'مسیر فایل لازم است' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY
    );

    const { error } = await supabase.storage
      .from('admin-uploads')
      .remove([path]);

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'خطا در حذف: ' + error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ 
      error: 'خطای سرور: ' + err.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}