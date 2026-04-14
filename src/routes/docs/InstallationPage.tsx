export function InstallationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Installation
      </h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Get up and running with Seevang Selection in minutes.
      </p>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />

      {/* Install */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        1. Install the package
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-300">
        <code>npm install seevang-selection</code>
      </pre>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Or use <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs">pnpm add seevang-selection</code> /{" "}
        <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs">yarn add seevang-selection</code>
      </p>

      {/* Import */}
      <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">
        2. Import styles
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-300">
        <code>{`import "seevang-selection/style.css";`}</code>
      </pre>

      {/* Usage */}
      <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">
        3. Use the component
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-300">
        <code>{`import { useState } from "react";
import { Selection } from "seevang-selection";
import "seevang-selection/style.css";

const options = [
  { value: "la", label: "ລາວ" },
  { value: "th", label: "ไทย" },
  { value: "vn", label: "Vietnam" },
];

function App() {
  const [value, setValue] = useState("");

  return (
    <Selection
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Choose a country..."
    />
  );
}`}</code>
      </pre>

      {/* Peer deps */}
      <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">
        Requirements
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          <span>
            <strong className="text-gray-900 dark:text-white">React</strong> &gt;= 18.0.0 (peer dependency)
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          <span>
            TailwindCSS & Framer Motion are <strong className="text-gray-900 dark:text-white">bundled</strong> — no extra installs needed
          </span>
        </li>
      </ul>
    </div>
  );
}
