import { createClient } from '@supabase/supabase-js';

export async function handleLogin(request, env) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ 
        error: 'ایمیل و رمز عبور لازم است' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_PUBLISHABLE_KEY
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'ایمیل یا رمز عبور اشتباه است' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (email !== env.ADMIN_EMAIL) {
      return new Response(JSON.stringify({ 
        error: 'شما ادمین نیستید' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Set-Cookie', 
      `sb-access-token=${data.session.access_token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=3600`
    );
    headers.append('Set-Cookie', 
      `sb-refresh-token=${data.session.refresh_token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=604800`
    );

    return new Response(JSON.stringify({ success: true }), {
      headers
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