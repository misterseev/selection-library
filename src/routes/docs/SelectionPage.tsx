import { useState } from "react";
import { Selection } from "../../components/Selection";
import type { SelectionOption } from "../../components/Selection";
import { Preview } from "../../components/Preview";

const countries: SelectionOption[] = [
  { value: "la", label: "ລາວ" },
  { value: "th", label: "ไทย" },
  { value: "vn", label: "Vietnam" }
];

export function SelectionPage() {
  const [controlled, setControlled] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Selection
      </h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400">
        A single-value searchable select component.
      </p>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />

      {/* Basic */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Basic Usage
      </h2>
      <div className="mt-4 space-y-4">
        <Preview
          title="Controlled"
          code={`const [value, setValue] = useState("");

<Selection
  options={options}
  value={value}
  onChange={(val) => setValue(val)}
  placeholder="Choose a country..."
  searchPlaceholder="Search countries..."
/>`}
        >
          <Selection
            options={countries}
            value={controlled}
            onChange={(val) => setControlled(val)}
            placeholder="Choose a country..."
            searchPlaceholder="Search countries..."
          />
          {controlled && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Selected:{" "}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                {controlled}
              </span>
            </p>
          )}
        </Preview>

        <Preview
          title="Uncontrolled with defaultValue"
          code={`<Selection
  options={options}
  defaultValue="la"
/>`}
        >
          <Selection options={countries} defaultValue="la" />
        </Preview>

        <Preview
          title="Without search"
          code={`<Selection
  options={options}
  searchable={false}
  placeholder="Pick one..."
/>`}
        >
          <Selection
            options={countries}
            searchable={false}
            placeholder="Pick one..."
          />
        </Preview>

        <Preview
          title="Custom className"
          code={`<Selection
  options={options}
  placeholder="Custom border..."
  className="[&_button]:border-violet-300 [&_button]:dark:border-violet-700"
/>`}
        >
          <Selection
            options={countries}
            placeholder="Custom border..."
            className="[&_button]:border-violet-300 [&_button]:dark:border-violet-700"
          />
        </Preview>

        <Preview
          title="Disabled"
          code={`<Selection
  options={options}
  disabled
  placeholder="Cannot select..."
/>`}
        >
          <Selection
            options={countries}
            disabled
            placeholder="Cannot select..."
          />
        </Preview>

        <Preview
          title="Disabled options"
          code={`<Selection
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Unavailable", disabled: true },
    { value: "c", label: "Also Available" },
  ]}
/>`}
        >
          <Selection
            options={[
              { value: "a", label: "Available" },
              { value: "b", label: "Unavailable", disabled: true },
              { value: "c", label: "Also Available" },
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
              ["value", "string", "—"],
              ["defaultValue", "string", "—"],
              ["onChange", "(value, option) => void", "—"],
              ["placeholder", "string", '"Select an option"'],
              ["searchPlaceholder", "string", '"Search..."'],
              ["searchable", "boolean", "true"],
              ["disabled", "boolean", "false"],
              ["className", "string", "—"],
              ["dropdownClassName", "string", "—"],
              ["optionClassName", "string", "—"],
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
    </div>
  );
}
