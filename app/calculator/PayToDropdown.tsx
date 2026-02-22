"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function PayToDropdown({ options, value, onChange, placeholder = "Select payees" }: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const allValues = useMemo(() => options.map((o) => o.value), [options]);
  const isAllSelected = useMemo(() => allValues.length > 0 && allValues.every((v) => value.includes(v)), [allValues, value]);

  const displayText = useMemo(() => {
    if (!value.length) return placeholder;
    if (isAllSelected) return "All";
    return options
      .filter((o) => value.includes(o.value))
      .map((o) => o.label)
      .join(", ");
  }, [value, placeholder, isAllSelected, options]);

  function toggleItem(target: string) {
    const set = new Set(value);
    if (set.has(target)) {
      set.delete(target);
    } else {
      set.add(target);
    }
    onChange(Array.from(set));
  }

  function toggleAll() {
    if (isAllSelected) {
      onChange([]);
      return;
    }
    onChange(allValues);
  }

  return (
    <div ref={boxRef} className="payTo">
      <button type="button" onClick={() => setOpen((v) => !v)} className="payToTrigger" aria-haspopup="listbox" aria-expanded={open}>
        <span className={value.length === 0 ? "placeholder" : ""}>{displayText}</span>
        <span className="chevron">▾</span>
      </button>

      {open && (
        <div role="listbox" className="payToMenu">
          <button type="button" className="payToItem" onClick={toggleAll}>
            <span className={`checkbox ${isAllSelected ? "checked" : ""}`}>{isAllSelected ? "✓" : ""}</span>
            <span>Select all</span>
          </button>
          <div className="payToDivider" />
          {options.map((o) => {
            const checked = value.includes(o.value);
            return (
              <button key={o.value} type="button" className="payToItem" onClick={() => toggleItem(o.value)}>
                <span className={`checkbox ${checked ? "checked" : ""}`}>{checked ? "✓" : ""}</span>
                <span>{o.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
