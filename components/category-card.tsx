import Link from "next/link";
import {
  Briefcase,
  Bus,
  Cpu,
  Fish,
  Gavel,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  Leaf,
  Music2,
  Shield,
  ShieldCheck,
  TreePine,
  Users,
  Zap,
} from "lucide-react";
import { categoryToSlug } from "@/lib/seo";
import type { Category } from "@/lib/types";

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  "Social Welfare":    <Users         size={16} strokeWidth={1.75} />,
  "Healthcare":        <Heart         size={16} strokeWidth={1.75} />,
  "Education":         <GraduationCap size={16} strokeWidth={1.75} />,
  "Employment":        <Briefcase     size={16} strokeWidth={1.75} />,
  "Agriculture":       <Leaf          size={16} strokeWidth={1.75} />,
  "Fisheries":         <Fish          size={16} strokeWidth={1.75} />,
  "Women Empowerment": <ShieldCheck   size={16} strokeWidth={1.75} />,
  "Youth Development": <Zap           size={16} strokeWidth={1.75} />,
  "Housing":           <Home          size={16} strokeWidth={1.75} />,
  "Infrastructure":    <Landmark      size={16} strokeWidth={1.75} />,
  "Transport":         <Bus           size={16} strokeWidth={1.75} />,
  "Energy":            <Zap           size={16} strokeWidth={1.75} />,
  "Tourism":           <Globe         size={16} strokeWidth={1.75} />,
  "Technology":        <Cpu           size={16} strokeWidth={1.75} />,
  "Environment":       <TreePine      size={16} strokeWidth={1.75} />,
  "Governance":        <Gavel         size={16} strokeWidth={1.75} />,
  "Law & Order":       <Shield        size={16} strokeWidth={1.75} />,
  "Culture & Sports":  <Music2        size={16} strokeWidth={1.75} />,
};

export function CategoryCard({
  category,
  total,
  fulfilled,
  inProgress,
  notStarted,
  index = 0,
}: {
  category: Category;
  total: number;
  fulfilled: number;
  inProgress: number;
  notStarted: number;
  index?: number;
}) {
  const fulfilledPct  = total ? (fulfilled  / total) * 100 : 0;
  const inProgressPct = total ? (inProgress / total) * 100 : 0;
  const actedPct      = Math.min(100, fulfilledPct + inProgressPct);

  return (
    <Link
      href={`/category/${categoryToSlug(category)}`}
      className="cat-card"
      style={{ "--cat-delay": `${index * 35}ms` } as React.CSSProperties}
    >
      {/* Icon + name */}
      <div className="cat-card-head">
        <span className="cat-card-icon" aria-hidden>{CATEGORY_ICONS[category]}</span>
        <span className="cat-card-name">{category}</span>
      </div>

      {/* Big number */}
      <div className="cat-card-num">
        {total.toLocaleString()}
        <span className="cat-card-num-label">promises</span>
      </div>

      {/* Segmented progress bar */}
      <div className="cat-card-bar-wrap">
        <div
          className="cat-card-bar"
          role="progressbar"
          aria-valuenow={Math.round(actedPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${Math.round(actedPct)}% acted upon`}
        >
          <div className="cat-card-bar-fulfilled"  style={{ width: `${fulfilledPct}%`  }} />
          <div className="cat-card-bar-inprogress" style={{ width: `${inProgressPct}%` }} />
        </div>
        <span className="cat-card-bar-pct">{Math.round(actedPct)}%</span>
      </div>

      {/* Stats */}
      <div className="cat-card-stats">
        <span className="cat-card-stat cat-card-stat--green">
          <span className="cat-card-stat-val">{fulfilled}</span>
          <span className="cat-card-stat-key">Done</span>
        </span>
        <span className="cat-card-stat cat-card-stat--amber">
          <span className="cat-card-stat-val">{inProgress}</span>
          <span className="cat-card-stat-key">Active</span>
        </span>
        <span className="cat-card-stat cat-card-stat--gray">
          <span className="cat-card-stat-val">{notStarted}</span>
          <span className="cat-card-stat-key">Waiting</span>
        </span>
      </div>
    </Link>
  );
}
