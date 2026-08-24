import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './HeroSection.css';

export default function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Janamdin Mubaarak';

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTypedText(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const floats = ['🪔','🌸','💕','✨','🪷','💫','🌺','💖','🪔','✨','🌸','💕'];
  const stars = Array.from({ length: 20 });
  const nameText = 'MAHAKPREET KAUR';

  return (
    <section className="hero">
      {/* Video background */}
      <video
        className="hero-video"
        autoPlay loop muted playsInline
        src="https://cdn.pixabay.com/video/2024/02/16/200834-913476493_large.mp4"
      />
      <div className="hero-overlay" />

      {/* Stars */}
      <div className="hero-stars">
        {stars.map((_, i) => (
          <div key={i} className="hero-star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }} />
        ))}
      </div>

      {/* Floating elements */}
      <div className="hero-floats">
        {floats.map((el, i) => (
          <div key={i} className={`hero-float hf-${i + 1}`}>{el}</div>
        ))}
      </div>

      {/* Phulkari corners */}
      <div className="phulkari-corner pc-tl" />
      <div className="phulkari-corner pc-tr" />
      <div className="phulkari-corner pc-bl" />
      <div className="phulkari-corner pc-br" />

      <div className="hero-inner">
        <motion.h2
          className="hero-punjabi handwritten"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {typedText}
          <span className="hero-cursor">|</span>
        </motion.h2>

        <motion.h1
          className="hero-name heading"
          ref={nameRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: 'easeOut' as const }}
        >
          {nameText.split('').map((ch, i) => (
            <span key={i} className="hero-letter">{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <span className="hero-arrow">↓</span>
      </motion.div>
    </section>
  );
}
