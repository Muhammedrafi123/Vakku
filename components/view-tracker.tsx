"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocalUser } from "@/hooks/use-local-user";

export function ViewTracker({ promiseId }: { promiseId: string }) {
  const { userId }          = useLocalUser();
  const [views, setViews]   = useState<number>(0);
  const [ready, setReady]   = useState(false);

  useEffect(() => {
    if (!supabase) return;

    // Always load the count first (visible immediately)
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .eq("promise_id", promiseId)
      .then(({ count }) => {
        setViews(count ?? 0);
        setReady(true);
      });
  }, [promiseId]);

  useEffect(() => {
    if (!supabase || !userId) return;
    const client = supabase;

    // Upsert this user's view silently in background
    client
      .from("page_views")
      .upsert(
        { promise_id: promiseId, user_id: userId },
        { onConflict: "promise_id,user_id" },
      )
      .then(() => {
        // Re-fetch updated count
        client
          .from("page_views")
          .select("id", { count: "exact", head: true })
          .eq("promise_id", promiseId)
          .then(({ count }) => setViews(count ?? 0));
      });
  }, [promiseId, userId]);

  if (!ready) return null;

  return (
    <div className="vt-pill">
      <Eye size={12} strokeWidth={2} aria-hidden />
      <span>
        {views.toLocaleString()} {views === 1 ? "person" : "people"} viewed
      </span>
    </div>
  );
}
