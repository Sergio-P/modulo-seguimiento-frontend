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
  entry_content:
    | MetastasisCreate
    | RecurrenciaCreate
    | ProgresionCreate
    | TratamientoEnFALPCreate
    | TratamientoPostDuranteFALPCreate
    | ComiteCreate;
}

export interface EntryUpdate {
  entry_type: EntryType;
  entry_content:
    | MetastasisUpdate
    | RecurrenciaUpdate
    | ProgresionUpdate
    | TratamientoEnFALPUpdate
    | TratamientoPostDuranteFALPUpdate
    | ComiteUpdate;
}

export interface EntryDelete {
  entry_type: EntryType;
  entry_id: number;
}
