import React from "react";
import Select, {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  MultiValue,
  StylesConfig,
} from "react-select";

const customStyles: StylesConfig<Object, true, GroupBase<string>> | undefined =
  {
    control: (base) => ({
      ...base,
      minHeight: 20,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    multiValue: (base) => ({
      ...base,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 6px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
  };
export interface selectProps {
  options: never[];
  value: Array<Object>;
  noOptionsMessage?: string | undefined;
  selectInputValue?: string | undefined;
  handleInputChange?:
    | ((newValue: string, actionMeta: InputActionMeta) => void)
    | undefined;
  handleChange?: (
    newValue: MultiValue<string>,
    actionMeta: ActionMeta<string>
  ) => void;
  handleKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
}

export default function MinimalMultiSelect({
  options,
  value,
  selectInputValue,
  handleInputChange,
  handleChange,
  handleKeyDown,
  noOptionsMessage,
}: selectProps) {
  return (
    <Select
      styles={customStyles}
      isMulti
      isClearable={false}
      options={options}
      value={value}
      inputValue={selectInputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder=""
      noOptionsMessage={() => <>{noOptionsMessage}</>}
    />
  );
}
