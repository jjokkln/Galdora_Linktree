import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import { NewsCollage } from "@/components/news-collage";
import { Separator } from "@/components/ui/separator";
import { SnowEffect } from "@/components/snow-effect";
import { HeartEffect } from "@/components/heart-effect";
import { getSettings } from "@/lib/data";

export const dynamic = 'force-dynamic'; // Ensure settings are fetched fresh on each request

export default async function Home() {
  const settings = await getSettings();
  const theme = settings.theme;

  let bgClass = "bg-gradient-to-b from-blue-200 via-white to-blue-100";
  let textClass = "text-gray-900";
  let subTextClass = "text-gray-600";
  let footerClass = "bg-white/80 backdrop-blur-sm border-t border-gray-100 text-gray-500";
  let separatorClass = "bg-gray-200";

  if (theme === 'christmas') {
    // Vibrant 'knallig' Christmas red transitioning to deep green
    bgClass = "bg-gradient-to-b from-[#ff0000] via-[#cc0000] to-[#004d00]";
    textClass = "text-white";
    subTextClass = "text-red-100/90";
    footerClass = "bg-black/30 backdrop-blur-sm border-t border-white/10 text-red-100/70";
    separatorClass = "bg-white/20";
  } else if (theme === 'valentine') {
    bgClass = "bg-gradient-to-b from-pink-200 via-white to-pink-100";
    textClass = "text-pink-900";
    subTextClass = "text-pink-700";
    footerClass = "bg-white/60 backdrop-blur-sm border-t border-pink-100 text-pink-600";
    separatorClass = "bg-pink-200";
  }

  return (
    <main className={`min-h-screen ${bgClass} ${textClass} font-sans relative transition-colors duration-500`}>
      {theme === 'christmas' && <SnowEffect />}
      {theme === 'valentine' && <HeartEffect />}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-12 px-4 text-center animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="relative w-64 h-64 mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-500">
          <Image
            src="/Galdora_Logo.png"
            alt="Galdora Personalmanagement Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Removed Title as requested */}
        <p className={`text-lg ${subTextClass} max-w-2xl mx-auto font-light`}>
          Ihr Partner für professionelle Personallösungen.
          <br />
          Verbinden Sie sich mit uns auf unseren sozialen Kanälen.
        </p>
      </section>

      {/* Social Links Section */}
      <section className="px-4 pb-20 animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards relative z-10">
        <SocialLinks theme={theme} />
      </section>

      <div className="max-w-4xl mx-auto px-8 mb-20 relative z-10">
        <Separator className={separatorClass} />
      </div>

      {/* News Section */}
      <section className="px-4 pb-24 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards relative z-10">
        <NewsCollage theme={theme} />
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${footerClass} relative z-10`}>
        <p>© {new Date().getFullYear()} Galdora Personalmanagement. Alle Rechte vorbehalten.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className={`hover:${textClass} transition-colors`}>Impressum</a>
          <a href="#" className={`hover:${textClass} transition-colors`}>Datenschutz</a>
        </div>
      </footer>
    </main>
  );
}
