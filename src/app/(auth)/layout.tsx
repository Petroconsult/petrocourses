export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-64 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 -right-64 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
