import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type { SelectionOption } from "./types";

export function useMultiSelection(
  options: SelectionOption[],
  value: string[] | undefined,
  defaultValue: string[] | undefined,
  onChange?: (values: string[], options: SelectionOption[]) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValues, setInternalValues] = useState<string[]>(
    defaultValue ?? []
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValues = isControlled ? value : internalValues;

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, search]);

  const selectedOptions = useMemo(
    () => options.filter((o) => currentValues.includes(o.value)),
    [options, currentValues]
  );

  const isSelected = useCallback(
    (val: string) => currentValues.includes(val),
    [currentValues]
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

  const toggle = useCallback(
    (option: SelectionOption) => {
      if (option.disabled) return;

      const exists = currentValues.includes(option.value);
      const nextValues = exists
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];

      if (!isControlled) setInternalValues(nextValues);

      const nextOptions = options.filter((o) => nextValues.includes(o.value));
      onChange?.(nextValues, nextOptions);
    },
    [currentValues, isControlled, onChange, options]
  );

  const remove = useCallback(
    (val: string) => {
      const nextValues = currentValues.filter((v) => v !== val);
      if (!isControlled) setInternalValues(nextValues);

      const nextOptions = options.filter((o) => nextValues.includes(o.value));
      onChange?.(nextValues, nextOptions);
    },
    [currentValues, isControlled, onChange, options]
  );

  const clear = useCallback(() => {
    if (!isControlled) setInternalValues([]);
    onChange?.([], []);
  }, [isControlled, onChange]);

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
            toggle(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "Backspace":
          if (!search && currentValues.length > 0) {
            remove(currentValues[currentValues.length - 1]);
          }
          break;
      }
    },
    [
      isOpen,
      open,
      close,
      toggle,
      remove,
      filteredOptions,
      highlightedIndex,
      search,
      currentValues,
    ]
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
    selectedOptions,
    currentValues,
    highlightedIndex,
    containerRef,
    searchInputRef,
    isSelected,
    open,
    close,
    toggle,
    remove,
    clear,
    handleKeyDown,
  };
}
