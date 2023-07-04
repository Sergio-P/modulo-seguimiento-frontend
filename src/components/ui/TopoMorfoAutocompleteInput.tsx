import { useState } from 'react'
import clsx from "clsx";
import { Combobox } from '@headlessui/react';
import { CodingMode } from '@/types/Enums';
import { HiChevronDown } from 'react-icons/hi2';

export interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  {id: 1, name: 'Durward Reynolds'},
  {id: 2, name: 'Kenton Towne'},
  {id: 3, name: 'Therese Wunsch'},
  {id: 4, name: 'Benedict Kessler'},
  {id: 5, name: 'Katelyn Rohan'},
];

interface TopoMorfoAutocompleteInputProps {
  mode: CodingMode
}

export default function TopoMorfoAutocompleteInput(props: TopoMorfoAutocompleteInputProps) {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <div className='relative'>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-background text-font-input text-left shadow-md">
          <Combobox.Input 
            onChange={(event) => setQuery(event.target.value)} 
            displayValue={(person: Person) => person.name}
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
          {filteredPeople.map((person) => (
            <Combobox.Option 
              key={person.id} 
              value={person}
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
                    {person.name}
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