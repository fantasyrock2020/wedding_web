import Section from './Section';
import Header from './Header';
import RevealOnScroll from './RevealOnScroll';
import { useIsDesktop } from '../hooks/useResponsive';
import type { StoryItem } from '../types';
import './Story.css';
import { stories } from '../data/content';

export default function Story() {
  return (
    <Section header={<Header title="OUR STORY" subtitle={'Hành Trình\nTình Yêu'} />}>
      <div className="story">
        {stories.map((item, index) => (
          <div key={item.title} className="story__block-wrap">
            <StoryBlock item={item} index={index} isReversed={index % 2 === 1} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function StoryBlock({
  item,
  index,
  isReversed,
}: {
  item: StoryItem;
  index: number;
  isReversed: boolean;
}) {
  const isDesktop = useIsDesktop();
  const number = `0${index + 1}`;

  if (!isDesktop) {
    return (
      <RevealOnScroll>
        <div className="story-block story-block--mobile">
          <div className="story-arch">
            <img src={item.image} alt={item.title} />
          </div>
          <span className="story-block__number">{number}</span>
          <h3 className="story-block__title">{item.title}</h3>
          <p className="story-block__subtitle">{item.subtitle}</p>
        </div>
      </RevealOnScroll>
    );
  }

  const imageCol = (
    <RevealOnScroll delay={200}>
      <div className="story-arch story-arch--desktop">
        <img src={item.image} alt={item.title} />
      </div>
    </RevealOnScroll>
  );

  const textCol = (
    <RevealOnScroll delay={300}>
      <div
        className="story-text"
        style={{ alignItems: isReversed ? 'flex-end' : 'flex-start' }}
      >
        <span className="story-block__number">{number}</span>
        <h3
          className="story-block__title story-block__title--desktop"
          style={{ textAlign: isReversed ? 'right' : 'left' }}
        >
          {item.title}
        </h3>
        <span className="story-block__rule" />
        <p
          className="story-block__subtitle story-block__subtitle--desktop"
          style={{ textAlign: isReversed ? 'right' : 'left' }}
        >
          {item.subtitle}
        </p>
      </div>
    </RevealOnScroll>
  );

  return (
    <div className="story-block story-block--desktop">
      <div className={`story-block__image ${isReversed ? 'story-block__image--right' : 'story-block__image--left'}`}>
        {imageCol}
      </div>
      <div className={`story-block__text-pos ${isReversed ? 'story-block__text-pos--left' : 'story-block__text-pos--right'}`}>
        {textCol}
      </div>
    </div>
  );
}
