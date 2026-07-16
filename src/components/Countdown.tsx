import { useEffect, useState } from 'react';
import Header from './Header';
import { useIsDesktop } from '../hooks/useResponsive';
import './Countdown.css';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: CountdownProps) {
  const isDesktop = useIsDesktop();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculate(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const blocks = [
    { value: pad(timeLeft.days), label: 'NGÀY' },
    { value: pad(timeLeft.hours), label: 'GIỜ' },
    { value: pad(timeLeft.minutes), label: 'PHÚT' },
    { value: pad(timeLeft.seconds), label: 'GIÂY' },
  ];

  return (
    <div className={`countdown ${isDesktop ? 'countdown--desktop' : 'countdown--mobile'}`}>
      <Header title="SAVE THE DATE" subtitle="Cùng Đếm Ngược" />
      <div className="countdown__gap" />
      <div className="countdown__row">
        {blocks.map((block, i) => (
          <div key={block.label} className="countdown__group">
            {i > 0 && <CountdownDivider />}
            <TimeBlock value={block.value} label={block.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownDivider() {
  return (
    <div className="countdown-divider">
      <span className="countdown-divider__dot" />
      <span className="countdown-divider__dot" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="time-block">
      <span className="time-block__value">{value}</span>
      <span className="time-block__rule" />
      <span className="time-block__label">{label}</span>
    </div>
  );
}
