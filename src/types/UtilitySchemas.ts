import { ComiteCreate, ComiteUpdate } from "./Comite";
import { EntryType } from "./Enums";
import { MetastasisCreate, MetastasisUpdate } from "./Metastasis";
import { RecurrenciaCreate, RecurrenciaUpdate } from "./Recurrencia";
import { ProgresionCreate, ProgresionUpdate } from "./Progresion";
import {
  TratamientoEnFALPCreate,
  TratamientoEnFALPUpdate,
} from "./TratamientoEnFALP";
import {
  TratamientoPostDuranteFALPCreate,
  TratamientoPostDuranteFALPUpdate,
} from "./TratamientoPostDuranteFALP";

export interface EntryCreate {
  entry_type: EntryType;
  entry_content: EntryCreateContent;
}

export type EntryCreateContent =
  | MetastasisCreate
  | RecurrenciaCreate
  | ProgresionCreate
  | TratamientoEnFALPCreate
  | TratamientoPostDuranteFALPCreate
  | ComiteCreate;

export interface EntryUpdate {
  entry_type: EntryType;
  entry_content: EntryUpdateContent;
}

export type EntryUpdateContent =
  | MetastasisUpdate
  | RecurrenciaUpdate
  | ProgresionUpdate
  | TratamientoEnFALPUpdate
  | TratamientoPostDuranteFALPUpdate
  | ComiteUpdate;

export interface EntryDelete {
  entry_type: EntryType;
  entry_id: number;
}

export type EntryContent = EntryCreateContent | EntryUpdateContent;
