import { motion } from 'motion/react';
import { useCountdown } from '../hooks/useCountdown';
import './LockScreen.css';

interface Props { targetDate: Date; }

export default function LockScreen({ targetDate }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate.toISOString());

  const units = [
    { val: days, label: 'Days' },
    { val: hours, label: 'Hours' },
    { val: minutes, label: 'Minutes' },
    { val: seconds, label: 'Seconds' },
  ];

  const floats = ['🎂','🌸','💕','✨','🎁','🪔','💫','🎀','🌺','💖','🎉','🪷'];

  return (
    <div className="lock-screen">
      {/* Video background */}
      <video
        className="lock-video"
        autoPlay loop muted playsInline
        src="https://cdn.pixabay.com/video/2024/02/16/200834-913476493_large.mp4"
      />
      <div className="lock-overlay" />

      {/* Floating elements */}
      <div className="lock-floats">
        {floats.map((el, i) => (
          <div key={i} className={`lock-float lf-${i + 1}`}>{el}</div>
        ))}
      </div>

      <div className="lock-content">
        <motion.div
          className="lock-card liquid-glass"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          <motion.div
            className="lock-gift"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎁
          </motion.div>

          <h1 className="lock-title heading">Something Special</h1>
          <h2 className="lock-title-sub heading">is Coming...</h2>

          <p className="lock-msg handwritten">
            A birthday surprise is being prepared for someone very special 💕
          </p>

          <div className="lock-timer">
            {units.map((u, i) => (
              <motion.div
                className="lock-unit"
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15, type: 'spring' }}
              >
                <span className="lock-num heading">{String(u.val).padStart(2, '0')}</span>
                <span className="lock-label">{u.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="lock-date handwritten"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Reveals on August 28, 2026 🎂
          </motion.p>

          <div className="lock-hearts">
            {['💕','✨','💕'].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {h}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
