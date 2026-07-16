import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section';
import Header from './Header';
import RevealOnScroll from './RevealOnScroll';
import './Gallery.css';
import { galleries } from '../data/content';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? galleries.length - 1 : prev! - 1));
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === galleries.length - 1 ? 0 : prev! + 1));
    }
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <Section header={<Header title="GALLERY" subtitle={'Khoảnh Khắc\nĐáng Nhớ'} />}>
      <div className="gallery">
        {galleries.map((src, index) => (
          <RevealOnScroll key={src} delay={index * 50}>
            <GalleryImage src={src} onClick={() => setSelectedIndex(index)} />
          </RevealOnScroll>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-lightbox"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="gallery-lightbox__close"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            >
              &times;
            </button>

            <button
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              &#10094;
            </button>

            <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                src={galleries[selectedIndex]}
                alt=""
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="gallery-lightbox__img"
              />
            </div>

            <button
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              &#10095;
            </button>

            <div className="gallery-lightbox__counter">
              {selectedIndex + 1} / {galleries.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function GalleryImage({ src, onClick }: { src: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gallery-image"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={src}
        alt=""
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      <div className="gallery-image__overlay" style={{ opacity: hovered ? 0 : 0.08 }} />
    </div>
  );
}
