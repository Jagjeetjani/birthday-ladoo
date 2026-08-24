import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import './EnvelopeIntro.css';

interface Props { onOpen: () => void; }

export default function EnvelopeIntro({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 },
      colors: ['#C4515C','#e8808a','#d4a017','#FFDAB9','#b8a9e8'] });

    setTimeout(() => {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 },
        colors: ['#C4515C','#e8808a','#d4a017','#FFDAB9'] });
    }, 400);

    setTimeout(() => onOpen(), 2000);
  };

  const petals = Array.from({ length: 12 });

  return (
    <AnimatePresence>
      {!opening || true ? (
        <motion.div
          className="env-container"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          style={{ display: opening ? undefined : undefined }}
        >
          {petals.map((_, i) => (
            <div key={i} className={`env-petal env-petal-${i + 1}`} />
          ))}

          <div className="env-content">
            <motion.h1
              className="env-title heading"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              ✨ A Special Surprise Awaits ✨
            </motion.h1>

            <motion.div
              className="env-wrapper"
              onClick={handleOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <div className={`env-body ${opening ? 'env-opening' : ''}`}>
                <div className="env-back" />
                <div className="env-letter">
                  <div className="env-letter-inner">
                    <span className="env-letter-heart">💌</span>
                    <p className="handwritten">For You...</p>
                  </div>
                </div>
                <div className="env-flap" />
                <div className="env-front" />
                <div className="env-seal">💕</div>
              </div>
            </motion.div>

            <motion.p
              className="env-instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {opening ? 'Opening your surprise... ✨' : 'Tap the envelope to open 💕'}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
