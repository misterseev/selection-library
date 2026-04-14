import { useState } from "react";
import { MultiSelection } from "../../components/Selection";
import type { SelectionOption } from "../../components/Selection";
import { Preview } from "../../components/Preview";

const countries: SelectionOption[] = [
  { value: "la", label: "ລາວ" },
  { value: "th", label: "ไทย" },
  { value: "vn", label: "Vietnam" }
];

export function MultiSelectionPage() {
  const [controlled, setControlled] = useState<string[]>([]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        MultiSelection
      </h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400">
        A multi-value searchable select with tags, clear-all, and checkbox-style options.
      </p>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />

      {/* Examples */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Examples
      </h2>
      <div className="mt-4 space-y-4">
        <Preview
          title="Controlled"
          code={`const [values, setValues] = useState<string[]>([]);

<MultiSelection
  options={options}
  value={values}
  onChange={(vals) => setValues(vals)}
  placeholder="Choose countries..."
  searchPlaceholder="Search countries..."
/>`}
        >
          <MultiSelection
            options={countries}
            value={controlled}
            onChange={(vals) => setControlled(vals)}
            placeholder="Choose countries..."
            searchPlaceholder="Search countries..."
          />
          {controlled.length > 0 && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Selected:{" "}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                {controlled.join(", ")}
              </span>
            </p>
          )}
        </Preview>

        <Preview
          title="Uncontrolled with defaultValue"
          code={`<MultiSelection
  options={options}
  defaultValue={["la", "th"]}
/>`}
        >
          <MultiSelection options={countries} defaultValue={["la", "th"]} />
        </Preview>

        <Preview
          title="Max display tags (2)"
          code={`<MultiSelection
  options={options}
  maxDisplay={2}
  placeholder="Max 2 visible tags..."
/>`}
        >
          <MultiSelection
            options={countries}
            maxDisplay={2}
            placeholder="Max 2 visible tags..."
          />
        </Preview>

        <Preview
          title="Custom tag style"
          code={`<MultiSelection
  options={options}
  tagClassName="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
  placeholder="Custom tag colors..."
/>`}
        >
          <MultiSelection
            options={countries}
            tagClassName="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
            placeholder="Custom tag colors..."
          />
        </Preview>

        <Preview
          title="Disabled"
          code={`<MultiSelection
  options={options}
  disabled
  placeholder="Cannot select..."
/>`}
        >
          <MultiSelection
            options={countries}
            disabled
            placeholder="Cannot select..."
          />
        </Preview>

        <Preview
          title="Disabled options"
          code={`<MultiSelection
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Unavailable", disabled: true },
    { value: "c", label: "Also Available" },
    { value: "d", label: "Another One" },
  ]}
/>`}
        >
          <MultiSelection
            options={[
              { value: "a", label: "Available" },
              { value: "b", label: "Unavailable", disabled: true },
              { value: "c", label: "Also Available" },
              { value: "d", label: "Another One" },
            ]}
          />
        </Preview>
      </div>

      {/* Props */}
      <h2 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">
        Props
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Prop</th>
              <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Type</th>
              <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Default</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            {[
              ["options", "SelectionOption[]", "required"],
              ["value", "string[]", "—"],
              ["defaultValue", "string[]", "—"],
              ["onChange", "(values, options) => void", "—"],
              ["placeholder", "string", '"Select options"'],
              ["searchPlaceholder", "string", '"Search..."'],
              ["searchable", "boolean", "true"],
              ["disabled", "boolean", "false"],
              ["className", "string", "—"],
              ["dropdownClassName", "string", "—"],
              ["optionClassName", "string", "—"],
              ["tagClassName", "string", "—"],
              ["maxDisplay", "number", "3"],
              ["noResultsText", "string", '"No results found"'],
            ].map(([prop, type, def]) => (
              <tr key={prop} className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="py-2 pr-4">
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs text-violet-600 dark:text-violet-400">
                    {prop}
                  </code>
                </td>
                <td className="py-2 pr-4 font-mono text-xs">{type}</td>
                <td className="py-2 pr-4 font-mono text-xs">{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Keyboard */}
      <h2 className="mt-12 text-xl font-semibold text-gray-900 dark:text-white">
        Keyboard Navigation
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="py-2 pr-4 font-medium text-gray-900 dark:text-white">Key</th>
              <th className="py-2 font-medium text-gray-900 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            {[
              ["Enter / Space / ↓", "Open dropdown"],
              ["↓ / ↑", "Navigate options"],
              ["Enter", "Toggle highlighted option"],
              ["Backspace", "Remove last tag (when search empty)"],
              ["Escape", "Close dropdown"],
            ].map(([key, action]) => (
              <tr key={key} className="border-b border-gray-100 dark:border-gray-800/50">
                <td className="py-2 pr-4">
                  <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
                    {key}
                  </kbd>
                </td>
                <td className="py-2">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
