import { useState, useEffect, useCallback } from "react";
import { Heart, X, Plus, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  caption: string;
}

const STORAGE_KEY = "love-gallery-photos";

const loadPhotos = (): Photo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const savePhotos = (photos: Photo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.warn("Não foi possível salvar fotos no localStorage:", e);
  }
};

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(loadPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    savePhotos(photos);
  }, [photos]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!slideshowActive || photos.length < 2) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowActive, photos.length]);

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
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const goToSlide = useCallback((dir: number) => {
    setCurrentSlide((prev) => (prev + dir + photos.length) % photos.length);
  }, [photos.length]);

  const toggleSlideshow = () => {
    if (photos.length < 2) return;
    setSlideshowActive((prev) => !prev);
    setCurrentSlide(0);
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
        {photos.length >= 2 && (
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
              {photos.map((photo, index) => (
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
                    alt={`Momento ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                </div>
              ))}

              {/* Slide counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {photos.map((_, i) => (
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

              {/* Navigation arrows */}
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

              {/* Heart overlay */}
              <Heart
                className="absolute top-4 right-4 z-10 text-primary drop-shadow-lg animate-pulse"
                size={24}
                fill="currentColor"
              />
            </div>
          </div>
        )}

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg border-2 border-rose-soft hover:border-primary transition-all duration-300 hover:shadow-xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt={`Nosso momento ${index + 1}`}
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(photo.id);
                }}
                className="absolute top-2 right-2 bg-foreground/60 text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
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

      {/* Lightbox */}
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
