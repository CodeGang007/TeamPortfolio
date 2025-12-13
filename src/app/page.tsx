import AppLayout from "@/components/AppLayout";
import { CarouselDemo } from "@/components/ProjectCards";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-8">
        <h1 className="mb-4 text-center tracking-wider text-5xl font-bold">
          Streamline Your Goals & Projects
          <br /> with our Platform
        </h1>

        <p className="mb-10 text-center text-sm tracking-wide text-zinc-500">
          Our innovative platform helps you stay focused and build your dream
          projects.
        </p>

        <CarouselDemo />
      </div>
    </AppLayout>
  );
}
