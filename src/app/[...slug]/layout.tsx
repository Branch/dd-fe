export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <main className="container min-h-screen">{children}</main>;
}
