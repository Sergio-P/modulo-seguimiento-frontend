import BoundingBox from "@/components/ui/layout/BoundingBox";
import clsx from "clsx";

export function Foo(props: { label: string; value: string; classData?: string }) {
  const { label, value } = props;
  return (
    <div className={clsx(props.classData, "flex gap-1")}>
      <div className="font-bold">{label}: </div>{" "}
      <div className="font-bold">{value}</div>
    </div>
  );
}

export function Subtitle(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="font-subtitle">{label} </div>{" "}
      <div className="font-subtitle">{value}</div>
    </div>
  );
}

export function SubSection(
  props: { title?: string } & React.PropsWithChildren
) {
  return (
    <>
      <h3 className="mt-5 mb-8 text-xl font-bold text-font-title">
        {props.title}
      </h3>
      {props.children}
    </>
  );
}

export function Separator() {
  return <div className="mt-6 h-[1px] w-full bg-zinc-400"></div>;
}

export function Section(
  props: { title?: string; id?: string; hidden?: any } & React.PropsWithChildren
) {
  return (
    <div id={props.id || props.title} hidden={props.hidden}>
      <BoundingBox className="border-background-dark">
        <h2
          className={clsx(
            props.title && "mb-9",
            "text-3xl font-bold text-font-title"
          )}
        >
          {props.title}
        </h2>
        {props.children}
      </BoundingBox>
    </div>
  );
}
