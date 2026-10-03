function PlanSection({ currentUser, onSelectPlan }) {
  const plans = [
    {
      name: 'Plan Básico',
      price: '$120.000',
      description: '1 sesión de 60 minutos para revisar un punto específico del proyecto o tesis.',
      features: [
        'Sesión en vivo',
        'Feedback detallado',
        'Guía sobre metodología',
      ],
      button: 'Elegir Básico',
    },
    {
      name: 'Plan Avanzado',
      price: '$320.000',
      description: '3 sesiones de seguimiento para avanzar con tu investigación de forma estructurada.',
      features: [
        '3 sesiones de 60 min',
        'Revisión de avance',
        'Plan de trabajo personalizado',
      ],
      button: 'Elegir Avanzado',
    },
    {
      name: 'Plan Premium',
      price: '$520.000',
      description: '5 sesiones con acompañamiento integral para tu tesis, defensa o publicación.',
      features: [
        '5 sesiones de 60 min',
        'Correcciones y ajustes',
        'Previsión de defensa',
      ],
      button: 'Elegir Premium',
    },
  ];

  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Planes</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Elige el plan ideal para tu investigación</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Selecciona el plan que mejor se adapte a tu etapa y recibe acompañamiento experto en cada paso.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
              </div>
              <div className="rounded-3xl bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">{plan.price}</div>
            </div>
            <ul className="mb-6 space-y-3 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelectPlan(plan.name)}
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {plan.button}
            </button>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-brand-100 bg-brand-50 p-6 text-slate-700">
        <h3 className="text-lg font-semibold text-slate-900">Cómo sigue después de elegir un plan</h3>
        <ol className="mt-4 space-y-3 text-sm leading-7">
          <li>1. Revisa lo que incluye el plan y confirma tu elección.</li>
          <li>2. Completa la reserva con la fecha, hora y objetivo de la sesión.</li>
          <li>3. Continúa al pago para confirmar la mentoría.</li>
        </ol>
      </div>
    </section>
  );
}

export default PlanSection;
