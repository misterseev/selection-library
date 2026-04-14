import { AnimatePresence, motion } from "framer-motion";
import type { SelectionProps } from "./types";
import { useSelection } from "./useSelection";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Selection({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  searchable = true,
  disabled = false,
  className,
  dropdownClassName,
  optionClassName,
  noResultsText = "No results found",
}: SelectionProps) {
  const {
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
  } = useSelection(options, value, defaultValue, onChange);

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
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
          "bg-white border-gray-300 hover:border-gray-400",
          "dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
          "dark:focus:ring-violet-400/40 dark:focus:border-violet-400",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <span
          className={cn(
            "truncate",
            selectedOption
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500"
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="ml-2 h-4 w-4 shrink-0 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </motion.svg>
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
            <ul role="listbox" className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
                  {noResultsText}
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedOption?.value;
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
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onClick={() => select(option)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                        isHighlighted && "bg-gray-100 dark:bg-gray-800",
                        isSelected &&
                          !isHighlighted &&
                          "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
                        !isSelected &&
                          !isHighlighted &&
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        option.disabled &&
                          "opacity-40 cursor-not-allowed pointer-events-none",
                        optionClassName
                      )}
                    >
                      <span className="truncate">{option.label}</span>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.svg
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.15 }}
                            className="ml-2 h-4 w-4 shrink-0 text-violet-500 dark:text-violet-400"
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
