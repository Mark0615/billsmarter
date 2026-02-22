"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

type Props = {
  // 相容：你可以傳 ["Alice","Bob"] 或 [{value,label}]
  options: string[] | Option[];

  // 相容：value / selected 擇一都可（避免你舊程式碼還在用 selected）
  value?: string[];
  selected?: string[];

  onChange: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  showSelectAll?: boolean;
};

export default function PayToDropdown({
  options,
  value,
  selected,
  onChange,
  placeholder = "Select payees",
  disabled = false,
  showSelectAll = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // ✅ 防呆：永遠保證是陣列
  const safeValue = Array.isArray(value)
    ? value
    : Array.isArray(selected)
      ? selected
      : [];

  // ✅ 相容 options 傳 string[] 或 Option[]
  const normalizedOptions: Option[] = useMemo(() => {
    if (!Array.isArray(options)) return [];
    if (options.length === 0) return [];
    if (typeof options[0] === "string") {
      return (options as string[]).map((v) => ({ value: v, label: v }));
    }
    return options as Option[];
  }, [options]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const allValues = useMemo(
    () => normalizedOptions.map((o) => o.value),
    [normalizedOptions]
  );

  const isAllSelected = useMemo(() => {
    return allValues.length > 0 && allValues.every((v) => safeValue.includes(v));
  }, [allValues, safeValue]);

  const displayText = useMemo(() => {
    if (!safeValue.length) return placeholder;
    if (isAllSelected) return "All";

    return normalizedOptions
      .filter((o) => safeValue.includes(o.value))
      .map((o) => o.label)
      .join(", ");
  }, [safeValue, placeholder, isAllSelected, normalizedOptions]);

  function toggleItem(target: string) {
    const set = new Set(safeValue);
    if (set.has(target)) set.delete(target);
    else set.add(target);
    onChange(Array.from(set));
  }

  function toggleAll() {
    if (isAllSelected) onChange([]);
    else onChange(allValues);
  }

  return (
    <div className="payTo" ref={boxRef}>
      <button
        type="button"
        className="payToTrigger"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-expanded={open}
      >
        <span className={!safeValue.length ? "placeholder" : ""}>
          {displayText}
        </span>
        <span aria-hidden="true">▾</span>
      </button>

      {open && !disabled ? (
        <div className="payToMenu" role="listbox" aria-label="Pay to">
          {showSelectAll ? (
            <label className="payToOption" style={{ display: "flex", gap: 10, padding: "8px 8px" }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleAll}
              />
              <span>Select all</span>
            </label>
          ) : null}

          {normalizedOptions.map((o) => (
            <label
              key={o.value}
              className="payToOption"
              style={{ display: "flex", gap: 10, padding: "8px 8px" }}
            >
              <input
                type="checkbox"
                checked={safeValue.includes(o.value)}
                onChange={() => toggleItem(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}