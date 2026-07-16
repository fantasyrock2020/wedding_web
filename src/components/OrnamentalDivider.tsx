import './OrnamentalDivider.css';

interface OrnamentalDividerProps {
  color?: string;
}

export default function OrnamentalDivider({ color }: OrnamentalDividerProps) {
  const lineColor = color ?? 'rgba(181, 154, 114, 0.4)';

  return (
    <div className="ornamental-divider">
      <span className="ornamental-divider__line" style={{ background: lineColor }} />
      <span className="ornamental-divider__diamond" style={{ borderColor: lineColor }} />
      <span className="ornamental-divider__line" style={{ background: lineColor }} />
    </div>
  );
}
