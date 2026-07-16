import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import './SubmitButton.css';

type SubmitState = 'idle' | 'loading' | 'success';

interface SubmitButtonProps {
  onPressed: () => Promise<void>;
}

export default function SubmitButton({ onPressed }: SubmitButtonProps) {
  const [state, setState] = useState<SubmitState>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onPressed();
      setState('success');

      setTimeout(() => {
        const rect = buttonRef.current?.getBoundingClientRect();
        const origin = rect
          ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
          : { x: 0.5, y: 0.5 };
        confetti({
          particleCount: 60,
          spread: 360,
          startVelocity: 25,
          origin,
          colors: ['#D4AF37', '#F5E6CA', '#ffffff'],
        });
      }, 200);
    } catch (error) {
      setState('idle');
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className="submit-button"
      onClick={handleClick}
      disabled={state !== 'idle'}
      whileTap={state === 'idle' ? { scale: 0.95 } : undefined}
    >
      {state === 'loading' && <span className="submit-button__spinner" />}
      {state === 'success' && <Checkmark />}
      {state === 'idle' && <span className="submit-button__label">Confirm</span>}
    </motion.button>
  );
}

function Checkmark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <motion.path
        d="M 4.8 12 L 10.8 18 L 19.2 7.2"
        fill="none"
        stroke="#fff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </svg>
  );
}
