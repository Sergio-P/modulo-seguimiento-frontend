import { useEffect, useState } from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";
import { CodingMode } from "@/types/Enums";
import { HiChevronDown } from "react-icons/hi2";
import { api } from "@/api";
import { Coding } from "@/types/Coding";

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

interface TopoMorfoAutocompleteInputProps {
  mode: CodingMode;
  initialValue: string | null;
  onChange: (value: string | null) => void;
}

export default function TopoMorfoAutocompleteInput(
  props: TopoMorfoAutocompleteInputProps
) {
  console.log(props);
  const [selectedCoding, setSelectedCoding] = useState<Coding | null>(null);
  const [query, setQuery] = useState(props.initialValue || "");
  const [filteredCoding, setFilteredCoding] = useState<Coding[]>([]);
  const labels = {
    [CodingMode.topography]: "Topografía",
    [CodingMode.morphology]: "Morfología",
    [CodingMode.practitioner]: "Médico",
  }

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const codingData = await api.getCodings(props.mode || CodingMode.topography, query);
        setFilteredCoding(codingData); // Assuming the data structure matches the expected `Coding` object.
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      if (query !== "") {
        fetchPeople();
      } else {
        setFilteredCoding([]); // Reset the filteredPeople state when the query is empty.
      }
    }, 800); // 0.8 second delay

    return () => clearTimeout(timeoutId);
  }, [CodingMode.topography, query]);

  const handleCodingChange = (coding: Coding | null) => {
    setSelectedCoding(coding);
    if(props.mode == CodingMode.practitioner){
      props.onChange(coding ? `${coding.code}` : null);
    }
    else {
      props.onChange(coding ? `(${coding.code}) ${coding.description}` : null);
    }
  };

  return (
    <Combobox value={selectedCoding} onChange={handleCodingChange}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left text-font-input">
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(coding: Coding) =>
              coding ? props.mode == CodingMode.practitioner ? coding.code : `(${coding.code}) ${coding.description}` : props.initialValue || ""
            }
            placeholder={labels[props.mode || CodingMode.topography]}
            className="w-full border-none bg-background py-4 pl-3 pr-10 text-sm leading-5 text-gray-900"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-5">
            <HiChevronDown className="h-5 w-5 text-font-subtitle" />
          </Combobox.Button>
        </div>

        <Combobox.Options
          className={clsx(
            "absolute z-10 mt-1 max-h-60 w-fit min-w-full overflow-auto py-1",
            "rounded-lg bg-background text-base shadow-lg",
            "ring-1 ring-zinc-800 ring-opacity-5",
            "focus:outline-none sm:text-sm"
          )}
        >
          {filteredCoding.length > 0 ? (
            filteredCoding.map((code) => (
              <Combobox.Option
                key={code.code}
                value={code}
                className={clsx(
                  "max-w-lg relative cursor-default select-none text-font-input",
                  "hover:bg-primary hover:text-white"
                )}
              >
                {({ selected }) => (
                  <li
                    className={`block truncate py-2 ${
                      selected
                        ? "border-l-8 border-primary px-3 font-medium"
                        : "px-5 font-normal"
                    }`}
                  >
                    ({code.code}) {code.description}
                  </li>
                )}
              </Combobox.Option>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No hay resultados</div>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
