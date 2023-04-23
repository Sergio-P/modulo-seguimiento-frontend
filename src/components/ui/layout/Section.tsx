import clsx from "clsx";
import BoundingBox from "./BoundingBox";

export default function Section(
  props: { title?: string; id?: string; hidden?: any } & React.PropsWithChildren
) {
  return (
    <div id={props.id || props.title} hidden={props.hidden}>
      <BoundingBox>
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
