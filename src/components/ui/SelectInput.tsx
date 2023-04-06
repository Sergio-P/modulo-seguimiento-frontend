import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";

interface SelectInputProps {
  options: { id: string | number; name: string }[];
  name?: string;
  label?: string;
  value?: any;
  defaultValue?: any;
  onChange?: any;
}
export default function SelectInput(props: SelectInputProps) {
  return (
    <Listbox
      name={props.name}
      value={props.value}
      defaultValue={props.value}
      onChange={props.onChange}
    >
      <div className="relative">
        <Listbox.Button className="flex h-14 w-full items-center rounded-lg bg-background px-5 text-left text-font-input">
          {({ value }) => (
            <>
              <div>
                {props.label && (
                  <span className="block text-xs font-medium text-font-subtitle">
                    {props.label}
                  </span>
                )}
                <span className="block h-5 truncate text-sm tracking-wide text-font-title">
                  {value?.name || ""}
                </span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                <HiChevronDown className="h-5 w-5 text-font-subtitle" />
              </span>
            </>
          )}
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            "absolute mt-1 max-h-60 w-full overflow-auto py-1",
            "rounded-lg bg-background text-base shadow-lg",
            "ring-1 ring-zinc-800 ring-opacity-5",
            "focus:outline-none sm:text-sm"
          )}
        >
          {props.options.map((option, optionIdx) => (
            <Listbox.Option
              key={optionIdx}
              className={clsx(
                "relative cursor-default select-none text-font-input",
                "hover:bg-primary hover:text-white"
              )}
              value={option}
            >
              {({ selected }) => (
                <span
                  className={`block truncate py-2 ${
                    selected
                      ? "border-l-8 border-primary px-3 font-medium"
                      : "px-5 font-normal"
                  }`}
                >
                  {option.name}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
