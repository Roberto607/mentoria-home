import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from './utils/contact';

function ContactSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      'Hola, quiero consultar por una mentoría.',
      `Nombre: ${formData.get('name')}`,
      `Correo: ${formData.get('email')}`,
      `Mensaje: ${formData.get('message')}`,
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Contacto</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Vamos a conversar</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Escríbeme para agendar una asesoría, resolver dudas o recibir apoyo en tu proyecto de investigación.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Información</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-900">Email:</span> asesoriasyesitprotocolos@gmail.com</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="block transition hover:text-brand-700"><span className="font-semibold text-slate-900">WhatsApp:</span> {WHATSAPP_DISPLAY}</a>
            <p className="text-slate-600">Respondo rápidamente para coordinar mentorías, conferencias y revisiones académicas.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-slate-900">Nombre</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Tu nombre" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-slate-900">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="Tu correo" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-slate-900">Mensaje</label>
            <textarea id="contact-message" name="message" rows="4" required placeholder="Cuéntame sobre tu proyecto" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"></textarea>
          </div>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
            Continuar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
