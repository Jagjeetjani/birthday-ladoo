import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LoveLetter.css';

gsap.registerPlugin(ScrollTrigger);

export default function LoveLetter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [heartRainActive, setHeartRainActive] = useState(false);
  const heartContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const spawnHearts = useCallback(() => {
    if (!heartContainerRef.current) return;
    const hearts = ['❤️', '💕', '💗', '💖', '💓'];
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('div');
      h.className = 'heart-drop';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = `${Math.random() * 100}%`;
      h.style.animationDuration = `${Math.random() * 3 + 3}s`;
      h.style.animationDelay = `${Math.random() * 2}s`;
      h.style.fontSize = `${Math.random() * 0.8 + 0.7}rem`;
      heartContainerRef.current.appendChild(h);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heart rain + shake need ScrollTrigger (can't do with motion)
    const emotionalSection = sectionRef.current.querySelector('.ll-emotional');
    if (emotionalSection) {
      ScrollTrigger.create({
        trigger: emotionalSection, start: 'top 70%', end: 'bottom 30%',
        onEnter: () => { setHeartRainActive(true); spawnHearts(); },
        onLeaveBack: () => setHeartRainActive(false),
      });
    }

    const funItems = sectionRef.current.querySelectorAll('.ll-fun-line');
    funItems.forEach(item => {
      ScrollTrigger.create({
        trigger: item, start: 'top 80%',
        onEnter: () => {
          gsap.to(document.body, {
            keyframes: [
              { x: -3, duration: 0.05 }, { x: 3, duration: 0.05 },
              { x: -2, duration: 0.05 }, { x: 2, duration: 0.05 },
              { x: 0, duration: 0.05 },
            ],
            ease: 'power1.inOut',
          });
        },
        once: true,
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [spawnHearts]);

  const paraVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
    }),
  };

  return (
    <section className="ll-section" ref={sectionRef}>
      <div className={`heart-rain ${heartRainActive ? 'active' : ''}`} ref={heartContainerRef} />

      <div className="section-wrap">
        <motion.h2
          className="ll-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          💌 Dil Di Gall
        </motion.h2>
        <motion.p
          className="ll-sub handwritten"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Words from the Heart
        </motion.p>

        <motion.div
          className="ll-paper"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <span className="ll-flower fl-tl">🌸</span>
          <span className="ll-flower fl-tr">🌺</span>
          <span className="ll-flower fl-bl">🌼</span>
          <span className="ll-flower fl-br">🌷</span>

          <div className="ll-body">
            <motion.p className="ll-greeting handwritten" variants={paraVariants}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              Dear <span className="nick nick-ladoo">Ladoo 🍬</span>{' '}
              <span className="ll-punglish">(Meri pyaari Ladoo)</span>,
            </motion.p>

            <div className="ll-emotional">
              {[
                <>This is your first birthday that we're celebrating together, and guess what — it falls on Rakshabandhan too!{' '}<span className="ll-punglish">Rabb ne kinna sohna din chuniya!</span>{' '}It feels like the birthday of my newborn sister — because that's exactly what you are to me.</>,
                <>We met just some time ago, but the bond I feel with you is deeper than words can describe.{' '}<span className="ll-punglish">Khoon da rishta nahi, par dil da rishta hai</span>{' '}— and that's the purest kind.</>,
                <>Meri <span className="nick nick-khnd">Khnd 🍯</span> — you're sweeter than sugar itself. Because of you, I finally understood what a real sister's love feels like.{' '}<span className="ll-punglish">Jo main hamesha chaunda si, oh tu mainu ditta.</span>{' '}You gave me something I always craved — the warmth of a sister who truly cares.</>,
                <>Thank you for everything, meri <span className="nick nick-jaan">Jaan ❤️</span>. For all the love you pour into my life. For shaping me, improving me, making me better.{' '}<span className="ll-punglish">Teri wajah naal main behtar banda ban riha haan.</span></>,
                <>I pray we always stay together, that this love never changes.{' '}<span className="ll-punglish">Eh pyaar hamesha injh hi rahe.</span>{' '}The fights will never stop — because I LOVE irritating you 😤😂 and that's never changing! You're meri little <span className="nick nick-khotti">Khotti 🐐</span> — stubborn, ziddi, but that's what makes you YOU.</>,
                <>You will ALWAYS be my small child, my chhoti bhain — no matter how old you get.{' '}<span className="ll-punglish">Tu mere layi hamesha chhoti bachchi hi rehengi 👶💕</span></>,
                <>May God bless you this year with all the happiness you dream of.</>,
              ].map((content, i) => (
                <motion.p key={i} className="ll-para handwritten" variants={paraVariants}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  {content}
                </motion.p>
              ))}
            </div>

            {/* Fun */}
            <motion.div className="ll-fun" initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}>
              <p className="ll-fun-header handwritten">AND MOST IMPORTANTLY... 😤</p>
              {[
                ['"Vadde bhai ton dar ke rehna painna!"', '😎'],
                ['"Meri izzat karya kr!"', '🫡'],
                ['"Te rabb es saal tenu dimaag vi bakhshe!"', '🧠😂'],
              ].map(([q, e], i) => (
                <div key={i} className="ll-fun-line">
                  <span className="ll-fun-quote">{q}</span>
                  <span className="ll-fun-emoji">{e}</span>
                </div>
              ))}
            </motion.div>

            {/* Sign off */}
            <motion.div className="ll-signoff" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}>
              <p className="handwritten ll-signoff-main">Happy 20th Birthday, Mahakpreet Kaur!</p>
              <p className="ll-signoff-pa">Janamdin Mubaarak, meri Ladoo! 🎂💕</p>
              <div className="ll-signoff-line" />
              <p className="ll-signoff-from">
                — Tera Vadda Bhai <span className="handwritten">(Your Big Brother)</span> ❤️
              </p>
            </motion.div>
          </div>

          <div className="ll-seal"><span>❤️</span></div>
        </motion.div>
      </div>
    </section>
  );
}
