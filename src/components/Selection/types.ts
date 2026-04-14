export interface SelectionOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectionProps {
  options: SelectionOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SelectionOption) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  noResultsText?: string;
}

export interface MultiSelectionProps {
  options: SelectionOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], options: SelectionOption[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  tagClassName?: string;
  noResultsText?: string;
  maxDisplay?: number;
}
