import React, { useState } from 'react';

export default function ProfileEditor({ currentUser, onSave, onCancel }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [role, setRole] = useState(currentUser?.role || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const handleAvatarFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onSave({
      ...currentUser,
      name: name.trim(),
      role: role.trim(),
      avatar: avatar,
    });
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Actualiza tu información</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">Asegúrate de que tus datos sean correctos y tu imagen sea la más reciente.</p>
        </div>

        <label className="relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-100 shadow-inner ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-brand-300">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-4xl font-semibold text-slate-700">
              {name?.[0] || 'U'}
            </div>
          )}
          <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarFile} />
          <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-700/20 transition hover:bg-brand-800">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h7" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Información básica</p>
            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Nombre</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre completo"
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Cargo / Rol</span>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ej. Mentor científico"
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Contacto y avatar</p>
            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Correo electrónico</span>
                <input
                  value={currentUser?.email || ''}
                  readOnly
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">URL del avatar</span>
                <input
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
                <p className="mt-2 text-xs text-slate-500">También puedes pegar una URL si prefieres no subir una imagen.</p>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-3xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
