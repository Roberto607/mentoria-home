function BlogSection() {
  const posts = [
    {
      title: '5 pasos para diseñar una investigación sólida',
      description: 'Aprende a estructurar tu trabajo científico desde la hipótesis hasta el análisis final.',
    },
    {
      title: 'Cómo presentar resultados con claridad',
      description: 'Consejos prácticos para comunicar tus hallazgos académicos como un profesional.',
    },
    {
      title: 'Errores comunes en tesis y cómo evitarlos',
      description: 'Descubre los fallos más habituales y cómo corregirlos antes de entregar tu proyecto.',
    },
  ];

  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Blog</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Artículos y consejos para investigadores</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Lee publicaciones, tutoriales y recomendaciones para mejorar tus proyectos académicos.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{post.description}</p>
              </div>
              <button className="rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                Leer artículo
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
