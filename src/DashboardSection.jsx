function DashboardSection({ currentUser, onRequestMentorship, onLogout }) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Programa de mentoría</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Hola, {currentUser.name}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          El programa de acompañamiento en investigación tiene una duración de 12 semanas e incluye 9 módulos formativos.
        </p>
      </div>

      <div className="mb-6 rounded-[28px] border border-brand-100 bg-brand-50 p-6 text-slate-700">
        <p className="font-semibold text-slate-900">Programa de 12 semanas</p>
        <p className="mt-2 text-sm text-slate-600">
          Revisa el contenido completo del programa y la inversión antes de iniciar el pago.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={onRequestMentorship} className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
          Ver programa y pago
        </button>
        <button onClick={onLogout} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}

export default DashboardSection;
