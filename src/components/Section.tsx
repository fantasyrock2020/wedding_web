import type { ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';
import './Section.css';

interface SectionProps {
  header: ReactNode;
  children: ReactNode;
}

export default function Section({ header, children }: SectionProps) {
  return (
    <div className="section-widget">
      <div className="section-widget__inner">
        <RevealOnScroll delay={200}>{header}</RevealOnScroll>
        <div className="section-widget__gap" />
        {children}
      </div>
    </div>
  );
}
