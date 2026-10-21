export async function handleLogout(request, env) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Set-Cookie', 
    'sb-access-token=; HttpOnly; Secure; Path=/; Max-Age=0'
  );
  headers.append('Set-Cookie', 
    'sb-refresh-token=; HttpOnly; Secure; Path=/; Max-Age=0'
  );

  return new Response(JSON.stringify({ success: true }), {
    headers
  });
}