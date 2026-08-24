import { useState } from 'react';
import './BalloonRelease.css';

const wishes = [
  { text: 'Happiness', pa: 'ਖ਼ੁਸ਼ੀਆਂ', emoji: '💕', color: '#e84393' },
  { text: 'Success', pa: 'ਕਾਮਯਾਬੀ', emoji: '⭐', color: '#f9ca24' },
  { text: 'Love', pa: 'ਪਿਆਰ', emoji: '❤️', color: '#ff7675' },
  { text: 'Health', pa: 'ਸਿਹਤ', emoji: '🌿', color: '#00b894' },
  { text: 'Laughter', pa: 'ਹਾਸੇ', emoji: '😂', color: '#fd79a8' },
  { text: 'Dreams', pa: 'ਸੁਪਨੇ', emoji: '🌙', color: '#a29bfe' },
  { text: 'Peace', pa: 'ਸ਼ਾਂਤੀ', emoji: '🕊️', color: '#74b9ff' },
  { text: 'Strength', pa: 'ਤਾਕਤ', emoji: '💪', color: '#e17055' },
  { text: 'Joy', pa: 'ਖ਼ੁਸ਼ੀ', emoji: '🎉', color: '#fdcb6e' },
  { text: 'Wisdom', pa: 'ਸਿਆਣਪ', emoji: '🧠', color: '#6c5ce7' },
  { text: 'Courage', pa: 'ਹਿੰਮਤ', emoji: '🦁', color: '#fab1a0' },
  { text: 'Kindness', pa: 'ਦਿਆਲਤਾ', emoji: '🤗', color: '#fd79a8' },
  { text: 'Adventure', pa: 'ਸਾਹਸ', emoji: '🚀', color: '#00cec9' },
  { text: 'Faith', pa: 'ਵਿਸ਼ਵਾਸ', emoji: '🙏', color: '#ffeaa7' },
  { text: 'Freedom', pa: 'ਆਜ਼ਾਦੀ', emoji: '🦋', color: '#81ecec' },
  { text: 'Blessings', pa: 'ਅਸ਼ੀਰਵਾਦ', emoji: '✨', color: '#dfe6e9' },
  { text: 'Fortune', pa: 'ਕਿਸਮਤ', emoji: '🍀', color: '#55efc4' },
  { text: 'Magic', pa: 'ਜਾਦੂ', emoji: '🪄', color: '#a29bfe' },
  { text: 'Growth', pa: 'ਤਰੱਕੀ', emoji: '🌱', color: '#00b894' },
  { text: 'Forever Bond', pa: 'ਹਮੇਸ਼ਾ ਦਾ ਰਿਸ਼ਤਾ', emoji: '🤝', color: '#e84393' },
];

export default function BalloonRelease() {
  const [released, setReleased] = useState(false);

  const handleRelease = () => {
    if (!released) setReleased(true);
  };

  return (
    <section className="bl-section">
      <div className="section-wrap">
        <h2 className="bl-title punjabi-heading golden-glow">🎈 20 ਦੁਆਵਾਂ ਤੇਰੇ ਲਈ</h2>
        <p className="bl-sub handwritten">20 wishes for your 20th year — tap to release!</p>

        <div className="bl-grid">
          {wishes.map((w, i) => (
            <div
              key={i}
              className={`bl-balloon ${released ? 'bl-fly' : ''}`}
              style={{
                '--bl-color': w.color,
                '--bl-delay': `${i * 0.15}s`,
                '--bl-x': `${(Math.random() - 0.5) * 60}px`,
              } as React.CSSProperties}
            >
              <div className="bl-ball">{w.emoji}</div>
              <div className="bl-tag">
                <span className="bl-tag-en">{w.text}</span>
                <span className="bl-tag-pa punjabi-body">{w.pa}</span>
              </div>
              <div className="bl-string" />
            </div>
          ))}
        </div>

        {!released && (
          <button className="bl-btn" onClick={handleRelease}>
            🎈 Release the Wishes!
          </button>
        )}
        {released && (
          <p className="bl-msg handwritten">
            May all 20 wishes come true for you, meri Ladoo! 💕
          </p>
        )}
      </div>
    </section>
  );
}
