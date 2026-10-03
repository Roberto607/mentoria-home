function AboutSection() {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-brand-50 px-6 py-7 shadow-sm sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-700">Sobre Mí</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Hola, soy Juan Celestino</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Mentor científico con experiencia en investigación, divulgación y acompañamiento académico. Ayudo a estudiantes y profesionales a mejorar sus proyectos con mentorías personalizadas y guías prácticas.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Mi formación</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Soy experto en investigación científica, metodologías cualitativas y cuantitativas, con experiencia en asesoría de tesis y trabajos académicos.
          </p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Qué ofrezco</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mentorías, revisión de proyectos, seguimiento de avances y apoyo en publicación de artículos científicos.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Mi enfoque</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Trabajo con claridad, empatía y resultados prácticos para que cada estudiante avance con confianza en su investigación.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
