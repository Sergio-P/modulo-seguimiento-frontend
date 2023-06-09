import { Popover } from "@headlessui/react";
import * as date from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DayPicker, useInput } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Image from "next/image";
import clsx from "clsx";
import _ from "lodash";

function InnerDatePicker(props: any) {
  const [nullValue, setNullValue] = useState<boolean>(true);
  const { inputProps, dayPickerProps, reset } = useInput({
    defaultSelected: props.value,
    fromYear: 1990,
    toYear: date.getYear(new Date()) + 2,
    format: "PP",
    required: true,
    locale: es,
  });
  useEffect(() => {
    if (nullValue && !_.isNil(props.value)) {
      setNullValue(false);
      reset();
    }
  }, [nullValue, props.value, reset]);
  const { disabled } = props;
  const disabledDays = [{ after: new Date() }];
  return (
    <Popover className={clsx(disabled && "opacity-50")}>
      <Popover.Button className="w-full">
        <div
          className={clsx(
            "flex h-14 w-full items-center gap-5 rounded-lg bg-background pl-5",
            disabled ? "cursor-default" : "cursor-pointer"
          )}
        >
          <Image
            src={`/icons/date.svg`}
            width={20}
            height={20}
            alt=""
            className="h-4 w-4"
          />
          <div className="w-full overflow-hidden pr-4">
            {props.label && (
              <span className="block w-full truncate whitespace-nowrap text-left text-xs font-medium text-font-subtitle">
                {props.label}
              </span>
            )}
            <input
              {...inputProps}
              className={clsx(
                "w-full bg-background text-font-input",
                disabled ? "cursor-default" : "cursor-pointer"
              )}
            />
          </div>
        </div>
      </Popover.Button>
      <Popover.Panel className={clsx("absolute z-10", disabled && "invisible")}>
        <div className="rounded-lg bg-white px-3 py-1 shadow-lg">
          <DayPicker
            {...dayPickerProps}
            mode="single"
            captionLayout="dropdown-buttons"
            selected={props.value}
            onSelect={props.onChange}
            disabled={disabledDays}
            modifiersStyles={{
              selected: { backgroundColor: "var(--primary-color)" },
            }}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
}

const DatePicker = React.forwardRef(
  (props: any, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <InnerDatePicker {...props} />;
  }
);
DatePicker.displayName = "DatePicker";

export default DatePicker;
