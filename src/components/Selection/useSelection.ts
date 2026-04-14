import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type { SelectionOption } from "./types";

export function useSelection(
  options: SelectionOption[],
  value: string | undefined,
  defaultValue: string | undefined,
  onChange?: (value: string, option: SelectionOption) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, search]);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === currentValue),
    [options, currentValue]
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setSearch("");
    setHighlightedIndex(-1);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
  }, []);

  const select = useCallback(
    (option: SelectionOption) => {
      if (option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      onChange?.(option.value, option);
      close();
    },
    [isControlled, onChange, close]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          open();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next >= filteredOptions.length ? 0 : next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filteredOptions.length - 1 : next;
          });
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            select(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [isOpen, open, close, select, filteredOptions, highlightedIndex]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  return {
    isOpen,
    search,
    setSearch,
    filteredOptions,
    selectedOption,
    highlightedIndex,
    containerRef,
    searchInputRef,
    open,
    close,
    select,
    handleKeyDown,
  };
}
