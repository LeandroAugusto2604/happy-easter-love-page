import { useState, useRef, useEffect } from "react";
import { Music, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use a royalty-free romantic piano track
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/29/audio_a0189571d5.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
      aria-label={isPlaying ? "Pausar música" : "Tocar música"}
    >
      {isPlaying ? (
        <Music className="animate-pulse-soft" size={24} />
      ) : (
        <VolumeX size={24} />
      )}
    </button>
  );
};

export default MusicPlayer;
