import { AnimatePresence, motion } from "framer-motion";
import type { MultiSelectionProps } from "./types";
import { useMultiSelection } from "./useMultiSelection";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function MultiSelection({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  searchable = true,
  disabled = false,
  className,
  dropdownClassName,
  optionClassName,
  tagClassName,
  noResultsText = "No results found",
  maxDisplay = 3,
}: MultiSelectionProps) {
  const {
    isOpen,
    search,
    setSearch,
    filteredOptions,
    selectedOptions,
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
  } = useMultiSelection(options, value, defaultValue, onChange);

  const hasSelection = selectedOptions.length > 0;
  const displayTags = selectedOptions.slice(0, maxDisplay);
  const overflowCount = selectedOptions.length - maxDisplay;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={isOpen ? close : open}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-multiselectable="true"
        className={cn(
          "flex w-full min-h-[42px] items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left text-sm transition-all",
          "bg-white border-gray-300 hover:border-gray-400",
          "dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
          "dark:focus:ring-violet-400/40 dark:focus:border-violet-400",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1">
          <AnimatePresence mode="popLayout">
            {hasSelection ? (
              <>
                {displayTags.map((opt) => (
                  <motion.span
                    key={opt.value}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                      "bg-violet-100 text-violet-700",
                      "dark:bg-violet-500/20 dark:text-violet-300",
                      tagClassName
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(opt.value);
                    }}
                  >
                    <span className="truncate max-w-[120px]">{opt.label}</span>
                    <svg
                      className="h-3 w-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </motion.span>
                ))}
                {overflowCount > 0 && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                  >
                    +{overflowCount}
                  </motion.span>
                )}
              </>
            ) : (
              <span className="px-1 text-gray-400 dark:text-gray-500">
                {placeholder}
              </span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {/* Clear all */}
          <AnimatePresence>
            {hasSelection && !disabled && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.12 }}
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  clear();
                }}
                className="flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Chevron */}
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-4 w-4 shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </motion.svg>
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-1 w-full overflow-hidden rounded-lg border shadow-lg",
              "bg-white border-gray-200",
              "dark:bg-gray-900 dark:border-gray-700",
              dropdownClassName
            )}
          >
            {/* Search */}
            {searchable && (
              <div className="border-b border-gray-200 dark:border-gray-700 p-2">
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className={cn(
                      "w-full rounded-md border-0 bg-gray-50 py-2 pl-9 pr-3 text-sm",
                      "text-gray-900 placeholder:text-gray-400",
                      "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                    )}
                  />
                </div>
              </div>
            )}

            {/* Options */}
            <ul
              role="listbox"
              aria-multiselectable="true"
              className="max-h-60 overflow-y-auto p-1"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                  {noResultsText}
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const selected = isSelected(option.value);
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <motion.li
                      key={option.value}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.12,
                        delay: index * 0.02,
                        ease: "easeOut",
                      }}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={option.disabled}
                      onClick={() => toggle(option)}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                        isHighlighted && "bg-gray-100 dark:bg-gray-800",
                        selected &&
                          !isHighlighted &&
                          "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
                        !selected &&
                          !isHighlighted &&
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        option.disabled &&
                          "opacity-40 cursor-not-allowed pointer-events-none",
                        optionClassName
                      )}
                    >
                      {/* Checkbox */}
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                          selected
                            ? "border-violet-500 bg-violet-500 dark:border-violet-400 dark:bg-violet-400"
                            : "border-gray-300 dark:border-gray-600"
                        )}
                      >
                        <AnimatePresence>
                          {selected && (
                            <motion.svg
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ duration: 0.12 }}
                              className="h-3 w-3 text-white dark:text-gray-900"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </span>

                      <span className="truncate">{option.label}</span>
                    </motion.li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
