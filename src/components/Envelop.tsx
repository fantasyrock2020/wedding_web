import { useEffect, useState } from 'react';

/**
 * EnvelopeReveal
 * -----------------
 * Plays a one-time envelope-opening animation on mount, then reveals
 * the wedding invite content. Drop this at the top of your page/route.
 *
 * Usage:
 *   <EnvelopeReveal names="Anna & Minh" onOpened={() => {}}>
 *     <YourInviteContent />
 *   </EnvelopeReveal>
 */

interface EnvelopeRevealProps {
  /** Couple's names shown on the front of the envelope */
  names: string;
  /** The actual invite content to reveal once the letter is "opened" */
  children: React.ReactNode;
  /** Called once the open animation finishes */
  onOpened?: () => void;
}

export default function EnvelopeReveal({ names, children, onOpened }: EnvelopeRevealProps) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open'>('closed');

  useEffect(() => {
    // Kick off the sequence shortly after mount so the closed state
    // is visible for a beat before it starts opening.
    const t1 = setTimeout(() => setStage('opening'), 400);
    const t2 = setTimeout(() => {
      setStage('open');
      onOpened?.();
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onOpened]);

  return (
    <div className="envelope-stage">
      <style>{`
        .envelope-stage {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #EFE7D8;
          overflow: hidden;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* ---------- Envelope ---------- */
        .envelope {
          position: relative;
          width: 320px;
          height: 220px;
          z-index: 2;
        }
        .envelope-stage[data-stage="open"] .envelope {
          animation: envelopeFade 0.6s ease forwards 1.1s;
        }
        @keyframes envelopeFade {
          to { opacity: 0; visibility: hidden; }
        }

        .envelope-body {
          position: absolute;
          inset: 0;
          background: #8C6E54;
          border-radius: 4px;
          box-shadow: 0 18px 40px #00000030;
        }
        .envelope-names {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F5EFE4;
          font-size: 1.4rem;
          letter-spacing: 0.06em;
          font-style: italic;
        }

        /* Back triangle flap (stays put, sits behind the letter) */
        .flap-back {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 0;
          border-left: 160px solid transparent;
          border-right: 160px solid transparent;
          border-top: 110px solid #7A5D45;
          z-index: 1;
        }

        /* Front flap that swings open like a lid */
        .flap-front {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 110px;
          transform-origin: top center;
          transform: rotateX(0deg);
          transition: transform 1s cubic-bezier(.6,.05,.2,1);
          z-index: 3;
        }
        .envelope-stage[data-stage="opening"] .flap-front,
        .envelope-stage[data-stage="open"] .flap-front {
          transform: rotateX(178deg);
        }
        .flap-front-shape {
          width: 100%;
          height: 100%;
          background: #8C6E54;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          box-shadow: 0 2px 8px #00000020;
        }

        /* Wax seal */
        .wax-seal {
          position: absolute;
          top: 78px;
          left: 50%;
          width: 46px;
          height: 46px;
          margin-left: -23px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #C9924B, #8C5A22);
          box-shadow: 0 3px 6px #00000040, inset 0 0 0 2px #00000015;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s ease, opacity 0.4s ease;
        }
        .wax-seal::after {
          content: '❦';
          color: #F5EFE4;
          font-size: 1.2rem;
        }
        .envelope-stage[data-stage="opening"] .wax-seal,
        .envelope-stage[data-stage="open"] .wax-seal {
          transform: scale(1.15) rotate(12deg);
          opacity: 0;
        }

        /* ---------- Letter ---------- */
        .letter {
          position: absolute;
          left: 50%;
          bottom: 14px;
          width: 280px;
          min-height: 180px;
          transform: translateX(-50%) translateY(0);
          background: #F5EFE4;
          border-radius: 2px;
          box-shadow: 0 10px 30px #00000025;
          z-index: 0;
          padding: 28px 24px;
          transition: transform 1.4s cubic-bezier(.2,.8,.2,1) 0.9s;
        }
        .envelope-stage[data-stage="opening"] .letter,
        .envelope-stage[data-stage="open"] .letter {
          transform: translateX(-50%) translateY(-260px);
          z-index: 5;
        }

        /* ---------- Final content ---------- */
        .invite-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.8s ease 1.6s;
        }
        .envelope-stage[data-stage="open"] .invite-content {
          opacity: 1;
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .flap-front, .letter, .wax-seal, .envelope, .invite-content {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div data-stage={stage} className="envelope-stage" style={{ position: 'absolute', inset: 0 }}>
        <div className="envelope">
          <div className="flap-back" />
          <div className="letter" aria-hidden={stage !== 'open'}>
            <div style={{ textAlign: 'center', color: '#3A2E26' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', margin: 0 }}>You're invited</p>
              <p style={{ fontSize: '1.6rem', margin: '8px 0 0' }}>{names}</p>
            </div>
          </div>
          <div className="envelope-body">
            <div className="envelope-names">{names}</div>
          </div>
          <div className="flap-front">
            <div className="flap-front-shape" />
          </div>
          <div className="wax-seal" />
        </div>

        <div className="invite-content">{children}</div>
      </div>
    </div>
  );
}