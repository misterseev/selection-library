import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PreviewProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

// VSCode Dark+ inspired syntax highlighter for JSX/TSX
function highlightCode(code: string): React.ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    const tokens = tokenizeLine(line);
    return (
      <div key={lineIndex} className="flex">
        {/* Line number */}
        <span className="inline-block w-8 shrink-0 select-none text-right pr-4 text-slate-500">
          {lineIndex + 1}
        </span>
        <span className="flex-1">
          {tokens.map((token, i) => (
            <span key={i} className={token.className}>
              {token.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

interface Token {
  text: string;
  className: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  const rules: Array<{ regex: RegExp; className: string }> = [
    // Comments
    { regex: /^(\/\/.*)/, className: "text-emerald-700" },
    { regex: /^(\/\*[\s\S]*?\*\/)/, className: "text-emerald-700" },
    // Strings (double, single, backtick)
    { regex: /^("[^"]*")/, className: "text-amber-300" },
    { regex: /^('[^']*')/, className: "text-amber-300" },
    { regex: /^(`[^`]*`)/, className: "text-amber-300" },
    // JSX self-closing & closing tags: <Component ... /> or </Component>
    { regex: /^(<\/?)([A-Z]\w*)/, className: "__jsx_component__" },
    // JSX HTML tags
    { regex: /^(<\/?)([a-z][\w-]*)/, className: "__jsx_html__" },
    // Closing bracket
    { regex: /^(\/>|>)/, className: "text-slate-400" },
    // Keywords
    {
      regex:
        /^(const|let|var|function|return|import|export|from|default|if|else|switch|case|break|new|typeof|interface|type)\b/,
      className: "text-violet-400",
    },
    // Boolean / null / undefined
    { regex: /^(true|false|null|undefined)\b/, className: "text-blue-300" },
    // React hooks & common functions
    { regex: /^(useState|useEffect|useCallback|useMemo|useRef|console)\b/, className: "text-sky-300" },
    // JSX attribute names (word followed by =)
    { regex: /^([a-zA-Z][\w-]*)(?==)/, className: "text-sky-200" },
    // Numbers
    { regex: /^(\d+\.?\d*)/, className: "text-green-300" },
    // Arrow function
    { regex: /^(=>)/, className: "text-violet-400" },
    // Punctuation: braces, brackets, parens, operators
    { regex: /^([{}[\]().,;:?!&|=+\-*/<>]+)/, className: "text-slate-400" },
    // Identifiers
    { regex: /^([a-zA-Z_$][\w$]*)/, className: "text-blue-100" },
    // Whitespace
    { regex: /^(\s+)/, className: "" },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const rule of rules) {
      const match = remaining.match(rule.regex);
      if (match) {
        if (rule.className === "__jsx_component__") {
          // Bracket in gray, component name in teal
          tokens.push({ text: match[1], className: "text-slate-400" });
          tokens.push({ text: match[2], className: "text-teal-300" });
          remaining = remaining.slice(match[0].length);
        } else if (rule.className === "__jsx_html__") {
          tokens.push({ text: match[1], className: "text-slate-400" });
          tokens.push({ text: match[2], className: "text-rose-400" });
          remaining = remaining.slice(match[0].length);
        } else {
          tokens.push({ text: match[0], className: rule.className });
          remaining = remaining.slice(match[0].length);
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({ text: remaining[0], className: "text-slate-300" });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export function Preview({ title, code, children }: PreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => highlightCode(code), [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-1.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("preview")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              tab === "preview"
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              tab === "code"
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Code
          </button>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-6 min-h-84"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-slate-600/50 bg-slate-700/80 backdrop-blur-sm px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="h-3.5 w-3.5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
                {copied ? "Copied!" : "Copy"}
              </button>

              <pre className="overflow-x-auto rounded-b-xl bg-[#1e1e2e] p-4 pr-24 font-mono text-[13px] leading-6">
                <code>{highlighted}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
