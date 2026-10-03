import { useState } from 'react';
import { authenticate, setCurrentUser } from './utils/auth';

function LoginSection({ onLoginSuccess, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = authenticate(email, password);
    if (!user) {
      setError('Correo o contraseña inválidos.');
      return;
    }
    setError('');
    setCurrentUser(user);
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-16 px-4">
      <section className="w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-xl text-white">
        <div className="mb-8 sm:px-2">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Iniciar Sesión</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Bienvenido de nuevo</h2>
          <div className="mt-6 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {error && <p className="rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-slate-500"
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-slate-500"
              required
            />
          </div>
          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-300">
          ¿No tienes cuenta?{' '}
          <button type="button" onClick={onRegisterClick} className="font-semibold text-brand-300 hover:text-brand-200">
            Regístrate aquí
          </button>
        </div>
      </section>
    </div>
  );
}

export default LoginSection;
