# Seevang Selection

A searchable, animated select component built with React, TailwindCSS, and Framer Motion.

## Installation

```bash
npm install seevang-selection
# or
pnpm add seevang-selection
# or
yarn add seevang-selection
```

> **Note:** `react` and `react-dom` (>=18) are peer dependencies. TailwindCSS and Framer Motion are bundled — no extra installs needed.

## Usage

```tsx
import { useState } from "react";
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
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectionOption[]` | **required** | Array of options |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled default value |
| `onChange` | `(value, option) => void` | — | Callback when value changes |
| `placeholder` | `string` | `"Select an option"` | Placeholder text |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `searchable` | `boolean` | `true` | Enable search filter |
| `disabled` | `boolean` | `false` | Disable the component |
| `className` | `string` | — | Class for the root container |
| `dropdownClassName` | `string` | — | Class for the dropdown panel |
| `optionClassName` | `string` | — | Class for each option item |
| `noResultsText` | `string` | `"No results found"` | Text when search has no match |

### SelectionOption

```ts
interface SelectionOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Examples

### Basic (Uncontrolled)

```tsx
<Selection
  options={options}
  defaultValue="la"
  onChange={(val) => console.log(val)}
/>
```

### Without Search

```tsx
<Selection
  options={options}
  searchable={false}
  placeholder="Pick one..."
/>
```

### Custom Styling via className

```tsx
{/* Custom border color */}
<Selection
  options={options}
  className="[&_button]:border-violet-300"
/>

{/* Custom dropdown & options */}
<Selection
  options={options}
  dropdownClassName="border-2 border-violet-500"
  optionClassName="text-base"
/>
```

### Disabled Options

```tsx
<Selection
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Unavailable", disabled: true },
    { value: "c", label: "Also Available" },
  ]}
/>
```

### Disabled Select

```tsx
<Selection options={options} disabled placeholder="Cannot select..." />
```

---

## MultiSelection

A multi-select variant with tags, clear-all, and checkbox-style options.

### Quick Start

```tsx
import { useState } from "react";
import { MultiSelection } from "seevang-selection";
import "seevang-selection/style.css";

function App() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <MultiSelection
      options={[
        { value: "la", label: "ລາວ" },
        { value: "th", label: "ไทย" },
        { value: "vn", label: "Vietnam" },
      ]}
      value={values}
      onChange={(vals) => setValues(vals)}
      placeholder="Choose countries..."
    />
  );
}
```

### MultiSelection Props

All props from `Selection` are supported, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | — | Controlled selected values |
| `defaultValue` | `string[]` | — | Uncontrolled default values |
| `onChange` | `(values, options) => void` | — | Callback with all selected values & options |
| `tagClassName` | `string` | — | Class for each selected tag |
| `maxDisplay` | `number` | `3` | Max tags visible before showing "+N" |

### Examples

#### Limit Visible Tags

```tsx
<MultiSelection
  options={options}
  maxDisplay={2}
  placeholder="Max 2 visible tags..."
/>
```

#### Custom Tag Style

```tsx
<MultiSelection
  options={options}
  tagClassName="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
/>
```

#### Uncontrolled with Default

```tsx
<MultiSelection
  options={options}
  defaultValue={["la", "th"]}
  onChange={(vals) => console.log(vals)}
/>
```

### Keyboard (MultiSelection)

| Key | Action |
|-----|--------|
| `Enter` / `Space` / `ArrowDown` | Open dropdown |
| `ArrowDown` / `ArrowUp` | Navigate options |
| `Enter` | Toggle highlighted option |
| `Backspace` | Remove last selected (when search is empty) |
| `Escape` | Close dropdown |

---

## Keyboard Navigation (Selection)

| Key | Action |
|-----|--------|
| `Enter` / `Space` / `ArrowDown` | Open dropdown |
| `ArrowDown` / `ArrowUp` | Navigate options |
| `Enter` | Select highlighted option |
| `Escape` | Close dropdown |

## License

MIT
