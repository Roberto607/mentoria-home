function MentoriaSection() {
  const mentorias = [
    {
      title: 'Sesiones 1 a 1',
      description: 'Mentoría individual para resolver dudas, mejorar tu investigación y avanzar con seguridad.',
      icon: '🧠',
    },
    {
      title: 'Revisión de Proyecto',
      description: 'Feedback puntual en tu tesis, artículo o trabajo de investigación con recomendaciones claras.',
      icon: '📄',
    },
    {
      title: 'Plan de Estudio Científico',
      description: 'Ruta personalizada para que avances rápido, desde hipótesis hasta publicación.',
      icon: '🚀',
    },
  ];

  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Mentorías</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Aprende con apoyo experto</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Acelera tus resultados con mentorías diseñadas para investigadores, estudiantes y profesionales.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {mentorias.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Antes de agendar</h3>
            <p className="mt-3 text-sm text-slate-600">
              Completa los datos siguientes para reservar tu sesión de mentoría con fecha, hora y objetivo claros.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>✔ Nombre completo</li>
              <li>✔ Correo electrónico</li>
              <li>✔ Fecha y hora</li>
              <li>✔ Tema y objetivo</li>
              <li>✔ Adjuntar documento si lo deseas</li>
            </ul>
          </div>
        </div>

        <form className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Nombre completo</label>
            <input type="text" placeholder="Tu nombre" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Correo electrónico</label>
            <input type="email" placeholder="Tu correo" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Teléfono (opcional)</label>
            <input type="tel" placeholder="+57 300 123 4567" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Fecha preferida</label>
              <input type="date" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Hora preferida</label>
              <input type="time" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Duración de la sesión</label>
            <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100">
              <option>30 min</option>
              <option>1 hora</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Tema de la mentoría</label>
            <textarea rows="3" placeholder="¿Qué necesitas? ¿Qué problema quieres resolver?" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"></textarea>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Objetivo de la sesión</label>
            <textarea rows="3" placeholder="Ej. Revisión de marco teórico, corrección de metodología, preparación para defensa" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"></textarea>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Adjuntar archivo (opcional)</label>
            <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">Método de videollamada</label>
            <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100">
              <option>Zoom</option>
              <option>Google Meet</option>
              <option>Videollamada interna</option>
            </select>
          </div>

     

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
            Confirmar Mentoría
          </button>
        </form>
      </div>
    </section>
  );
}

export default MentoriaSection;
