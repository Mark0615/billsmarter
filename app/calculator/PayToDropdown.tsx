"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

type Props = {
  options: Option[];                // 人員清單
  value: string[];                  // 已選中的 value
  onChange: (next: string[]) => void;
  placeholder?: string;
};

const ALL = "__ALL__";
const CLEAR = "__CLEAR__";

export default function PayToDropdown({
  options,
  value,
  onChange,
  placeholder = "Select payees",
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 點外面關閉
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const allValues = useMemo(() => options.map(o => o.value), [options]);

  const isAllSelected = useMemo(() => {
    if (options.length === 0) return false;
    return allValues.every(v => value.includes(v));
  }, [allValues, value, options.length]);

  const displayText = useMemo(() => {
    if (value.length === 0) return placeholder;
    if (isAllSelected) return "All";
    const labels = options
      .filter(o => value.includes(o.value))
      .map(o => o.label);
    return labels.join(", ");
  }, [value, options, placeholder, isAllSelected]);

  const toggle = (clicked: string) => {
    if (clicked === CLEAR) {
      onChange([]);
      return;
    }

    if (clicked === ALL) {
      onChange(allValues);
      return;
    }

    const set = new Set(value);

    if (set.has(clicked)) set.delete(clicked);
    else set.add(clicked);

    const next = Array.from(set);

    // 如果剛好全選，就維持全選狀態（顯示會變 All）
    if (allValues.length > 0 && allValues.every(v => next.includes(v))) {
      onChange(allValues);
    } else {
      onChange(next);
    }
  };

  return (
    <div ref={boxRef} style={{ position: "relative", minWidth: 220 }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff",
          textAlign: "left",
          cursor: "pointer",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ color: value.length === 0 ? "#9ca3af" : "#111827" }}>
          {displayText}
        </span>
        <span style={{ float: "right", opacity: 0.6 }}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 8px)",
            left: 0,
            width: "100%",
            maxHeight: 280,
            overflow: "auto",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
          }}
        >
          {/* All */}
          <Item
            label="All"
            checked={isAllSelected}
            onClick={() => toggle(ALL)}
          />
          {/* Clear */}
          <Item
            label="Remove all"
            checked={value.length === 0}
            onClick={() => toggle(CLEAR)}
          />

          <div style={{ height: 1, background: "#f3f4f6", margin: "6px 0" }} />

          {options.map(o => (
            <Item
              key={o.value}
              label={o.label}
              checked={value.includes(o.value)}
              onClick={() => toggle(o.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Item({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: "1px solid #d1d5db",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        {checked ? "✓" : ""}
      </span>
      <span style={{ color: "#111827" }}>{label}</span>
    </div>
  );
}