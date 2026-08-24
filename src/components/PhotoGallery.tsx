import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import './PhotoGallery.css';

const photos = [
  { src: '/img/DC4CE82B-CAE3-4289-80A1-8B8C6A6E305A.JPG', caption: 'Forever & always 🤗' },
  { src: '/img/IMG_0736.JPG', caption: 'Making memories ✨' },
  { src: '/img/IMG_0748.JPG', caption: 'Partners in crime 💕' },
  { src: '/img/IMG_0797.jpg', caption: 'My favourite human 🎀' },
  { src: '/img/IMG_2386.JPG', caption: 'Bestest sister 🌸' },
  { src: '/img/bc237680-250b-4fbe-9c9c-e5a1b8534c00.JPG', caption: 'Khotiiii 🐐' },
];

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const tilts = [-2.5, 1.8, -1.2, 3, -2.8, 1.5];

  return (
    <section className="pg-section" ref={sectionRef}>
      <div className="section-wrap">
        <motion.h2 className="pg-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          📸 Yaadaan Di Kandh
        </motion.h2>
        <motion.p className="pg-sub handwritten"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}>
          Moments we'll cherish forever 💕
        </motion.p>

        <div className="pg-grid">
          {photos.map((p, i) => (
            <motion.div
              className="pg-card"
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.85, rotate: 0 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: tilts[i] } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, type: 'spring', stiffness: 180 }}
              whileHover={{ rotate: 0, scale: 1.08, y: -8 }}
            >
              <div className="pg-pin" />
              <div className="pg-photo">
                <img src={p.src} alt={p.caption} className="pg-img" />
              </div>
              <div className="pg-caption">
                <p className="handwritten">{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
