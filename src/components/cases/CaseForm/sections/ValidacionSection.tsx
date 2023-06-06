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

export default function ValidacionSection() {
  const { control, register } = useFormContext();
  const seguimiento = useContext(SeguimientoContext);
  const estadoVital = useWatch({
    control,
    name: "estado_vital",
  });
  console.log("estado vital: ", estadoVital);

  return (
    <Section id="validacion" title="Validación Antecedentes">
      <SubSection title="Validación Clase de Caso"></SubSection>
      <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <Controller
          name="caso_registro_correspondiente.clase_caso"
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
            defaultValue={seguimiento?.ultimo_contacto!}
            render={({ field }) => (
              <DatePicker
                defaultValue={
                  seguimiento?.ultimo_contacto
                    ? new Date(seguimiento?.ultimo_contacto)
                    : new Date()
                }
                label="Último Contacto"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center">
          {/* TODO: Este campo no existe en el modelo */}
          <Checkbox
            {...register(
              "caso_registro_correspondiente.sigue_atencion_otro_centro"
            )}
            label="Seguimiento otro centro"
          />
        </div>
      </div>
      <Separator />
      <SubSection title="Estado Vital"></SubSection>
      <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
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
                  estadoVital !== "Muerto"
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
          defaultValue={seguimiento?.fecha_defuncion!}
          render={({ field }) => (
            <DatePicker
              label="Fecha Defunción"
              disabled={
                seguimiento?.estado_vital === "Vivo" && estadoVital !== "Muerto"
              }
              defaultValue={
                seguimiento?.fecha_defuncion
                  ? new Date(seguimiento?.fecha_defuncion)
                  : new Date()
              }
              {...field}
            />
          )}
        />
        <div className="flex items-center">
          {/* TODO: Agregar fecha estimada en modelo de datos, actualmente no existe */}
          <Checkbox
            disabled={
              seguimiento?.estado_vital === "Vivo" && estadoVital !== "Muerto"
            }
            label="Estimada"
          />
        </div>
      </div>
    </Section>
  );
}
