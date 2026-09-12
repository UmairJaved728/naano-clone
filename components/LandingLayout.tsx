import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function LandingLayout({
  children,
  navLinks = "marketing",
  navVariant = "light",
}: {
  children: React.ReactNode;
  navLinks?: "marketing" | "home";
  navVariant?: "dark" | "light";
}) {
  return (
    <main className="relative bg-canvas">
      <div className="bg-noise" aria-hidden />
      <Nav links={navLinks} onLight={navVariant === "light" ? true : false} />
      <div className="pt-20">{children}</div>
      <Footer />
    </main>
  );
}