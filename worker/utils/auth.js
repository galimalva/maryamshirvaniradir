import { createClient } from '@supabase/supabase-js';

export async function checkAuth(request, env) {
  try {
    const cookies = request.headers.get('Cookie') || '';
    const tokenMatch = cookies.match(/sb-access-token=([^;]+)/);
    
    if (!tokenMatch) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ 
          error: 'لطفاً وارد شوید' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      };
    }

    const token = tokenMatch[1];
    
    // بررسی اعتبار توکن با Supabase
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_PUBLISHABLE_KEY
    );
    
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ 
          error: 'نشست شما منقضی شده. دوباره وارد شوید' 
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      };
    }

    // بررسی اینکه کاربر ادمین هست
    if (data.user.email !== env.ADMIN_EMAIL) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ 
          error: 'دسترسی غیرمجاز' 
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      };
    }

    return { ok: true, user: data.user };
  } catch (err) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ 
        error: 'خطای احراز هویت' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    };
  }
}