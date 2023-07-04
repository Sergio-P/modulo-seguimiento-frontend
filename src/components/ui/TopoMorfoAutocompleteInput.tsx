import { useState, useEffect} from 'react'
import clsx from "clsx";
import { Combobox } from '@headlessui/react';
import { CodingMode } from '@/types/Enums';
import { HiChevronDown } from 'react-icons/hi2';
import { api } from "@/api";
import { Coding } from '@/types/Coding';

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



const people: Coding[] = [];

interface TopoMorfoAutocompleteInputProps {
  mode: CodingMode
}


export default function TopoMorfoAutocompleteInput(props: TopoMorfoAutocompleteInputProps) {
  const [selectedCoding, setSelectedCoding] = useState(people[0])
  const [query, setQuery] = useState('')
  const [filteredCoding, setFilteredCoding] = useState<Coding[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const codingData = await api.getCodings(CodingMode.topography, query);
        setFilteredCoding(codingData); // Assuming the data structure matches the expected `Coding` object.
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };
  
    if (query !== '') {
      fetchPeople();
    } else {
      setFilteredCoding([]); // Reset the filteredPeople state when the query is empty.
    }
  }, [CodingMode.topography, query]);

  return (
    <Combobox value={selectedCoding} onChange={setSelectedCoding}>
      <div className='relative'>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-background text-font-input text-left shadow-md">
          <Combobox.Input 
            onChange={(event) => setQuery(event.target.value)} 
            displayValue={(coding: Coding) => coding ? `(${coding.code}): ${coding.description}` : ''}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
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
          {filteredCoding.map((code) => (
            <Combobox.Option 
              key={code.code}
              value={code}
              className={clsx(
                "relative cursor-default select-none text-font-input",
                "hover:bg-primary hover:text-white"
              )}
            >
              {({ selected }) => (
                  <li
                    className={`block truncate py-2 ${
                      selected
                        ? "border-l-8 border-primary px-3 font-medium"
                        : "px-5 font-normal"
                    }`}>
                    ({code.code}): {code.description}
                  </li>
                )
              }
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}