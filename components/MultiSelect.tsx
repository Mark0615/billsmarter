"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: {
  options: Option[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const selectedLabels = useMemo(() => {
    const map = new Map(options.map((o) => [o.value, o.label]));
    return value.map((v) => map.get(v) ?? v);
  }, [options, value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };

  const labelText =
    value.length === 0
      ? placeholder
      : value.length <= 2
      ? selectedLabels.join(", ")
      : `${value.length} selected`;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="input-full"
        disabled={disabled}
        onClick={() => setOpen((s) => !s)}
        style={{
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span style={{ opacity: value.length === 0 ? 0.7 : 1 }}>{labelText}</span>
        <span aria-hidden style={{ opacity: 0.7 }}>{open ? "▴" : "▾"}</span>
      </button>

      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "Canvas",
            color: "CanvasText",
            boxShadow: "var(--shadow)",
            padding: 8,
            maxHeight: 240,
            overflow: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => onChange(options.map((o) => o.value))}
            >
              Select all
            </button>
            <button type="button" className="btn-ghost" onClick={() => onChange([])}>
              Clear
            </button>
          </div>

          <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
            {options.map((o) => (
              <label
                key={o.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={value.includes(o.value)}
                  onChange={() => toggle(o.value)}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}