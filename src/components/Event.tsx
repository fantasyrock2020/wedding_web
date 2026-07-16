import { useState } from 'react';
import Section from './Section';
import Header from './Header';
import RevealOnScroll from './RevealOnScroll';
import { useIsDesktop } from '../hooks/useResponsive';
import type { EventItem } from '../types';
import './Event.css';
import { events } from '../data/content';

export default function Event() {
  const isDesktop = useIsDesktop();

  return (
    <Section header={<Header title="CELEBRATION" subtitle={'Thời Gian\n& Địa Điểm'} />}>
      {isDesktop ? (
        <div className="event event--desktop">
          <RevealOnScroll delay={200}>
            <EventColumn event={events[0]} borderSide="right" />
          </RevealOnScroll>
          <RevealOnScroll delay={400}>
            <EventColumn event={events[1]} borderSide="none" />
          </RevealOnScroll>
        </div>
      ) : (
        <div className="event event--mobile">
          <RevealOnScroll delay={200}>
            <EventColumn event={events[0]} borderSide="top" />
          </RevealOnScroll>
          <RevealOnScroll delay={400}>
            <EventColumn event={events[1]} borderSide="top-bottom" />
          </RevealOnScroll>
        </div>
      )}
    </Section>
  );
}

function EventColumn({
  event,
  borderSide,
}: {
  event: EventItem;
  borderSide: 'right' | 'top' | 'top-bottom' | 'none';
}) {
  const isChurch = event.title.includes('Lễ');

  return (
    <div className={`event-column event-column--${borderSide}`}>
      <span className="event-column__icon">{isChurch ? '⛪' : '🍷'}</span>
      <h3 className="event-column__title">{event.title}</h3>
      <span className="event-column__rule" />
      <p className="event-column__date">{event.date.toUpperCase()}</p>
      <p className="event-column__time">{event.time}</p>
      <p className="event-column__location">{event.location}</p>
      <p className="event-column__address">{event.address}</p>
      <MapLink url={event.googleMapsUrl} />
    </div>
  );
}

function MapLink({ url }: { url: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      className="map-link"
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="map-link__row">
        <span className="map-link__text">XEM BẢN ĐỒ</span>
        <span className="map-link__arrow" style={{ marginLeft: hovered ? 8 : 0 }}>
          →
        </span>
      </span>
      <span className="map-link__underline" style={{ width: hovered ? 120 : 0 }} />
    </a>
  );
}
