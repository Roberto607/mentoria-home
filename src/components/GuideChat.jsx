import { useEffect, useRef, useState } from 'react';

const initialMessage = {
  role: 'assistant',
  content: '¡Hola! Puedo orientarte sobre investigación, tesis y los servicios de mentoría. ¿Qué necesitas saber?',
};

function GuideChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      conversationRef.current?.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || loading) return;

    const history = messages.filter((_, index) => index > 0);
    const nextMessages = [...history, { role: 'user', content }];
    const conversation = nextMessages.slice(-8);
    setMessages([initialMessage, ...conversation]);
    setDraft('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: conversation.slice(1) }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'No se pudo obtener una respuesta. Intenta de nuevo.');
        return;
      }

      setMessages([initialMessage, ...conversation, { role: 'assistant', content: result.answer }].slice(-9));
    } catch (requestError) {
      console.error('No se pudo conectar con la guía virtual:', requestError);
      setError('No se pudo conectar con la guía. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-labelledby="guide-chat-title"
          className="mb-3 flex h-[calc(100dvh-7rem)] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between gap-4 bg-[#0b3760] px-5 py-4 text-white">
            <div>
              <h2 id="guide-chat-title" className="font-semibold">Guía de investigación</h2>
              <p className="mt-1 text-xs text-blue-100">Asistente virtual · respuestas con IA</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar guía virtual"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div ref={conversationRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'ml-auto rounded-br-md bg-brand-700 text-white'
                    : 'mr-auto rounded-bl-md border border-slate-200 bg-white text-slate-800'
                }`}
              >
                {message.content}
              </p>
            ))}
            {loading && (
              <p role="status" className="mr-auto rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                La guía está preparando una respuesta…
              </p>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
            <form onSubmit={sendMessage} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="guide-chat-input">Escribe tu pregunta</label>
              <textarea
                ref={inputRef}
                id="guide-chat-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form.requestSubmit();
                  }
                }}
                maxLength={1200}
                rows={2}
                placeholder="Escribe tu pregunta…"
                disabled={loading}
                className="min-h-11 min-w-0 flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={loading || !draft.trim()}
                aria-label="Enviar pregunta"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 14-7-4 14-3-6-7-1Zm7 1 7-8" />
                </svg>
              </button>
            </form>
            <p className="mt-2 text-[11px] leading-4 text-slate-500">La IA puede equivocarse. No compartas datos personales sensibles.</p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="guide-chat-title"
        className="ml-auto flex min-h-12 items-center gap-2 rounded-full bg-brand-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-8 6 1.7-3.4A8 8 0 1 1 20 14.5L21 19l-4.5-1A8 8 0 0 1 5 20Z" />
        </svg>
        {open ? 'Cerrar guía' : 'Guía IA'}
      </button>
    </div>
  );
}

export default GuideChat;
