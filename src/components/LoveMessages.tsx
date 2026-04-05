import { Heart } from "lucide-react";

const messages = [
  {
    text: "Você é o meu maior presente, meu amor. Cada dia ao seu lado é uma bênção que agradeço de todo coração.",
    emoji: "🌹",
  },
  {
    text: "Nesta Páscoa, quero renovar meu amor por você. Assim como a vida renasce na primavera, nosso amor floresce a cada momento juntos.",
    emoji: "🌷",
  },
  {
    text: "Eu te amo mais do que todas as palavras conseguem expressar. Você é a razão do meu sorriso, minha paz e minha felicidade.",
    emoji: "💖",
  },
  {
    text: "Que a doçura desta Páscoa seja apenas uma fração da doçura que você traz para minha vida todos os dias.",
    emoji: "🍫",
  },
  {
    text: "Obrigado por ser minha companheira, minha melhor amiga e o grande amor da minha vida. Eu sou completo com você.",
    emoji: "✨",
  },
  {
    text: "Cada segundo ao seu lado vale mais que toda a eternidade. Você é o meu para sempre, meu amor.",
    emoji: "💕",
  },
];

const LoveMessages = () => {
  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Heart className="text-primary animate-pulse-soft" size={24} fill="currentColor" />
          <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground">
            Palavras do Coração
          </h2>
          <Heart className="text-primary animate-pulse-soft" size={24} fill="currentColor" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="text-3xl mb-3 block">{msg.emoji}</span>
              <p className="font-body text-foreground/90 leading-relaxed italic">
                "{msg.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveMessages;
