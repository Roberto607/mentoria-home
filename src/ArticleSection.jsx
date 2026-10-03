function ArticleSection() {
  const articles = [
    {
      title: 'Cómo Formular una Hipótesis',
      description: 'Una guía paso a paso para crear una hipótesis sólida.',
    },
    {
      title: 'Análisis Estadístico en la Investigación',
      description: 'Métodos estadísticos clave y cómo aplicarlos.',
    },
    {
      title: 'Guía para Entrevistas Cualitativas',
      description: 'Consejos para realizar entrevistas efectivas.',
    },
    {
      title: 'Revisión Bibliográfica Efectiva',
      description: 'Cómo realizar una revisión bibliográfica adecuada.',
    },
  ];

  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="mb-8 rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-soft sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight">Mis Artículos Publicados</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Consulta mis guías y recursos para avanzar en tu investigación científica.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.title} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{article.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{article.description}</p>
            </div>
            <button className="mt-3 inline-flex shrink-0 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 sm:mt-0">
              Leer Artículo
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="rounded-full bg-brand-700 px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800">
          Descargar PDF de Mis Publicaciones
        </button>
      </div>
    </section>
  );
}

export default ArticleSection;
