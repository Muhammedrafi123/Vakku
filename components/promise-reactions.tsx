"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, Flame, AlertCircle, CheckCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocalUser } from "@/hooks/use-local-user";

const REACTIONS = [
  { type: "agree",     Icon: ThumbsUp,    label: "Agree",     activeColor: "#22c55e" },
  { type: "important", Icon: Flame,       label: "Important", activeColor: "#f59e0b" },
  { type: "concerned", Icon: AlertCircle, label: "Concerned", activeColor: "#ef4444" },
  { type: "done",      Icon: CheckCheck,  label: "Delivered", activeColor: "#3b82f6" },
] as const;

export function PromiseReactions({ promiseId }: { promiseId: string }) {
  const { userId }                  = useLocalUser();
  const [counts,  setCounts]        = useState<Record<string, number>>({});
  const [mine,    setMine]          = useState<Set<string>>(new Set());
  const [ready,   setReady]         = useState(false);
  const [pending, setPending]       = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase
      .from("reactions")
      .select("type, user_id")
      .eq("promise_id", promiseId)
      .then(({ data }) => {
        const c: Record<string, number> = {};
        const m = new Set<string>();
        for (const row of data ?? []) {
          c[row.type] = (c[row.type] ?? 0) + 1;
          if (userId && row.user_id === userId) m.add(row.type);
        }
        setCounts(c);
        setMine(m);
        setReady(true);
      });
  }, [promiseId, userId]);

  async function toggle(type: string) {
    if (!supabase || !userId || pending) return;
    setPending(type);
    if (mine.has(type)) {
      await supabase.from("reactions").delete()
        .eq("promise_id", promiseId).eq("user_id", userId).eq("type", type);
      setMine((p) => { const s = new Set(p); s.delete(type); return s; });
      setCounts((p) => ({ ...p, [type]: Math.max(0, (p[type] ?? 1) - 1) }));
    } else {
      await supabase.from("reactions").insert({ promise_id: promiseId, user_id: userId, type });
      setMine((p) => new Set([...p, type]));
      setCounts((p) => ({ ...p, [type]: (p[type] ?? 0) + 1 }));
    }
    setPending(null);
  }

  return (
    <div className="rxn-row">
      {REACTIONS.map(({ type, Icon, label, activeColor }) => {
        const on    = mine.has(type);
        const count = counts[type] ?? 0;
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            disabled={!supabase || !ready || !userId || pending === type}
            className={`rxn-btn${on ? " rxn-btn--on" : ""}`}
            style={on ? { borderColor: activeColor + "55", background: activeColor + "12" } : undefined}
            aria-label={`${label}${count ? ` — ${count}` : ""}`}
          >
            <Icon
              size={15}
              strokeWidth={2}
              style={{ color: on ? activeColor : undefined }}
            />
            <span className="rxn-lbl" style={on ? { color: activeColor } : undefined}>
              {label}
            </span>
            {count > 0 && (
              <span
                className="rxn-cnt"
                style={on ? { background: activeColor + "22", color: activeColor } : undefined}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
