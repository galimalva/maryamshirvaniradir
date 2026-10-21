import { createClient } from '@supabase/supabase-js';

export async function handleUpload(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ 
        error: 'فایلی انتخاب نشده' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // بررسی حجم فایل (حداکثر 50 مگابایت)
    if (file.size > 50 * 1024 * 1024) {
      return new Response(JSON.stringify({ 
        error: 'حجم فایل نباید بیشتر از 50 مگابایت باشد' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ساخت کلاینت Supabase با کلید مخفی (دسترسی کامل)
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY
    );

    // ساخت نام منحصر به فرد برای فایل
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // آپلود فایل به Supabase Storage
    const { data, error } = await supabase.storage
      .from('admin-uploads')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600'
      });

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'خطا در آپلود: ' + error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      path: filePath,
      name: file.name,
      size: file.size
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