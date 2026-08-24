import { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const playingRef = useRef(false);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const C4=261.63,D4=293.66,E4=329.63,F4=349.23,G4=392,A4=440,Bb4=466.16,C5=523.25;
  const melody = [
    {n:C4,d:300},{n:C4,d:100},{n:D4,d:400},{n:C4,d:400},{n:F4,d:400},{n:E4,d:800},
    {n:C4,d:300},{n:C4,d:100},{n:D4,d:400},{n:C4,d:400},{n:G4,d:400},{n:F4,d:800},
    {n:C4,d:300},{n:C4,d:100},{n:C5,d:400},{n:A4,d:400},{n:F4,d:400},{n:E4,d:400},{n:D4,d:400},
    {n:Bb4,d:300},{n:Bb4,d:100},{n:A4,d:400},{n:F4,d:400},{n:G4,d:400},{n:F4,d:800},
  ];

  const play = async () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    gainRef.current = ctx.createGain();
    gainRef.current.gain.value = 0.08;
    gainRef.current.connect(ctx.destination);
    playingRef.current = true;

    const next = (i: number) => {
      if (!playingRef.current) return;
      const note = melody[i];
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.n, ctx.currentTime);
      osc.connect(gainRef.current!);
      osc.start();
      osc.stop(ctx.currentTime + (note.d / 1000) * 0.9);
      oscRef.current = osc;
      setTimeout(() => { if (playingRef.current) next((i + 1) % melody.length); }, note.d);
    };
    next(0);
  };

  const stop = () => {
    playingRef.current = false;
    try { oscRef.current?.stop(); } catch {}
    try { oscRef.current?.disconnect(); } catch {}
    try { gainRef.current?.disconnect(); } catch {}
  };

  const toggle = () => {
    if (playing) { stop(); setPlaying(false); }
    else { play(); setPlaying(true); }
  };

  useEffect(() => { return () => { stop(); ctxRef.current?.close(); }; }, []);

  return (
    <div className="mp-wrap">
      <div className="mp-tooltip">🎶 Birthday Music</div>
      <button className={`mp-btn liquid-glass ${playing ? 'mp-active' : ''}`} onClick={toggle} aria-label="Toggle Music">
        {!playing ? <span className="mp-icon">🎵</span> : (
          <div className="mp-eq">
            <span className="mp-bar" /><span className="mp-bar" /><span className="mp-bar" /><span className="mp-bar" />
          </div>
        )}
      </button>
      <span className="mp-label">Music</span>
    </div>
  );
}
