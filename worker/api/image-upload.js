import { createClient } from '@supabase/supabase-js';

export async function handleUploadImage(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'فایلی انتخاب نشده' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'حجم عکس نباید بیشتر از ۵ مگابایت باشد' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);

    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600'
      });

    if (error) {
      return new Response(JSON.stringify({ error: 'خطا در آپلود: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return new Response(JSON.stringify({
      success: true,
      url: urlData.publicUrl,
      path: filePath
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'خطای سرور: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}