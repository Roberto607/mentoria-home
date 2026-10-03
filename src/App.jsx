import { useEffect, useState } from 'react';
import { getCurrentUser, logout as authLogout, updateUser as authUpdateUser } from './utils/auth';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from './utils/contact';
import mentorPhoto from '../static/Mentor.png';
import researcherPhoto from '../static/estudiante 2.jpg';
import ArticleSection from './ArticleSection';
import PlanSection from './PlanSection';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';
import DashboardSection from './DashboardSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import BlogSection from './BlogSection';
import UserPanel from './components/UserPanel/UserPanel';
import MentorPanel from './components/MentorPanel/MentorPanel';
// ProfileSection removed — profile components cleaned up

const courseModules = [
  ['Funciones y responsabilidades del director', 'Delimita el alcance del acompañamiento y las responsabilidades durante el proceso.'],
  ['Evaluación del título, problema y justificación', 'Conecta el tema, la pregunta central y las razones que justifican el estudio.'],
  ['Objetivos, hipótesis y variables', 'Comprueba que los objetivos y las variables se relacionen con el problema planteado.'],
  ['Orientación de antecedentes y marco teórico', 'Organiza antecedentes relevantes y una base conceptual coherente.'],
  ['Evaluación del diseño metodológico', 'Revisa la correspondencia entre objetivos, método y técnicas de investigación.'],
  ['Diseño, validez y confiabilidad', 'Considera criterios de rigor y consistencia en las decisiones metodológicas.'],
  ['Resultados y análisis estadístico', 'Orienta la lectura de resultados y su relación con las preguntas de investigación.'],
  ['Discusión, conclusiones y escritura científica', 'Acompaña la interpretación de hallazgos y la comunicación académica.'],
  ['Devolución y preparación de la defensa', 'Planifica una devolución constructiva y prepara la presentación del trabajo.'],
];

function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [pendingPlan, setPendingPlan] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCourseSection, setActiveCourseSection] = useState('course-audience');
  const [courseTarget, setCourseTarget] = useState(null);
  const [expandedModule, setExpandedModule] = useState(1);

  useEffect(() => {
    if (view !== 'home' && view !== 'program') return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    const items = document.querySelectorAll('.reveal-on-scroll');
    items.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, [view]);

  useEffect(() => {
    if (!bookingOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setBookingOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [bookingOpen]);

  useEffect(() => {
    if (view !== 'home' || !courseTarget) return;
    document.getElementById(courseTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCourseTarget(null);
  }, [view, courseTarget]);

  const courseSections = [
    ['course-audience', 'Dirigido a'],
    ['course-outcomes', 'Qué lograrás'],
    ['course-curriculum', 'Programa académico'],
    ['course-benefits', 'Modalidad y beneficios'],
    ['course-investment', 'Inversión'],
    ['course-contact', 'Contacto'],
  ];

  const navigateToCourseSection = (sectionId) => {
    setActiveCourseSection(sectionId);
    setCourseTarget(sectionId);
    setExpandedModule(1);
    setView('home');
  };

  const moveCourseSection = (direction) => {
    const currentIndex = courseSections.findIndex(([sectionId]) => sectionId === activeCourseSection);
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), courseSections.length - 1);
    navigateToCourseSection(courseSections[nextIndex][0]);
  };

  const pageBg = (view === 'login' || view === 'register')
    ? 'bg-slate-50'
    : 'bg-[radial-gradient(circle_at_top,_#e7f0ff_0%,_#dae4f6_35%,_#f2f7ff_100%)]';

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setView('userpanel');
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    setView('userpanel');
  };

  const handleLogout = () => {
    authLogout();
    setCurrentUser(null);
    setPendingPlan(null);
    setView('home');
  };

  const handleSaveUser = (user) => {
    authUpdateUser(user);
    setCurrentUser(user);
  };

  const handleSelectPlan = (planName) => {
    setPendingPlan(planName);
    if (!currentUser) {
      setView('login');
      return;
    }
    setView('dashboard');
  };

  const handleProceedToPlans = () => {
    setView('plans');
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      'Hola, quiero solicitar una mentoría.',
      `Nombre: ${formData.get('name')}`,
      `Correo: ${formData.get('email')}`,
      `WhatsApp: ${formData.get('phone')}`,
      `Ocupación: ${formData.get('occupation')}`,
      `Apoyo que necesito: ${formData.get('service')}`,
      `Sobre mi proyecto: ${formData.get('project')}`,
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setBookingOpen(false);
  };

  return (
    <div className={`min-h-screen ${pageBg} text-slate-900`}>
      <div className="flex min-h-screen w-full flex-col gap-0 pt-0 pb-6 lg:pt-0 lg:pb-8">
        <main className="-mt-4 flex-1">
          {view === 'home' || view === 'program' ? (
            <>
              {view === 'home' && (
              <section className="relative min-h-[600px] overflow-hidden rounded-none bg-slate-950 shadow-soft sm:min-h-[540px] lg:min-h-[520px]">
                <img src={mentorPhoto} alt="Dr. Juan Celestino" className="absolute inset-0 h-full w-full object-cover object-[62%_5%] animate-slide-in-from-right sm:object-[55%_5%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10 sm:bg-gradient-to-r sm:from-slate-950/80 sm:via-slate-950/35 sm:to-transparent" />
                <div className="relative z-10 flex min-h-[600px] items-end px-5 pb-8 pt-40 sm:min-h-[540px] sm:items-center sm:px-10 sm:py-16 lg:min-h-[520px]">
                  <div className="w-full space-y-5 sm:max-w-[58%] lg:max-w-xl">
                    <div className="animate-fade-in-up">
                      <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">Mentoría en Investigación Científica</h1>
                      <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:mt-4 sm:text-base lg:text-lg">Guía tu proyecto de investigación con el Dr. Juan Celestino y transforma tus resultados en conocimiento real.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                      <button type="button" onClick={() => setBookingOpen(true)} className="rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-lg shadow-black/20 transition duration-200 transform hover:-translate-y-1 hover:scale-[1.02] hover:bg-slate-100 hover:shadow-xl sm:px-6">
                        Agendar Mentoría
                      </button>
                      <button type="button" className="rounded-3xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg">
                        Ver Metodologías
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              )}

              {(view === 'home' || view === 'program') && <section key={view === 'program' ? activeCourseSection : 'home-program'} className="program-section-enter px-0 pb-6 pt-0 sm:pb-8">
                <div className="w-full space-y-0">
                  <div className={`grid gap-0 ${view === 'home' || ['course-audience', 'course-outcomes', 'course-curriculum'].includes(activeCourseSection) ? '' : 'hidden'}`}>
                    <article id="course-audience" style={{ transitionDelay: '80ms' }} className={`${view === 'home' || activeCourseSection === 'course-audience' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll grid gap-8 rounded-t-none rounded-b-[28px] border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-sm md:grid-cols-[0.9fr_1.1fr] md:p-12`}>
                      <div className="flex flex-col justify-between gap-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700">Para quién es</p>
                          <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">Formar también es saber dirigir.</h2>
                        </div>
                        <p className="max-w-md text-lg leading-8 text-slate-600">Una propuesta para quienes acompañan investigaciones y quieren fortalecer su criterio académico y metodológico.</p>
                      </div>
                      <div className="border-t border-slate-200 md:border-l md:border-t-0 md:pl-8">
                        <p className="mb-4 text-sm font-semibold text-slate-500">Este recorrido está pensado para:</p>
                        <ul className="grid grid-cols-1">
                        <li className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-sm leading-6 text-slate-700 first:border-t">
                          <span className="mt-1 text-sm font-bold text-brand-700">01</span>
                          <span>Docentes universitarios.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-sm leading-6 text-slate-700">
                          <span className="mt-1 text-sm font-bold text-brand-700">02</span>
                          <span>Directores y co-directores de tesis de grado y posgrado.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-sm leading-6 text-slate-700">
                          <span className="mt-1 text-sm font-bold text-brand-700">03</span>
                          <span>Integrantes de comités académicos.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-sm leading-6 text-slate-700">
                          <span className="mt-1 text-sm font-bold text-brand-700">04</span>
                          <span>Profesionales con experiencia en investigación.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-sm leading-6 text-slate-700">
                          <span className="mt-1 text-sm font-bold text-brand-700">05</span>
                          <span>Académicos interesados en fortalecer sus competencias.</span>
                        </li>
                        </ul>
                      </div>
                    </article>

                    <article id="course-outcomes" style={{ transitionDelay: '160ms' }} className={`${view === 'home' || activeCourseSection === 'course-outcomes' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll overflow-hidden rounded-[28px] bg-[#0b3760] p-8 text-white shadow-soft md:p-12`}>
                      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                        <div className="flex flex-col justify-between gap-6">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Al finalizar</p>
                            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Dirigir con más claridad. Acompañar con más impacto.</h2>
                          </div>
                          <p className="text-sm leading-7 text-blue-100">Herramientas concretas para orientar el proceso completo de una tesis.</p>
                        </div>
                        <ul className="grid content-center gap-x-6 sm:grid-cols-2">
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">01</span>
                          <span>Evaluar y orientar proyectos de investigación.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">02</span>
                          <span>Identificar fortalezas y debilidades metodológicas.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">03</span>
                          <span>Realizar devoluciones académicas constructivas.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">04</span>
                          <span>Interpretar y acompañar el análisis de resultados.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">05</span>
                          <span>Guiar la escritura científica y la preparación de la defensa.</span>
                        </li>
                        <li className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-6 text-blue-50">
                          <span className="text-cyan-200">06</span>
                          <span>Incorporar el uso responsable de la IA en la investigación.</span>
                        </li>
                        </ul>
                      </div>
                    </article>

                    <article id="course-curriculum" style={{ transitionDelay: '240ms' }} className={`${view === 'home' || activeCourseSection === 'course-curriculum' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-soft md:p-12`}>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700">Recorrido formativo</p>
                          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-900">Nueve módulos, paso a paso.</h2>
                        </div>
                        <p className="text-sm font-semibold text-slate-500">12 semanas · Modalidad virtual</p>
                      </div>
                      <div className="mt-8 grid gap-x-10 md:grid-cols-2">
                        {courseModules.map(([title, description], index) => (
                          <div key={title} className="relative border-l border-slate-200 pl-7">
                            <span className="absolute -left-[17px] top-5 flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 bg-white text-xs font-bold text-brand-800">{String(index + 1).padStart(2, '0')}</span>
                            <button type="button" onClick={() => setExpandedModule(expandedModule === index + 1 ? null : index + 1)} aria-expanded={expandedModule === index + 1} className="w-full rounded-xl border-b border-slate-200 px-3 py-5 text-left transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
                              <span className="flex items-start justify-between gap-4">
                                <span className="font-semibold text-slate-900">{title}</span>
                                <span className="shrink-0 text-sm text-brand-700">{index === 1 || index === 3 || index === 4 ? '2 sem.' : '1 sem.'}</span>
                              </span>
                              {expandedModule === index + 1 && <span className="mt-3 block max-w-lg text-sm leading-6 text-slate-600">{description}</span>}
                            </button>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>

                  <div className={`grid gap-0 ${view === 'home' || ['course-benefits', 'course-investment', 'course-contact'].includes(activeCourseSection) ? '' : 'hidden'}`}>
                    <article id="course-benefits" style={{ transitionDelay: '120ms' }} className={`${view === 'home' || activeCourseSection === 'course-benefits' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll grid gap-8 overflow-hidden rounded-[28px] bg-[#dff4f4] shadow-soft md:grid-cols-[1fr_0.9fr]`}>
                      <div className="p-8 md:p-12">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700">Cómo funciona</p>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900">Flexibilidad para avanzar. Acompañamiento para llegar.</h2>
                        <div className="mt-7 space-y-4 text-base text-slate-700">
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-brand-700">01</span>
                          <span>Modalidad 100% virtual (asincrónica y con encuentros sincrónicos).</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-brand-700">02</span>
                          <span>Acompañamiento personalizado.</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-brand-700">03</span>
                          <span>Materiales actualizados, plantillas y ejemplos prácticos.</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-brand-700">04</span>
                          <span>Espacios de consulta y análisis de casos reales.</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-brand-700">05</span>
                          <span>Certificado de participación.</span>
                        </div>
                        </div>
                      </div>
                      <div className="relative min-h-72 md:min-h-full">
                        <img src={researcherPhoto} alt="Investigador trabajando en un laboratorio" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                        <p className="absolute bottom-6 left-6 right-6 text-sm font-semibold text-white">Aprendizaje aplicado a proyectos de investigación reales.</p>
                      </div>
                    </article>

                    <div className={`grid gap-6 py-8 md:grid-cols-2 ${view === 'home' || ['course-investment', 'course-contact'].includes(activeCourseSection) ? '' : 'hidden'}`}>
                    <article id="course-investment" style={{ transitionDelay: '200ms' }} className={`${view === 'home' || activeCourseSection === 'course-investment' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll grid gap-8 rounded-[28px] bg-[#0b3760] p-8 text-white shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-12`}>
                      <div className="flex flex-col justify-between gap-8">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">Inversión</p>
                          <p className="mt-5 text-sm text-blue-100">Valor mensual</p>
                          <h2 className="mt-1 text-6xl font-black tracking-tight sm:text-7xl">USD 100</h2>
                          <p className="mt-3 text-base text-blue-100">Cien dólares estadounidenses · pago mensual</p>
                        </div>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, tengo una consulta de disponibilidad de pago del programa de mentoría.')}`} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 border-b border-cyan-200 pb-2 font-semibold text-white transition hover:text-cyan-200">Consultar disponibilidad <span aria-hidden="true">↗</span></a>
                      </div>
                      <div className="grid content-center gap-4 border-t border-white/20 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Medios de pago</p>
                        <div className="flex items-center justify-between gap-4 border-b border-white/20 py-4"><span>Transferencia bancaria</span><span className="text-sm text-blue-100">Mensual</span></div>
                        <div className="flex items-center justify-between gap-4 border-b border-white/20 py-4"><span>Mercado Pago</span><span className="text-sm text-blue-100">Mensual</span></div>
                        <p className="text-sm leading-6 text-blue-100">Escríbenos para conocer el proceso de inscripción y las opciones disponibles.</p>
                      </div>
                    </article>

                    <aside id="course-contact" style={{ transitionDelay: '280ms' }} className={`${view === 'home' || activeCourseSection === 'course-contact' ? '' : 'hidden'} program-card scroll-mt-24 reveal-on-scroll rounded-[28px] bg-[#eaf4ff] p-8 shadow-soft md:p-12`}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700">Hablemos de tu próximo paso</p>
                      <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                          <h2 className="max-w-2xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl">¿Te interesa fortalecer tu forma de dirigir?</h2>
                          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Conversemos sobre el programa y cómo puede acompañar tu trabajo académico.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800">WhatsApp <span aria-hidden="true">↗</span></a>
                          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-500">Enviar correo <span aria-hidden="true">↗</span></a>
                        </div>
                      </div>
                    </aside>
                    </div>
                  </div>

                  {view === 'program' && (
                    <div className="flex items-center justify-between border-t border-slate-300/70 pt-5">
                      <button type="button" onClick={() => moveCourseSection(-1)} disabled={activeCourseSection === courseSections[0][0]} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-40">← Anterior</button>
                      <button type="button" onClick={() => moveCourseSection(1)} disabled={activeCourseSection === courseSections[courseSections.length - 1][0]} className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40">Siguiente →</button>
                    </div>
                  )}
                </div>
              </section>}

            </>
          ) : view === 'about' ? (
            <AboutSection />
          ) : view === 'mentorpanel' ? (
            <MentorPanel currentUser={currentUser} onLogout={handleLogout} />
          ) : view === 'plans' ? (
            <PlanSection currentUser={currentUser} onSelectPlan={handleSelectPlan} />
          ) : view === 'login' ? (
            <LoginSection onLoginSuccess={handleLoginSuccess} onRegisterClick={() => setView('register')} />
          ) : view === 'register' ? (
            <RegisterSection onRegisterSuccess={handleRegisterSuccess} onLoginClick={() => setView('login')} />
          ) : view === 'dashboard' ? (
            <DashboardSection currentUser={currentUser} pendingPlan={pendingPlan} onProceedToPlans={handleProceedToPlans} onLogout={handleLogout} />
          ) : view === 'userpanel' ? (
            <UserPanel currentUser={currentUser} onLogout={handleLogout} onNavigate={(name) => setView(name)} onSaveUser={handleSaveUser} />
          ) : view === 'articles' ? (
            <ArticleSection />
          ) : view === 'blog' ? (
            <BlogSection />
          ) : view === 'contact' ? (
            <ContactSection />
          ) : null}
        </main>

        {bookingOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="booking-title" className="booking-dialog-enter relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl sm:p-8">
              <button type="button" onClick={() => setBookingOpen(false)} aria-label="Cerrar formulario" className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Solicitud de mentoría</p>
              <h2 id="booking-title" className="mt-3 pr-12 text-3xl font-bold text-slate-900">Cuéntame sobre tu proyecto</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Completa tus datos y qué tipo de acompañamiento necesitas. Prepararemos el mensaje para continuar por WhatsApp.</p>

              <form onSubmit={handleBookingSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="mb-2 block text-sm font-semibold text-slate-800">Nombre completo</label>
                  <input id="booking-name" name="name" type="text" autoComplete="name" defaultValue={currentUser?.name ?? ''} required autoFocus className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                </div>
                <div>
                  <label htmlFor="booking-email" className="mb-2 block text-sm font-semibold text-slate-800">Correo electrónico</label>
                  <input id="booking-email" name="email" type="email" autoComplete="email" defaultValue={currentUser?.email ?? ''} required className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-2 block text-sm font-semibold text-slate-800">WhatsApp / teléfono</label>
                  <input id="booking-phone" name="phone" type="tel" autoComplete="tel" required className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                </div>
                <div>
                  <label htmlFor="booking-occupation" className="mb-2 block text-sm font-semibold text-slate-800">Ocupación</label>
                  <input id="booking-occupation" name="occupation" type="text" autoComplete="organization-title" placeholder="Ej. estudiante, docente, investigador" required className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-service" className="mb-2 block text-sm font-semibold text-slate-800">¿Qué apoyo necesitas?</label>
                  <select id="booking-service" name="service" defaultValue="" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100">
                    <option value="" disabled>Selecciona un tipo de acompañamiento</option>
                    <option>Dirección y acompañamiento de tesis</option>
                    <option>Diseño metodológico</option>
                    <option>Análisis de datos</option>
                    <option>Escritura académica o artículo científico</option>
                    <option>Preparación de defensa</option>
                    <option>Otro tipo de asesoría</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-project" className="mb-2 block text-sm font-semibold text-slate-800">Cuéntame brevemente qué necesitas</label>
                  <textarea id="booking-project" name="project" rows="4" required placeholder="Tema, etapa del proyecto y en qué te gustaría recibir apoyo..." className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
                </div>
                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setBookingOpen(false)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button>
                  <button type="submit" className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">Continuar por WhatsApp</button>
                </div>
              </form>
            </section>
          </div>
        )}

        {view !== 'userpanel' && view !== 'profile' && view !== 'mentorpanel' && view !== 'login' && view !== 'register' && (
        <footer className="mt-0 w-full border-t border-white/10 bg-[#0b2945] text-slate-100">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-14">
            <div className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_1fr] md:gap-12">
              <div className="max-w-md">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-brand-900">JC</span>
                  <div>
                    <p className="font-semibold text-white">Mentoría en investigación</p>
                    <p className="text-xs text-slate-400">Formación para directores de tesis</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">Herramientas y acompañamiento académico para dirigir investigaciones con más claridad y calidad.</p>
                <a href="https://www.instagram.com/jcelestinovaldesrojas/" target="_blank" rel="noreferrer" aria-label="Visitar Instagram de @jcelestinovaldesrojas" className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 text-red-500 transition hover:-translate-y-1 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Explora el programa</h2>
                <nav aria-label="Enlaces del programa" className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                  {courseSections.map(([sectionId, label]) => (
                    <button key={sectionId} type="button" onClick={() => navigateToCourseSection(sectionId)} className="text-left text-slate-300 transition hover:text-white">{label}</button>
                  ))}
                </nav>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Contacto</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="block break-words text-slate-200 transition hover:text-white">WhatsApp · {WHATSAPP_DISPLAY}</a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="block break-all text-slate-200 transition hover:text-white">{CONTACT_EMAIL}</a>
                  <button type="button" onClick={() => setBookingOpen(true)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-3 font-semibold text-brand-900 transition hover:-translate-y-0.5 hover:bg-white">Solicitar mentoría <span aria-hidden="true">↗</span></button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Mentoría en investigación. Todos los derechos reservados.</p>
              <button type="button" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-fit transition hover:text-white">Volver al inicio ↑</button>
            </div>
          </div>
        </footer>
        )}
      </div>
    </div>
  );
}

export default App;
