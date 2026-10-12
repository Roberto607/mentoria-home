import { useState } from 'react';
import { addUser, setCurrentUser, findUserByEmail } from './utils/auth';
import mentorPhoto from '../static/Mentor.png';

function RegisterSection({ onRegisterSuccess, onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setSuccess('');
      return;
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      setError('Este correo ya está registrado.');
      setSuccess('');
      return;
    }

    const newUser = { name, email, password };
    addUser(newUser);
    setCurrentUser(newUser);
    setError('');
    setSuccess('Registro exitoso. Redireccionando al panel...');
    onRegisterSuccess(newUser);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-slate-900/20 lg:min-h-[700px] lg:grid-cols-2">
        <div className="relative min-h-48 overflow-hidden bg-slate-900 sm:min-h-64 lg:min-h-full">
          <img src={mentorPhoto} alt="Dr. Juan Celestino, mentor en investigación científica" className="absolute inset-0 h-full w-full object-cover object-[55%_20%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-slate-950/10 lg:via-slate-950/25 lg:to-slate-950/75" />
          <div className="absolute inset-x-6 bottom-5 text-white sm:inset-x-8 sm:bottom-7 lg:inset-x-10 lg:bottom-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200 sm:text-sm">Mentoría en investigación científica</p>
            <h1 className="mt-2 max-w-lg text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">Acompañamiento para llevar tu proyecto más lejos.</h1>
          </div>
        </div>

        <section className="flex items-center justify-center bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Crear cuenta</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Crea tu cuenta</h2>
              <div className="mt-6 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && <p className="rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
              {success && <p className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{success}</p>}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="******"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Confirmar contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  required
                />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Crear cuenta
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-300">
              ¿Ya tienes cuenta?{' '}
              <button type="button" onClick={onLoginClick} className="font-semibold text-brand-300 hover:text-brand-200">
                Inicia sesión
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegisterSection;
