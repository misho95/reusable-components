import Title from "./title";
import { Button } from "./ui/button";

const ButtonExample = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-5">
      <Title title="variants">
        <Button>primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
      </Title>
      <Title title="disabled">
        <Button disabled>primary</Button>
        <Button variant="secondary" disabled>
          secondary
        </Button>
        <Button variant="destructive" disabled>
          destructive
        </Button>
        <Button variant="ghost" disabled>
          ghost
        </Button>
        <Button variant="link" disabled>
          link
        </Button>
      </Title>
      <Title title="size">
        <Button size="sm">small</Button>
        <Button size="md">medium</Button>
        <Button size="lg">large</Button>
        <Button size="xl">extra large</Button>
      </Title>
      <Title title="radius">
        <Button>none</Button>
        <Button radius="sm">small</Button>
        <Button radius="md">medium</Button>
        <Button radius="lg">large</Button>
      </Title>
    </div>
  );
};

export default ButtonExample;
