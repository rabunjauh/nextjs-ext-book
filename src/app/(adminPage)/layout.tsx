export default function adminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <section>{children}</section>
    </div>
  );
}
