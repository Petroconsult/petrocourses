import Navigation from '@/components/layout/Navigation';

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}