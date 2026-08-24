import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import PhotoGallery from './components/PhotoGallery';
import BirthdayCake from './components/BirthdayCake';
import MusicPlayer from './components/MusicPlayer';
import SparkleTrail from './components/SparkleTrail';
import SurpriseModal from './components/SurpriseModal';
import LockScreen from './components/LockScreen';

const particles = ['💕','✨','🌸','🪷','💫','💖','🌺','✨','💕','🌸','💫','🪷','💖','✨'];

const REVEAL_DATE = new Date('2026-08-28T00:00:00+05:30');

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eggCount, setEggCount] = useState(0);
  const [eggShow, setEggShow] = useState(false);
  const modalTriggered = useRef(false);
  const cakeSectionRef = useRef<HTMLDivElement>(null);

  // Check if it's Aug 28 or later
  useEffect(() => {
    const check = () => {
      if (new Date() >= REVEAL_DATE) {
        setIsRevealed(true);
      }
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  // Surprise modal trigger
  useEffect(() => {
    if (!opened) return;
    const handleScroll = () => {
      if (modalTriggered.current) return;
      if (cakeSectionRef.current) {
        const rect = cakeSectionRef.current.getBoundingClientRect();
        if (rect.bottom < 0) {
          modalTriggered.current = true;
          setTimeout(() => setShowModal(true), 1500);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [opened]);

  const handleEgg = () => {
    const next = eggCount + 1;
    setEggCount(next);
    if (next >= 5) { setEggShow(true); setEggCount(0); }
  };

  // Parallax
  const { scrollYProgress } = useScroll();
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxMid = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Show lock screen if not Aug 28 yet
  if (!isRevealed) {
    return <LockScreen targetDate={REVEAL_DATE} />;
  }

  return (
    <>
      <SparkleTrail />

      {!opened && <EnvelopeIntro onOpen={() => setOpened(true)} />}

      <div className={`main-content ${opened ? 'visible' : 'hidden'}`}>
        <motion.div className="global-particles" style={{ y: parallaxSlow }}>
          {particles.map((p, i) => <div key={i} className="gp">{p}</div>)}
        </motion.div>

        <HeroSection />

        <motion.div className="divider" style={{ y: parallaxMid }}>
          <span className="divider-icon">🪔</span>
        </motion.div>

        <CountdownTimer targetDate="2026-08-28T00:00:00+05:30" />

        <motion.div className="divider" style={{ y: parallaxMid }}>
          <span className="divider-icon">✨</span>
        </motion.div>

        <PhotoGallery />

        <motion.div className="divider" style={{ y: parallaxMid }}>
          <span className="divider-icon">🪔</span>
        </motion.div>

        <div ref={cakeSectionRef}>
          <BirthdayCake />
        </div>

        <MusicPlayer />

        {/* Liquid Glass Footer */}
        <motion.footer
          className="site-footer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' as const }}
        >
          <div className="footer-glass liquid-glass">
            <p className="footer-text">
              Made with{' '}
              <span className="footer-heart" onClick={handleEgg}>💕</span>
              {' '}by your Veer
            </p>
            <p className="footer-sub">
              Love from vadda bhai 🤗
            </p>
            <div className={`footer-egg ${eggShow ? 'show' : ''}`}>
              <p>
                You found the secret! 🤫 Tu sach mein bohut khotti hai jo itna scroll karke idhar tak aayi 😂❤️
              </p>
            </div>
          </div>
        </motion.footer>

        <SurpriseModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </>
  );
}

export default App;
