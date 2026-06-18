"use client";

import { useEffect, useState } from "react";

function generateId() {
  return "u_" + Math.random().toString(36).slice(2, 11);
}

export function useLocalUser() {
  const [userId,   setUserId]   = useState<string | null>(null);
  const [userName, setUserNameState] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let id = localStorage.getItem("udf-user-id");
    if (!id) {
      id = generateId();
      localStorage.setItem("udf-user-id", id);
    }

    const name = localStorage.getItem("udf-user-name");
    queueMicrotask(() => {
      if (cancelled) return;
      setUserId(id);
      if (name) setUserNameState(name);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function setUserName(name: string) {
    const trimmed = name.trim().slice(0, 40);
    localStorage.setItem("udf-user-name", trimmed);
    setUserNameState(trimmed);
  }

  return { userId, userName, setUserName };
}
