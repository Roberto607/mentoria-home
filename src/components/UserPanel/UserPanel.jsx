import React, { useState } from 'react';
import ProfileEditor from './ProfileEditor';

function SidebarItem({ icon, children, onClick }) {
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick();
        }}
        className="flex items-center gap-3 px-2 py-2 text-xs font-medium text-white hover:bg-white/10 hover:text-white rounded-md w-full lg:py-4 lg:text-base lg:px-3 lg:flex-1 lg:justify-start transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <span className="text-xl w-6 text-center lg:text-2xl">{icon}</span>
        <span>{children}</span>
      </a>
    </li>
  );
}

export default function UserPanel({ currentUser, onLogout, onNavigate, onSaveUser }) {
  const [open, setOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const sidebarClasses = `fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-brand-700 to-slate-900 text-white p-3 flex flex-col overflow-hidden transform transition-transform duration-200 z-50 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-56 lg:flex lg:flex-col lg:justify-between lg:px-4 lg:py-6 lg:border-r lg:border-white/10`;

  const handleProfileSave = (updatedUser) => {
    if (onSaveUser) onSaveUser(updatedUser);
    setIsEditingProfile(false);
    setOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
    setOpen(false);
  };

  return (
    <div className="min-h-screen w-full">
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

      {/* Sidebar (responsive) */}
      <aside className={sidebarClasses}>
        {/* Close button for mobile (absolute) */}
        <button aria-label="Cerrar" onClick={() => setOpen(false)} className="lg:hidden absolute top-2 right-2 text-white/90 p-2">
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="h-20 w-20 flex-shrink-0 rounded-full border-2 border-white overflow-hidden">
            {currentUser && currentUser.avatar ? (
              <img src={currentUser.avatar} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-white/10 text-2xl font-semibold">{currentUser ? currentUser.name?.[0] : 'U'}</div>
            )}
          </div>
          <div>
            <div className="text-base font-semibold">{currentUser ? currentUser.name : 'Usuario'}</div>
            {currentUser?.role && <div className="text-[11px] opacity-85">{currentUser.role}</div>}
            {currentUser?.plan && (
              <>
                <div className="mt-2 text-[11px]">Plan: {currentUser.plan}</div>
                <div className="mt-1 h-2 w-36 rounded-full bg-white/20">
                  <div className="h-2 rounded-full bg-white" style={{ width: currentUser.progress ? `${currentUser.progress}%` : '0%' }} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleEditProfileClick} className="w-full rounded-md bg-white text-brand-700 px-2 py-2 text-sm font-semibold">Editar Perfil</button>
        </div>

        <nav className="mt-5 pr-1 overflow-y-auto no-scrollbar max-h-[60vh] lg:flex lg:flex-col lg:flex-1 lg:max-h-none">
          <ul className="flex flex-col gap-1 lg:gap-3 lg:flex-1 lg:justify-between lg:py-4">
            <SidebarItem icon="🏠" onClick={() => onNavigate && onNavigate('dashboard')}>Inicio</SidebarItem>
            <SidebarItem icon="📚">Actividades</SidebarItem>
            <SidebarItem icon="🎥">Videoconferencias</SidebarItem>
            <SidebarItem icon="🧾">Recursos</SidebarItem>
            <SidebarItem icon="💬">Retroalimentación</SidebarItem>
          </ul>
        </nav>

        <div className="px-2">
          <button onClick={() => { onLogout && onLogout(); setOpen(false); }} className="w-full rounded-md bg-white text-brand-700 px-2 py-2 text-sm font-semibold">Cerrar sesión</button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />}

      {/* Main area shifted right to accommodate fixed sidebar on large screens */}
      <main className="p-6 sm:px-6 md:px-8 lg:pl-64 lg:pr-8 space-y-6">
        <section className="mx-auto max-w-7xl lg:max-w-none">
          {!isEditingProfile && (
            <header className="pt-2">
              <h1 className="text-2xl font-bold">Bienvenido, {currentUser ? currentUser.name : 'Usuario'}!</h1>
              {currentUser?.plan && (
                <div className="mt-2 text-sm text-slate-600">
                  Plan Actual: {currentUser.plan}
                  {currentUser?.progress ? ` | Progreso: ${currentUser.progress}% completado.` : ''}
                </div>
              )}
            </header>
          )}

          {isEditingProfile ? (
            <ProfileEditor
              currentUser={currentUser}
              onSave={handleProfileSave}
              onCancel={() => setIsEditingProfile(false)}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-md p-4 shadow-sm border border-slate-100">
                <h4 className="font-semibold">Próxima Sesión</h4>
                <p className="mt-2 text-sm text-slate-600">Sesión con el Mentor — 25 Abril 2026, 10:00 AM</p>
                <button className="mt-4 rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white">
                  Unirse a la Sesión
                </button>
              </div>

              <div className="bg-white rounded-md p-4 shadow-sm border border-slate-100">
                <h4 className="font-semibold">Mis Actividades</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>Lectura: Capítulo 5</li>
                  <li>Entrega: Informe de Experimento (28 Abril)</li>
                  <li>Test: Cuestionario de Análisis</li>
                </ul>
              </div>

              <div className="bg-white rounded-md p-4 shadow-sm border border-slate-100">
                <h4 className="font-semibold">Mis Materiales</h4>
                <div className="mt-3 flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded bg-brand-100"></div>
                    <div className="text-xs mt-2">Videos</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded bg-yellow-200"></div>
                    <div className="text-xs mt-2">Lecturas</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded bg-slate-200"></div>
                    <div className="text-xs mt-2">Descargas</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
