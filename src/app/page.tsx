import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import { NewsCollage } from "@/components/news-collage";
import { Separator } from "@/components/ui/separator";
import { SnowEffect } from "@/components/snow-effect";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 text-gray-900 font-sans relative">
      <SnowEffect />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-12 px-4 text-center animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="relative w-48 h-48 mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-500">
          <Image
            src="/Start.png"
            alt="Galdora Personalmanagement Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Galdora Personalmanagement
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Ihr Partner für professionelle Personallösungen.
          <br />
          Verbinden Sie sich mit uns auf unseren sozialen Kanälen.
        </p>
      </section>

      {/* Social Links Section */}
      <section className="px-4 pb-20 animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards relative z-10">
        <SocialLinks />
      </section>

      <div className="max-w-4xl mx-auto px-8 mb-20 relative z-10">
        <Separator className="bg-gray-200" />
      </div>

      {/* News Section */}
      <section className="px-4 pb-24 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards relative z-10">
        <NewsCollage />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-white/80 backdrop-blur-sm border-t border-gray-100 relative z-10">
        <p>© {new Date().getFullYear()} Galdora Personalmanagement. Alle Rechte vorbehalten.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-900 transition-colors">Impressum</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Datenschutz</a>
        </div>
      </footer>
    </main>
  );
}
