import { createClient } from '@supabase/supabase-js';

export async function handleList(request, env) {
  try {
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY
    );

    const { data, error } = await supabase.storage
      .from('admin-uploads')
      .list('uploads', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'خطا در دریافت لیست: ' + error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // گرفتن URL عمومی برای هر فایل
    const filesWithUrls = await Promise.all(
      (data || []).map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(`uploads/${file.name}`);
        
        return {
          name: file.name,
          size: file.metadata?.size || 0,
          created: file.created_at,
          url: urlData.publicUrl
        };
      })
    );

    return new Response(JSON.stringify({ 
      success: true,
      files: filesWithUrls
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