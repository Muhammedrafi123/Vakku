"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, type Comment } from "@/lib/supabase";
import { useLocalUser } from "@/hooks/use-local-user";
import { MessageCircle, Send, Loader2 } from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function Avatar({ name }: { name: string }) {
  const initials = name.trim().split(" ").slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const colors = ["#E8821A","#2563eb","#16a34a","#9333ea","#dc2626","#0891b2"];
  const color  = colors[name.charCodeAt(0) % colors.length];
  return (
    <span
      style={{ background: color }}
      className="cmnt-avatar"
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function PromiseComments({ promiseId }: { promiseId: string }) {
  const { userId, userName, setUserName } = useLocalUser();
  const [comments,  setComments]  = useState<Comment[]>([]);
  const [loading,   setLoading]   = useState(Boolean(supabase));
  const [body,      setBody]      = useState("");
  const [nameInput, setNameInput] = useState("");
  const [posting,   setPosting]   = useState(false);
  const [showName,  setShowName]  = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  /* Load comments */
  useEffect(() => {
    if (!supabase) return;

    supabase
      .from("comments")
      .select("*")
      .eq("promise_id", promiseId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setComments((data as Comment[]) ?? []);
        setLoading(false);
      });
  }, [promiseId]);

  async function handlePost() {
    if (!supabase || !body.trim() || !userId) return;

    /* First time — ask for name */
    if (!userName) {
      setShowName(true);
      return;
    }

    setPosting(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({ promise_id: promiseId, user_id: userId, user_name: userName, body: body.trim() })
      .select()
      .single();

    if (!error && data) {
      setComments((prev) => [data as Comment, ...prev]);
      setBody("");
    }
    setPosting(false);
  }

  async function handleNameSubmit() {
    if (!supabase || !nameInput.trim()) return;
    setUserName(nameInput);
    setShowName(false);
    /* Now post */
    if (!userId) return;
    setPosting(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({ promise_id: promiseId, user_id: userId, user_name: nameInput.trim(), body: body.trim() })
      .select()
      .single();
    if (!error && data) {
      setComments((prev) => [data as Comment, ...prev]);
      setBody("");
    }
    setPosting(false);
  }

  return (
    <div className="cmnt-root">
      {/* Header */}
      <div className="cmnt-header">
        <MessageCircle size={15} />
        <span>Community Discussion</span>
        {!loading && (
          <span className="cmnt-count">{comments.length}</span>
        )}
      </div>

      {/* Name prompt overlay */}
      {showName && (
        <div className="cmnt-name-prompt">
          <p className="cmnt-name-heading">What should we call you?</p>
          <p className="cmnt-name-sub">Saved locally — no account needed.</p>
          <input
            className="cmnt-name-input"
            placeholder="Your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            autoFocus
            maxLength={40}
          />
          <button
            className="cmnt-name-btn"
            onClick={handleNameSubmit}
            disabled={!nameInput.trim()}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Compose box */}
      <div className="cmnt-compose">
        {userName && <Avatar name={userName} />}
        <div className="cmnt-compose-right">
          {userName && (
            <span className="cmnt-compose-name">{userName}</span>
          )}
          <textarea
            ref={textRef}
            className="cmnt-textarea"
            placeholder={userName ? "Share what you know about this promise…" : "Write a comment…"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={2}
            maxLength={600}
          />
          <div className="cmnt-compose-footer">
            <span className="cmnt-char">{body.length}/600</span>
            <button
              className="cmnt-post-btn"
              onClick={handlePost}
              disabled={!body.trim() || posting}
            >
              {posting
                ? <Loader2 size={14} className="cmnt-spin" />
                : <><Send size={13} /> Post</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Comment list */}
      <div className="cmnt-list">
        {loading ? (
          <p className="cmnt-loading">Loading discussion…</p>
        ) : comments.length === 0 ? (
          <p className="cmnt-empty">No comments yet — be the first.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="cmnt-item">
              <Avatar name={c.user_name} />
              <div className="cmnt-item-body">
                <div className="cmnt-item-meta">
                  <span className="cmnt-item-name">{c.user_name}</span>
                  <span className="cmnt-item-time">{timeAgo(c.created_at)}</span>
                </div>
                <p className="cmnt-item-text">{c.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
