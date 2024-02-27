import { ChildrenAlias } from "@/types";

interface Props<Item> {
  className?: string;
  items: Item[];
  render: (item: Item) => ChildrenAlias;
}

export const RenderProps = <Item,>({
  className,
  items,
  render,
}: Props<Item>) => {
  return (
    <div className={className ?? "render-props"}>
      {items.map((item: Item, idx: number) => (
        <div key={idx}>{render(item)}</div>
      ))}
    </div>
  );
};
