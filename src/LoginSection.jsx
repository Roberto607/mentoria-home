import { useState } from 'react';
import { authenticate, setCurrentUser } from './utils/auth';
import mentorPhoto from '../static/Mentor.png';

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
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#176bc1] px-4 py-8 sm:px-8 lg:justify-start lg:px-[6vw]">
      <img
        src={mentorPhoto}
        alt="Dr. Juan Celestino, mentor en investigación científica"
        className="fixed inset-0 -z-20 h-full w-full object-contain object-center"
      />
      <div className="fixed inset-0 -z-10 bg-slate-950/5" />

      <section className="w-full max-w-xl rounded-[28px] bg-white/95 px-6 py-8 shadow-2xl shadow-slate-950/15 backdrop-blur-sm sm:px-10 sm:py-10 lg:px-10 xl:px-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Iniciar Sesión</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Bienvenido de nuevo</h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-brand-500" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="******"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              required
            />
          </div>
          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿No tienes cuenta?{' '}
          <button type="button" onClick={onRegisterClick} className="font-semibold text-brand-600 hover:text-brand-700">
            Regístrate aquí
          </button>
        </div>
      </section>
    </div>
  );
}

export default LoginSection;
