import { useState, useEffect, useCallback } from "react";
import { Heart, X, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

import couple1 from "@/assets/couple-1.jpeg";
import couple2 from "@/assets/couple-2.jpeg";
import couple3 from "@/assets/couple-3.jpeg";
import couple4 from "@/assets/couple-4.jpeg";
import couple5 from "@/assets/couple-5.jpeg";
import couple6 from "@/assets/couple-6.jpeg";
import couple7 from "@/assets/couple-7.jpeg";
import couple8 from "@/assets/couple-8.jpeg";
import couple9 from "@/assets/couple-9.jpeg";
import couple10 from "@/assets/couple-10.jpeg";
import couple11 from "@/assets/couple-11.jpeg";
import couple12 from "@/assets/couple-12.jpeg";

interface Photo {
  id: string;
  url: string;
  caption: string;
}

const DEFAULT_PHOTOS: Photo[] = [
  { id: "default-1", url: couple1, caption: "Nosso momento na praia 💙" },
  { id: "default-2", url: couple2, caption: "Passeio de barco juntos 🚤" },
  { id: "default-3", url: couple3, caption: "Tarde perfeita na praia 🌴" },
  { id: "default-4", url: couple4, caption: "Noite especial ❤️" },
  { id: "default-5", url: couple5, caption: "Juntos sempre 🖤" },
  { id: "default-6", url: couple6, caption: "Águas cristalinas 🌊" },
  { id: "default-7", url: couple7, caption: "Curtindo o paraíso 🌴😎" },
  { id: "default-8", url: couple8, caption: "Noite romântica juntos 💐" },
  { id: "default-9", url: couple9, caption: "Comemorando vitórias 🎉" },
  { id: "default-10", url: couple10, caption: "Nosso olhar apaixonado 💑" },
  { id: "default-11", url: couple11, caption: "Aventura no buggy 🚙💙" },
  { id: "default-12", url: couple12, caption: "Balanço dos sonhos 🌅" },
];

const STORAGE_KEY = "love-gallery-photos";

const loadExtraPhotos = (): Photo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveExtraPhotos = (photos: Photo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.warn("Não foi possível salvar fotos no localStorage:", e);
  }
};

const PhotoGallery = () => {
  const [extraPhotos, setExtraPhotos] = useState<Photo[]>(loadExtraPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [slideshowActive, setSlideshowActive] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const allPhotos = [...DEFAULT_PHOTOS, ...extraPhotos];

  useEffect(() => {
    saveExtraPhotos(extraPhotos);
  }, [extraPhotos]);

  useEffect(() => {
    if (!slideshowActive || allPhotos.length < 2) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowActive, allPhotos.length]);

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newPhoto: Photo = {
          id: Date.now().toString() + Math.random().toString(36),
          url: ev.target?.result as string,
          caption: "",
        };
        setExtraPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    if (id.startsWith("default-")) return;
    setExtraPhotos((prev) => prev.filter((p) => p.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const goToSlide = useCallback((dir: number) => {
    setCurrentSlide((prev) => (prev + dir + allPhotos.length) % allPhotos.length);
  }, [allPhotos.length]);

  const toggleSlideshow = () => {
    setSlideshowActive((prev) => !prev);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground mb-2">
          Nossos Momentos Juntos
        </h2>
        <p className="text-center text-muted-foreground font-body mb-6">
          Cada foto guarda um pedacinho do nosso amor 💕
        </p>

        {/* Slideshow */}
        <div className="mb-10">
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleSlideshow}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body text-sm shadow-lg hover:scale-105 transition-transform"
            >
              {slideshowActive ? <Pause size={16} /> : <Play size={16} />}
              {slideshowActive ? "Pausar Slideshow" : "▶ Assistir Slideshow"}
            </button>
          </div>

          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-card aspect-video">
            {allPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  transform: index === currentSlide ? "scale(1)" : "scale(1.08)",
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || `Momento ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                {photo.caption && (
                  <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground font-body text-lg drop-shadow-lg text-center px-4">
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {allPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "bg-primary-foreground scale-125 shadow-lg"
                      : "bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToSlide(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-foreground/40 text-primary-foreground rounded-full p-2 hover:bg-foreground/60 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goToSlide(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-foreground/40 text-primary-foreground rounded-full p-2 hover:bg-foreground/60 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <Heart
              className="absolute top-4 right-4 z-10 text-primary drop-shadow-lg animate-pulse"
              size={24}
              fill="currentColor"
            />
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg border-2 border-rose-soft hover:border-primary transition-all duration-300 hover:shadow-xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt={photo.caption || `Nosso momento ${index + 1}`}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <Heart
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary-foreground drop-shadow-lg"
                  size={32}
                  fill="currentColor"
                />
              </div>
              {!photo.id.startsWith("default-") && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id);
                  }}
                  className="absolute top-2 right-2 bg-foreground/60 text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-primary/40 bg-rose-soft/50 cursor-pointer hover:border-primary hover:bg-rose-soft transition-all duration-300">
            <Plus className="text-primary mb-2" size={32} />
            <span className="text-sm text-muted-foreground font-body">Adicionar fotos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAddPhoto}
            />
          </label>
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] animate-fade-up">
            <img
              src={selectedPhoto.url}
              alt="Nosso momento"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
