import React, { useState } from 'react';

const menuItems = [
  { label: 'Panel Principal', icon: '🏠', key: 'principal' },
  { label: 'Especialidades', icon: '🧪', key: 'especialidades' },
  { label: 'Módulos', icon: '📘', key: 'modulos' },
  { label: 'Actividades', icon: '📝', key: 'actividades' },
  { label: 'Materiales', icon: '📁', key: 'materiales' },
  { label: 'Sesiones', icon: '📅', key: 'sesiones' },
  { label: 'Retroalimentación', icon: '💬', key: 'retroalimentacion' },
  { label: 'Estadísticos', icon: '📊', key: 'estadisticos' },
  { label: 'Configuración', icon: '⚙️', key: 'configuracion' },
];

export default function MentorPanel({ currentUser, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('principal');
  const [open, setOpen] = useState(false);

  const sidebarClasses = `fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-brand-900 to-slate-950 text-white p-3 flex flex-col overflow-hidden transform transition-transform duration-200 z-50 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-56 lg:flex lg:flex-col lg:justify-between lg:px-4 lg:py-6 lg:border-r lg:border-white/10`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Mobile hamburger button */}
      <button
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/90 text-slate-900 shadow-md"
      >
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="lg:flex">
        <aside className={sidebarClasses}>
          {/* Close button for mobile */}
          <button aria-label="Cerrar" onClick={() => setOpen(false)} className="lg:hidden absolute top-2 right-2 text-white/90 p-2">
            ✕
          </button>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-200 mx-auto">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-3xl font-semibold text-slate-900">
                    {currentUser?.name?.[0] || 'M'}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 text-center">
              <h2 className="mt-2 text-xl font-semibold text-white">{currentUser?.name || 'Dr. Hernandez'}</h2>
              <p className="mt-1 text-xs text-white/70">{currentUser?.role || 'Mentor Científico'}</p>
            </div>

          </div>

          <nav className="mt-6 pr-1 overflow-y-auto no-scrollbar max-h-[60vh] lg:flex lg:flex-col lg:flex-1 lg:max-h-none">
            <ul className="flex flex-col gap-1 lg:gap-3 lg:flex-1 lg:justify-between lg:py-4">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setActiveMenu(item.key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-3 lg:px-4 lg:py-3 text-left text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${activeMenu === item.key ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="lg:text-base">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
       
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-md bg-white text-brand-700 px-3 py-3 text-sm font-semibold transition hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
          </aside>

          {/* Overlay for mobile when sidebar is open */}
          {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />}

        <main className="flex-1 px-4 sm:px-6 md:px-8 pt-16 pb-6 sm:pt-16 lg:px-8 lg:pl-64 lg:pr-8">
          <div className="mx-auto max-w-[1480px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
              
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">Panel Principal</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-400">Controla tus especialidades, módulos, actividades y sesiones desde un solo lugar.</p>
              </div>
            
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Especialidades del Mentor</h2>
                      <p className="mt-2 text-sm text-slate-600">Áreas en las que ofrece mentoría directa.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Agregar
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />Metodología de Investigación</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />Redacción Científica</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />Estadística Aplicada</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />Elaboración de Tesis</li>
                  </ul>
                </section>

                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Actividades Creadas</h2>
                      <p className="mt-2 text-sm text-slate-600">Tareas actuales y próximas entregas.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Nueva
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Lectura: Capítulo 5</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Ejercicio de Estadística</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Entrega: Informe Final</li>
                  </ul>
                </section>

                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Sesiones Programadas</h2>
                      <p className="mt-2 text-sm text-slate-600">Próximas reuniones y temas clave.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Ver
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Videoconferencia: 10 Mayo 2024, 9:00 AM</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Tema: Análisis de Resultados</li>
                  </ul>
                </section>
              </div>

              <div className="grid gap-4">
                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Módulos de Enseñanza</h2>
                      <p className="mt-2 text-sm text-slate-600">Contenido estructurado por etapas.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Crear
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Módulo 1: Introducción</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Módulo 2: Análisis de Datos</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Módulo 3: Preparación de Defensa</li>
                  </ul>
                </section>

                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Materiales Educativos</h2>
                      <p className="mt-2 text-sm text-slate-600">Recursos listos para compartir.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Subir
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Manual de Investigación PDF</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Video Tutorial</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Plantillas de Tesis</li>
                  </ul>
                </section>

                <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Retroalimentación Enviada</h2>
                      <p className="mt-2 text-sm text-slate-600">Comentarios recientes.</p>
                    </div>
                    <button className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-900 transition hover:bg-slate-300">
                      Ver
                    </button>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Revisión de Informe de Experimento</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Comentario: Ajustar las conclusiones</li>
                    <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-200" />Retroalimentación enviada a Carlos M.</li>
                  </ul>
                </section>

                <div className="grid gap-4 xl:grid-cols-2">
                  <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Usuarios Activos</p>
                    <div className="mt-4 flex items-end gap-3">
                      <p className="text-5xl font-bold text-slate-900">25</p>
                      <span className="text-sm text-slate-400">Usuarios Activos</span>
                    </div>
                  </section>

                  <section className="rounded-[32px] border border-slate-200/60 bg-white p-6 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Progreso General</p>
                    <div className="mt-5 overflow-hidden rounded-full bg-slate-200 p-1">
                      <div className="h-3 rounded-full bg-sky-500" style={{ width: '75%' }} />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
                      <span>Progreso Promedio</span>
                      <span className="font-semibold text-slate-900">75%</span>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
