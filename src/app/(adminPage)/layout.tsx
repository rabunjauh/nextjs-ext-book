import Nav from "@/components/Nav";

export default function adminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <section>{children}</section>
    </div>
  );
}
