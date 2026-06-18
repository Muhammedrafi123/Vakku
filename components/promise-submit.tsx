"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocalUser } from "@/hooks/use-local-user";
import { Loader2, Upload, CheckCircle2, Link2 } from "lucide-react";

export function PromiseSubmit({ promiseId }: { promiseId: string }) {
  const { userId, userName, setUserName } = useLocalUser();
  const [url,       setUrl]       = useState("");
  const [note,      setNote]      = useState("");
  const [name,      setName]      = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done,      setDone]      = useState(false);
  const [error,     setError]     = useState("");

  async function handleSubmit() {
    if (!supabase) { setError("Source submissions are temporarily unavailable."); return; }
    if (!url.trim()) { setError("Please include a source URL."); return; }
    const finalName = userName || name.trim();
    if (!finalName) { setError("Please enter your name."); return; }
    if (!userId)    return;

    if (!userName && name.trim()) setUserName(name.trim());

    setError("");
    setSubmitting(true);

    const { error: err } = await supabase.from("submissions").insert({
      promise_id: promiseId,
      user_id:    userId,
      user_name:  finalName,
      source_url: url.trim(),
      note:       note.trim(),
      status:     "pending",
    });

    setSubmitting(false);
    if (err) { setError("Failed to submit. Please try again."); return; }
    setDone(true);
  }

  if (done) {
    return (
      <div className="psub-root psub-root--done">
        <CheckCircle2 size={22} className="psub-done-icon" />
        <div>
          <p className="psub-done-title">Submission received — thank you!</p>
          <p className="psub-done-sub">Our editor will review your source and update the record if verified.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="psub-root">
      <div className="psub-header">
        <Upload size={15} />
        <span>Know something? Help us verify</span>
      </div>
      <p className="psub-desc">
        Found a government order, news article, or official document related to this promise?
        Submit the link — our editor reviews every submission before anything changes.
      </p>

      <div className="psub-form">
        {!userName && (
          <div className="psub-field">
            <label className="psub-label">Your name</label>
            <input
              className="psub-input"
              placeholder="e.g. Rafi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
            />
          </div>
        )}

        <div className="psub-field">
          <label className="psub-label">Source URL <span className="psub-required">*</span></label>
          <div className="psub-url-wrap">
            <Link2 size={14} className="psub-url-icon" />
            <input
              className="psub-input psub-input--url"
              placeholder="https://kerala.gov.in/go/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
            />
          </div>
        </div>

        <div className="psub-field">
          <label className="psub-label">What does it show? <span className="psub-optional">(optional)</span></label>
          <textarea
            className="psub-textarea"
            placeholder="e.g. GO issued on May 18 allocating ₹200 crore for this scheme"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            maxLength={400}
          />
        </div>

        {error && <p className="psub-error">{error}</p>}

        <button
          className="psub-submit-btn"
          onClick={handleSubmit}
          disabled={submitting || !url.trim()}
        >
          {submitting
            ? <><Loader2 size={14} className="cmnt-spin" /> Submitting…</>
            : "Submit for review →"
          }
        </button>
      </div>
    </div>
  );
}
