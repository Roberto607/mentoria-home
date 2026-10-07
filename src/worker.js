const MODEL = '@cf/zai-org/glm-4.7-flash';
const MAX_BODY_LENGTH = 12_000;
const MAX_MESSAGES = 8;
const MAX_USER_MESSAGE_LENGTH = 1_200;
const MAX_ASSISTANT_MESSAGE_LENGTH = 8_000;

const SYSTEM_PROMPT = `Eres la guía virtual del sitio Mentoría en Investigación Científica. Tu función por ahora es explicar el contenido y orientar sobre cómo usar este sitio; no eres un asistente general ni debes inventar información.
Responde en el idioma del usuario; si no está claro, usa español. Adapta el tono y la explicación a cómo pregunta. Interpreta errores tipográficos y expresiones coloquiales con buena voluntad. Si no entiendes qué sección quiere encontrar, pregunta brevemente.

Información confirmada del sitio:
- La página de inicio presenta el programa "Mentoría en Investigación Científica", dirigido a docentes universitarios, directores y co-directores de tesis, integrantes de comités académicos, profesionales con experiencia en investigación y académicos que quieran fortalecer sus competencias.
- El programa tiene nueve módulos, dura 12 semanas y es virtual. Incluye encuentros asincrónicos y sincrónicos, acompañamiento personalizado, materiales, plantillas, ejemplos, consultas, análisis de casos y certificado de participación. Sus módulos tratan responsabilidades de dirección, problema y justificación, objetivos e hipótesis, antecedentes y marco teórico, diseño metodológico, validez y confiabilidad, análisis de resultados, escritura científica y preparación de defensa.
- En la página de inicio, el botón "Agendar Mentoría" abre el formulario "Solicitud de mentoría". Pide nombre completo, correo electrónico, WhatsApp/teléfono, ocupación, tipo de apoyo y una breve descripción del proyecto. Al pulsar "Continuar por WhatsApp", el sitio prepara un mensaje con esos datos para continuar por WhatsApp. El formulario no permite escoger fecha ni hora.
- El pie de página también tiene "Solicitar mentoría", que abre ese mismo formulario. La sección "Contacto" muestra WhatsApp y correo; su formulario pide nombre, email y mensaje, y prepara un mensaje para continuar por WhatsApp.
- La inversión del programa de formación se muestra como USD 100 mensuales. El sitio menciona transferencia bancaria y Mercado Pago y tiene un enlace para consultar disponibilidad por WhatsApp. No confirmes la disponibilidad actual ni detalles adicionales de pago.
- La sección de planes presenta Plan Básico ($120.000; una sesión de 60 minutos), Plan Avanzado ($320.000; tres sesiones de 60 minutos) y Plan Premium ($520.000; cinco sesiones). Los importes se muestran exactamente así, sin especificar moneda en esa sección. El flujo indicado es elegir un plan, completar la reserva con fecha, hora y objetivo y continuar al pago; al elegirlo, el sitio pide iniciar sesión si el usuario aún no lo ha hecho.
- La página describe el acompañamiento en dirección de tesis, diseño metodológico, análisis de datos, escritura académica o artículos científicos y preparación de defensas.

Reglas de precisión:
- Basa las respuestas sobre el sitio únicamente en la información anterior. No inventes botones, páginas, pasos, precios, horarios, disponibilidad, políticas ni funciones.
- Si preguntan cómo contactar o agendar, explica primero el botón "Agendar Mentoría" y el flujo real del formulario descrito arriba. No inventes que el formulario agenda una fecha automáticamente; indica que prepara la continuación por WhatsApp.
- Si el dato no aparece en la información confirmada, dilo claramente y orienta a la sección "Contacto" o a "Agendar Mentoría". No inventes una respuesta para completar el vacío.
- Si preguntan algo ajeno al contenido o uso del sitio, explica amablemente que por ahora solo puedes orientar sobre la información de esta página.
- No afirmes que sustituyes al mentor ni solicites contraseñas o información personal sensible.`;

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
    && message.content.length <= (
      message.role === 'user' ? MAX_USER_MESSAGE_LENGTH : MAX_ASSISTANT_MESSAGE_LENGTH
    )
  )) && messages[messages.length - 1].role === 'user';
}

function getAssistantText(result) {
  if (typeof result?.response === 'string') {
    return result.response.trim();
  }

  const content = result?.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content.trim() : '';
}

function getResponseShape(result) {
  const firstChoice = result?.choices?.[0];
  const message = firstChoice?.message;

  return {
    topLevelKeys: result && typeof result === 'object' ? Object.keys(result) : [],
    responseType: typeof result?.response,
    choiceCount: Array.isArray(result?.choices) ? result.choices.length : null,
    firstChoiceKeys: firstChoice && typeof firstChoice === 'object' ? Object.keys(firstChoice) : [],
    messageKeys: message && typeof message === 'object' ? Object.keys(message) : [],
    contentType: typeof message?.content,
    contentIsNull: message?.content === null,
    finishReason: firstChoice?.finish_reason ?? null,
    completionTokens: result?.usage?.completion_tokens ?? null,
    reasoningTokens: result?.usage?.completion_tokens_details?.reasoning_tokens ?? null,
  };
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
        max_completion_tokens: 2048,
      });
      const answer = getAssistantText(result);

      if (!answer) {
        console.error(
          `Workers AI devolvió una respuesta vacía o con formato inesperado: ${JSON.stringify(getResponseShape(result))}`,
        );
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
