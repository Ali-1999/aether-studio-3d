import { onRequestPost } from './contact.js';

// Cloudflare Worker serving static assets and a real /api/contact endpoint.
// With ASSETS and selective run_worker_first, static pages are served from dist.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method === 'POST') return onRequestPost({ request, env, ctx });
      return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
        status: 405,
        headers: { 'content-type': 'application/json; charset=utf-8', 'allow': 'POST' }
      });
    }
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found.' }), {
        status: 404, headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
