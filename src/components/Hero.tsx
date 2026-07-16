import { motion } from 'framer-motion';
import { useIsDesktop, useWindowSize } from '../hooks/useResponsive';
import './Hero.css';
import { bride, groom, weddingDate } from '../data/content';

export default function Hero() {
  const isDesktop = useIsDesktop();
  const { height } = useWindowSize();

  const monogramText = `  ${groom.name}  &  ${bride.name}  •  ${weddingDate}  •`;

  return (
    <section className="hero" style={{ height: height || '100vh' }}>
      <div className="hero__bg" />
      <div className="hero__bg-texture" />

      <div className={`hero__content ${isDesktop ? 'hero__content--desktop' : 'hero__content--mobile'}`}>
        <motion.div
          className="hero__eyebrow-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow">THE WEDDING OF</span>
        </motion.div>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {groom.name}
        </motion.h1>

        <motion.div
          className="hero__ampersand-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="hero__ampersand-line" />
          <span className="hero__ampersand">&amp;</span>
          <span className="hero__ampersand-line" />
        </motion.div>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {bride.name}
        </motion.h1>

        <motion.p
          className="hero__date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {weddingDate}
        </motion.p>
      </div>

      <div className={isDesktop ? 'hero__monogram hero__monogram--desktop' : 'hero__monogram hero__monogram--mobile'}>
        <SpinningMonogram size={isDesktop ? 140 : 100} text={monogramText} />
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="hero__scroll-label">SCROLL</span>
        <motion.span
          className="hero__scroll-line"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function SpinningMonogram({ size, text }: { size: number; text: string }) {
  const radius = size / 2 - 8;
  const textRadius = radius - 3;
  const anglePerChar = (2 * Math.PI) / text.length;

  return (
    <motion.div
      className="monogram"
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{
        opacity: { delay: 2, duration: 1.5 },
        rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(181,154,114,0.6)"
          strokeWidth={0.5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 6}
          fill="none"
          stroke="rgba(181,154,114,0.6)"
          strokeWidth={0.5}
        />
        {text.split('').map((char, i) => {
          const angle = -Math.PI / 2 + i * anglePerChar;
          const x = size / 2 + textRadius * Math.cos(angle);
          const y = size / 2 + textRadius * Math.sin(angle);
          const rotateDeg = (angle * 180) / Math.PI + 90;
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize={9}
              fill="#B59A72"
              fontFamily="Inter"
              fontWeight={500}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rotateDeg} ${x} ${y})`}
            >
              {char}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
}
