export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-300">
      <div className="container mx-auto min-h-screen bg-white">{children}</div>
    </div>
  );
}
