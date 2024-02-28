import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Section, Separator, SubSection } from "../ui";
import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import SelectInput from "@/components/ui/SelectInput";
import {
  CausaDefuncion,
  ClaseCaso,
  CondicionCaso,
  EstadoVital,
} from "@/types/Enums";
import DatePicker from "@/components/ui/DatePicker";
import Checkbox from "@/components/ui/Checkbox";
import { SeguimientoForm } from "../../CaseForm";

export default function ValidacionSection() {
  const { control, register } = useFormContext<SeguimientoForm>();
  const seguimiento = useContext(SeguimientoContext);
  const estadoVital = useWatch({
    control,
    name: "estado_vital",
  });
  return (
    <Section id="validacion" title="Validación Antecedentes">
      <SubSection title="Validación Clase de Caso"></SubSection>
      <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <Controller
          name="validacion_clase_caso"
          control={control}
          defaultValue={seguimiento?.validacion_clase_caso!}
          render={({ field }) => (
            <div className="col-span-2">
              <SelectInput
                label={"Clase Caso"}
                options={[
                  ClaseCaso.diagnostico_y_tratamiento_en_falp,
                  ClaseCaso.tratamiento_en_falp,
                  ClaseCaso.diagnostico_en_falp,
                ]}
                {...field}
              />
            </div>
          )}
        />
      </div>
      <Separator />
      <SubSection title="Último Contacto"></SubSection>
      <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <Controller
            name="ultimo_contacto"
            control={control}
            render={({ field }) => (
              <DatePicker label="Fecha último contacto" {...field} />
            )}
          />
        </div>
        <div>
          <Controller
            name="condicion_del_caso"
            control={control}
            defaultValue={seguimiento?.condicion_del_caso}
            render={({ field }) => (
              <SelectInput
                label="Condición del Caso"
                options={[
                  CondicionCaso.vivo_sin_enfermedad,
                  CondicionCaso.vivo_con_enfermedad,
                  CondicionCaso.vivo_soe,
                  CondicionCaso.desconocido,
                  CondicionCaso.fallecido,
                ]}
                {...field}
              />
            )}
          />
        </div>
        {/*<div className="flex items-center">*/}
        {/*  <Checkbox*/}
        {/*    {...register("sigue_atencion_otro_centro")}*/}
        {/*    label="Seguimiento otro centro"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <Separator />
      <SubSection title="Estado Vital"></SubSection>
      <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <Controller
          name="estado_vital"
          control={control}
          defaultValue={seguimiento?.estado_vital}
          render={({ field }) => (
            <SelectInput
              label="Estado Vital"
              options={[EstadoVital.vivo, EstadoVital.muerto]}
              {...field}
            />
          )}
        />
        <Controller
          name="causa_defuncion"
          control={control}
          defaultValue={seguimiento?.causa_defuncion}
          render={({ field }) => (
            <div className="col-start-1">
              <SelectInput
                disabled={
                  seguimiento?.estado_vital === "Vivo" &&
                  estadoVital !== "Fallecido"
                }
                label="Causa Defunción"
                options={[
                  CausaDefuncion.muerte_por_cancer_o_complicacion,
                  CausaDefuncion.muerte_por_otra_causa,
                  CausaDefuncion.desconocido,
                ]}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="fecha_defuncion"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Fecha Defunción"
              disabled={
                seguimiento?.estado_vital === "Vivo" && estadoVital !== "Fallecido"
              }
              {...field}
            />
          )}
        />
        <div className="flex items-center">
          {/* TODO: Agregar fecha estimada en modelo de datos, actualmente no existe */}
          <Checkbox
            disabled={
              seguimiento?.estado_vital === "Vivo" && estadoVital !== "Fallecido"
            }
            label="Estimada"
          />
        </div>
      </div>
    </Section>
  );
}
