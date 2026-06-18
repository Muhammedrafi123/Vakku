import { Coffee, ExternalLink, HeartHandshake } from "lucide-react";

const CHAI_URL = "https://buymeachai.in/vellmont";

type SupportChaiProps = {
  variant?: "band" | "compact" | "footer";
};

export function SupportChai({ variant = "band" }: SupportChaiProps) {
  if (variant === "footer") {
    return (
      <a
        href={CHAI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="chai-footer-link"
      >
        <Coffee size={14} />
        Buy us a chai
        <ExternalLink size={11} />
      </a>
    );
  }

  return (
    <aside className={`chai-card chai-card--${variant}`} aria-label="Support this public tracker">
      <div className="chai-icon" aria-hidden>
        {variant === "compact" ? <Coffee size={18} /> : <HeartHandshake size={20} />}
      </div>
      <div className="chai-copy">
        <p className="chai-kicker">Support the tracker</p>
        <h2 className="chai-title">Help keep this public accountability project running.</h2>
        <p className="chai-text">
          Contributions support hosting, verification time, data cleanup, and the small tools needed to keep
          promise tracking readable for everyone.
        </p>
      </div>
      <a
        href={CHAI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="chai-button"
      >
        <Coffee size={15} />
        Buy us a chai
        <ExternalLink size={12} />
      </a>
    </aside>
  );
}
