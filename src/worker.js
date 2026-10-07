const MODEL = '@cf/zai-org/glm-4.7-flash';
const MAX_BODY_LENGTH = 12_000;
const MAX_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 1_200;

const SYSTEM_PROMPT = `Eres la guía virtual del portal de Mentoría en Investigación Científica.
Responde siempre en español, con claridad, amabilidad y orientación práctica.
Ayuda con información general sobre tesis, investigación, metodología, escritura académica y el contenido de este portal.
El portal ofrece acompañamiento en dirección de tesis, diseño metodológico, análisis de datos, escritura académica y preparación de defensas.
No inventes precios, fechas, credenciales, políticas ni detalles que no se hayan proporcionado. Si no conoces una respuesta específica sobre el servicio, recomienda contactar al equipo mediante los canales publicados en el sitio.
No afirmes que sustituyes a un director de tesis, profesional o asesor humano. Para decisiones académicas importantes, sugiere validar la respuesta con el mentor correspondiente.
No solicites contraseñas, datos financieros ni información personal sensible.`;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return false;
  }

  return messages.every((message) => (
    message
    && (message.role === 'user' || message.role === 'assistant')
    && typeof message.content === 'string'
    && message.content.trim().length > 0
    && message.content.length <= MAX_MESSAGE_LENGTH
  )) && messages[messages.length - 1].role === 'user';
}

function getAssistantText(result) {
  if (typeof result?.response === 'string') {
    return result.response.trim();
  }

  const content = result?.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content.trim() : '';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/chat') {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Método no permitido.' }, 405);
    }

    const origin = request.headers.get('origin');
    if (origin) {
      try {
        if (new URL(origin).origin !== url.origin) {
          return jsonResponse({ error: 'Origen no permitido.' }, 403);
        }
      } catch {
        return jsonResponse({ error: 'Origen no permitido.' }, 403);
      }
    }

    if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
      return jsonResponse({ error: 'El contenido debe estar en formato JSON.' }, 415);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_LENGTH) {
      return jsonResponse({ error: 'La conversación es demasiado larga.' }, 413);
    }

    let body;
    try {
      const rawBody = await request.text();
      if (rawBody.length > MAX_BODY_LENGTH) {
        return jsonResponse({ error: 'La conversación es demasiado larga.' }, 413);
      }
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: 'No se pudo leer la solicitud. Intenta de nuevo.' }, 400);
    }

    if (!validateMessages(body?.messages)) {
      return jsonResponse({ error: 'La conversación no tiene un formato válido.' }, 400);
    }

    const clientIp = request.headers.get('cf-connecting-ip');
    if (!clientIp) {
      return jsonResponse({ error: 'No se pudo validar la solicitud.' }, 400);
    }

    try {
      const { success } = await env.CHAT_LIMITER.limit({ key: clientIp });
      if (!success) {
        return jsonResponse({ error: 'Has enviado varias preguntas seguidas. Espera un minuto e inténtalo de nuevo.' }, 429);
      }
    } catch (error) {
      console.error('Chat rate limiter failed:', error);
      return jsonResponse({ error: 'La guía no está disponible por el momento. Intenta de nuevo más tarde.' }, 503);
    }

    try {
      const result = await env.AI.run(MODEL, {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...body.messages,
        ],
        max_tokens: 512,
      });
      const answer = getAssistantText(result);

      if (!answer) {
        console.error('Workers AI devolvió una respuesta vacía o con formato inesperado.', {
          resultKeys: result && typeof result === 'object' ? Object.keys(result) : [],
        });
        return jsonResponse({ error: 'La guía no pudo generar una respuesta. Intenta de nuevo.' }, 502);
      }

      return jsonResponse({ answer });
    } catch (error) {
      console.error('Workers AI request failed:', error);
      return jsonResponse({
        error: 'La guía no está disponible por el momento. Intenta de nuevo más tarde.',
      }, 502);
    }
  },
};
