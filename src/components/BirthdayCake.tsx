import { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import './BirthdayCake.css';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showMsg, setShowMsg] = useState(false);

  const fireFireworks = () => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#C4515C', '#e8808a', '#d4a017', '#FFDAB9', '#b8a9e8', '#ff6b6b'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: Math.random() * 0.4 + 0.3 },
        colors,
        gravity: 1.2,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: Math.random() * 0.4 + 0.3 },
        colors,
        gravity: 1.2,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    // Big initial burst
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors, gravity: 0.8 });
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 }, colors, gravity: 0.9 });
    }, 300);

    // Continuous fireworks from sides
    setTimeout(() => requestAnimationFrame(frame), 600);

    // Final big starburst
    setTimeout(() => {
      confetti({ particleCount: 250, spread: 160, origin: { y: 0.4 }, colors, startVelocity: 45, gravity: 0.7 });
    }, 3500);
  };

  const handleBlow = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setTimeout(() => {
      fireFireworks();
      setShowMsg(true);
    }, 500);
  };

  return (
    <section className="ck-section">
      <div className="section-wrap">
        <motion.h2 className="ck-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          🎂 Cake Katton Da Vela!
        </motion.h2>
        <motion.p className="ck-sub handwritten"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          Time to make a wish and blow! ✨
        </motion.p>

        <motion.div className="ck-stage"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}>
          <div className="ck-cake">
            <div className="ck-candles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="ck-candle">
                  <div className={`ck-flame ${!candlesLit ? 'out' : ''}`} />
                  <div className="ck-wick" />
                  <div className="ck-stick" />
                </div>
              ))}
            </div>
            <div className="ck-tier ck-t1"><div className="ck-frost ck-f1" /></div>
            <div className="ck-tier ck-t2"><div className="ck-frost ck-f2" /><span className="ck-age heading">20</span></div>
            <div className="ck-tier ck-t3"><div className="ck-frost ck-f3" /></div>
          </div>
          <div className="ck-plate" />
        </motion.div>

        <motion.button
          className={`ck-btn ${!candlesLit ? 'done' : ''}`}
          onClick={handleBlow}
          disabled={!candlesLit}
          whileHover={candlesLit ? { scale: 1.06 } : {}}
          whileTap={candlesLit ? { scale: 0.95 } : {}}
        >
          {candlesLit ? '🕯️ Blow the Candles!' : '✅ Done!'}
        </motion.button>

        {showMsg && (
          <motion.div className="ck-msg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}>
            <p className="ck-msg-text">
              🎉 Tenu janamdin diyan lakh lakh vadhaiyan, meri Ladoo!
            </p>
            <p className="handwritten ck-msg-en">
              Happiest Birthday to the most special sister! 🎂💕
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
