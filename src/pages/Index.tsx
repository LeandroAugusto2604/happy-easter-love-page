import { Heart, Egg } from "lucide-react";
import easterHero from "@/assets/easter-hero.jpg";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";
import PhotoGallery from "@/components/PhotoGallery";
import LoveMessages from "@/components/LoveMessages";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={easterHero}
            alt="Páscoa Romântica"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 py-20 animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Egg className="text-gold animate-float" size={28} />
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
              Páscoa 2026
            </span>
            <Egg className="text-gold animate-float" size={28} style={{ animationDelay: "1s" }} />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-foreground mb-6 leading-tight">
            Feliz Páscoa,{" "}
            <span className="text-primary italic">Meu Amor</span>
            <Heart className="inline-block ml-2 text-primary animate-pulse-soft" size={36} fill="currentColor" />
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Esta página foi feita com todo o carinho do mundo, especialmente para você.
            Porque você merece saber todos os dias o quanto é amada. 💗
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-2xl">🐣</span>
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">💝</span>
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">🐣</span>
          </div>
        </div>
      </section>

      {/* Special Message */}
      <section className="py-16 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto bg-card/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border">
          <Heart className="text-primary mx-auto mb-4 animate-pulse-soft" size={40} fill="currentColor" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            Para a Pessoa Mais Especial da Minha Vida
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed text-lg">
            Meu amor, nesta Páscoa quero te dizer que você é tudo pra mim.
            Você ilumina meus dias, aquece meu coração e me faz acreditar que
            o amor verdadeiro existe. Eu te amo mais do que palavras podem descrever,
            mais do que gestos podem demonstrar. Você é meu lar, meu porto seguro,
            minha razão de sorrir. Que esta Páscoa renove ainda mais o nosso amor
            e nos traga muita paz, doçura e momentos inesquecíveis juntos. 🐰💕
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Love Messages */}
      <LoveMessages />

      {/* Footer */}
      <footer className="py-12 px-4 text-center relative z-10 bg-rose-soft/20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🐰</span>
          <Heart className="text-primary" size={20} fill="currentColor" />
          <span className="text-2xl">🐰</span>
        </div>
        <p className="font-heading text-xl text-foreground">
          Com todo o meu amor, para sempre seu 💖
        </p>
        <p className="font-body text-sm text-muted-foreground mt-2">
          Feliz Páscoa 2026 🌷
        </p>
      </footer>
    </div>
  );
};

export default Index;
