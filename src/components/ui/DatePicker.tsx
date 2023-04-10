import { Popover } from "@headlessui/react";
import * as date from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { DayPicker, useInput } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = React.forwardRef(
  (props: any, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { inputProps, dayPickerProps } = useInput({
      defaultSelected: new Date(),
      fromYear: 1990,
      toYear: date.getYear(new Date()) + 2,
      format: "PP",
      required: true,
      locale: es,
    });

    return (
      <Popover>
        <Popover.Button>
          <input
            {...inputProps}
            className="h-14 w-full cursor-pointer rounded-lg bg-background px-5 text-font-input"
          />
        </Popover.Button>
        <Popover.Panel className="absolute z-10">
          <div className="rounded-lg bg-white px-3 py-1 shadow-lg">
            <DayPicker
              {...dayPickerProps}
              mode="single"
              captionLayout="dropdown-buttons"
              selected={props.value}
              onSelect={props.onChange}
            />
          </div>
        </Popover.Panel>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

export default DatePicker;
