import OrnamentalDivider from './OrnamentalDivider';
import './Header.css';

interface HeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  color?: string;
}

export default function Header({ title, subtitle, description, color }: HeaderProps) {
  return (
    <div className="header-widget">
      <OrnamentalDivider color={color} />
      <p className="header-widget__eyebrow" style={color ? { color } : undefined}>
        {title}
      </p>
      <h2 className="header-widget__subtitle">
        {subtitle.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < subtitle.split('\n').length - 1 && <br />}
          </span>
        ))}
      </h2>
      {description && <p className="header-widget__description">{description}</p>}
      <OrnamentalDivider color={color} />
    </div>
  );
}
