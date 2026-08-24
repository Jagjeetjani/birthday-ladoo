import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useCountdown } from '../hooks/useCountdown';
import './CountdownTimer.css';

interface Props { targetDate: string; }

export default function CountdownTimer({ targetDate }: Props) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const units = [
    { val: days, en: 'Days', pa: 'Din' },
    { val: hours, en: 'Hours', pa: 'Ghante' },
    { val: minutes, en: 'Minutes', pa: 'Mint' },
    { val: seconds, en: 'Seconds', pa: 'Second' },
  ];

  return (
    <section className="cd-section" ref={sectionRef}>
      <div className="section-wrap">
        <motion.h2
          className="cd-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          ⏳ Ulti Ginti Shuru!
        </motion.h2>
        <motion.p
          className="cd-sub handwritten"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The countdown to something magical...
        </motion.p>

        {isPast ? (
          <motion.div
            className="cd-celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <div className="cd-big-emoji">🎉</div>
            <h3 className="cd-celeb-title">Ajj tera din hai, meri Ladoo!</h3>
            <p className="cd-celeb-text heading">Happy 20th Birthday Mahakpreet! 🎂</p>
          </motion.div>
        ) : (
          <div className="cd-grid">
            {units.map((u, i) => (
              <motion.div
                className="cd-card liquid-glass"
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.7 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, type: 'spring', stiffness: 200 }}
              >
                <span className="cd-num heading">{String(u.val).padStart(2, '0')}</span>
                <div className="cd-labels">
                  <span className="cd-label-en">{u.en}</span>
                  <span className="cd-label-pa">{u.pa}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="cd-rakhi liquid-glass"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="cd-rakhi-emoji">🎀</span>
          <div>
            <p className="cd-rakhi-en handwritten">Rakshabandhan + Birthday = Double Celebration!</p>
            <p className="cd-rakhi-pa">Dohri khushi! 🎉</p>
          </div>
          <span className="cd-rakhi-emoji">🪢</span>
        </motion.div>
      </div>
    </section>
  );
}
