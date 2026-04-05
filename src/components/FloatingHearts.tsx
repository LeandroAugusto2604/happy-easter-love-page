import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: 12 + Math.random() * 16,
    opacity: 0.15 + Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute animate-float text-primary"
          style={{
            left: h.left,
            top: `${Math.random() * 100}%`,
            animationDelay: h.delay,
            animationDuration: h.duration,
            opacity: h.opacity,
            width: h.size,
            height: h.size,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
