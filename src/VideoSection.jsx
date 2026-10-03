import mentorPhoto from '../static/Mentor.png';
import robotImage from '../static/Robot.webp';
import cirugiaImage from '../static/Cirugia.jpg';

function VideoSection({ onBack }) {
  return (
    <section id="videos-section" className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-soft">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 text-white shadow-soft">
        <div className="border-b border-white/10 bg-slate-900 px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-brand-300">Videos Educativos</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Aprende con guías paso a paso</h2>
            </div>
            <button type="button" onClick={onBack} className="rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
              Volver al inicio
            </button>
          </div>
        </div>
        <div className="grid gap-4 p-6 lg:grid-cols-3">
          <article className="overflow-hidden rounded-[28px] bg-white text-slate-900 shadow-soft">
            <div className="h-44 bg-slate-100">
              <img
                src={mentorPhoto}
                alt="Plantilla de Tesis"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-lg font-semibold">Plantilla de Tesis</h3>
              <p className="text-sm text-slate-600">Descubre cómo estructurar tu marco teórico y contenidos clave.</p>
              <button className="mt-5 w-full rounded-2xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                Ver Video
              </button>
            </div>
          </article>
          <article className="overflow-hidden rounded-[28px] bg-white text-slate-900 shadow-soft">
            <div className="h-44 bg-slate-100">
              <img
                src={robotImage}
                alt="Guía de Análisis Estadístico"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-lg font-semibold">Guía de Análisis Estadístico</h3>
              <p className="text-sm text-slate-600">Aprende a interpretar resultados y presentar datos profesionales.</p>
              <button className="mt-5 w-full rounded-2xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                Ver Video
              </button>
            </div>
          </article>
          <article className="overflow-hidden rounded-[28px] bg-white text-slate-900 shadow-soft">
            <div className="h-44 bg-slate-100">
              <img
                src={cirugiaImage}
                alt="Ejemplo de Marco Teórico"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-lg font-semibold">Ejemplo de Marco Teórico</h3>
              <p className="text-sm text-slate-600">Ve un ejemplo real y aprende a redactar tu propio marco teórico.</p>
              <button className="mt-5 w-full rounded-2xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">
                Ver Video
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
