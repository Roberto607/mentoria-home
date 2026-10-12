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
    <div className="relative isolate flex min-h-screen items-center justify-center bg-blue-50 px-4 py-6 lg:justify-start lg:bg-[#176bc1] lg:px-[6vw] lg:py-8">
      <img
        src={mentorPhoto}
        alt="Dr. Juan Celestino, mentor en investigación científica"
        className="fixed inset-0 -z-20 hidden h-full w-full object-cover object-center lg:block"
      />
      <div className="fixed inset-0 -z-10 hidden bg-slate-950/5 lg:block" />
      <section className="auth-form-enter relative z-10 w-full max-w-xl rounded-[28px] bg-white px-6 py-8 shadow-2xl shadow-slate-950/10 sm:px-10 sm:py-10 lg:bg-white/95 lg:backdrop-blur-sm xl:px-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Crear cuenta</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Crea tu cuenta</h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-brand-500" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          {success && <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p>}
          <div className="auth-field-enter">
            <label className="mb-2 block text-sm font-semibold text-slate-800">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre completo"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              required
            />
          </div>
          <div className="auth-field-enter" style={{ animationDelay: '75ms' }}>
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
          <div className="auth-field-enter" style={{ animationDelay: '150ms' }}>
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
          <div className="auth-field-enter" style={{ animationDelay: '225ms' }}>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repite la contraseña"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              required
            />
          </div>
          <button type="submit" className="auth-field-enter inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700" style={{ animationDelay: '300ms' }}>
            Crear cuenta
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{' '}
          <button type="button" onClick={onLoginClick} className="font-semibold text-brand-600 hover:text-brand-700">
            Inicia sesión
          </button>
        </div>
      </section>
    </div>
  );
}

export default RegisterSection;
