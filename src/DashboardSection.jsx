function DashboardSection({ currentUser, pendingPlan, onProceedToPlans, onLogout }) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Panel de Estudio</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Hola, {currentUser.name}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Bienvenido a tu espacio personal. Aquí puedes continuar con la compra de tu plan y acceder a tu panel de estudio.
        </p>
      </div>

      {pendingPlan ? (
        <div className="mb-6 rounded-[28px] border border-brand-100 bg-brand-50 p-6 text-slate-700">
          <p className="font-semibold text-slate-900">Plan seleccionado:</p>
          <p className="mt-2 text-sm">Has elegido <span className="font-semibold text-brand-700">{pendingPlan}</span>.</p>
          <p className="mt-2 text-sm text-slate-600">Continúa al pago o revisa los detalles del plan para confirmar tu reserva.</p>
        </div>
      ) : (
        <div className="mb-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-slate-700">
          <p className="font-semibold text-slate-900">Aún no has seleccionado un plan.</p>
          <p className="mt-2 text-sm text-slate-600">Explora los planes y selecciona el que mejor se ajuste a tus necesidades.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={onProceedToPlans} className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
          Ver Planes
        </button>
        <button onClick={onLogout} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}

export default DashboardSection;
