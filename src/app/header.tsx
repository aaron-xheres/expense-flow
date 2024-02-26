import { Button } from "@/components/ui/button";

type Props = {
  drawerOpenFn?: () => void;
};

export function Header(props: Props) {
  return (
    <div className="my-4 flex flex-row items-center align-middle text-xl">
      <Button variant="ghost" className="focus: bg-inherit" onClick={props.drawerOpenFn}>
        <p className="text-xl">☰</p>
      </Button>
      <p className="align-middle">Expense Flow</p>
    </div>
  );
}
