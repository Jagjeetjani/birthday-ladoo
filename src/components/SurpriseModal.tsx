import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './SurpriseModal.css';

interface Props { show: boolean; onClose: () => void; }

export default function SurpriseModal({ show, onClose }: Props) {
  const [revealed, setRevealed] = useState(false);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}>
        <motion.div className="modal-box liquid-glass"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}>
          {!revealed ? (
            <div>
              <motion.span className="modal-gift"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                🎁
              </motion.span>
              <p className="modal-tease-title handwritten">One last surprise...</p>
              <motion.button className="modal-reveal-btn"
                onClick={() => setRevealed(true)}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                Open it! 💕
              </motion.button>
            </div>
          ) : (
            <motion.div className="modal-reveal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}>
              <p className="modal-promise">
                Main vaada karda haan...
              </p>
              <p className="modal-promise-sub handwritten">(I promise...)</p>
              <div className="modal-msg">
                <p>
                  Chahe kitne saal beet jaayein, chahe kitni door ho jaayein —
                  this bond is forever.
                </p>
                <p className="modal-msg-pa handwritten">
                  Eh rishta hamesha rahega. Tu meri Ladoo si, hai, te hamesha rehengi. 💕
                </p>
                <p className="handwritten modal-final">
                  Happy Birthday, Mahakpreet Kaur ❤️
                </p>
              </div>
              <motion.button className="modal-close-btn" onClick={onClose}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Close with Love 💕
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
