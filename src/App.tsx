import { Button, Input } from "@/lib";

const App = () => {
  return (
    <div>
      <Button $primary size="md">
        잘보이니
      </Button>
      <Button size="lg">잘보이니</Button>
      <Input type="text" />
      <Input type="email" />
      <Input type="password" />
    </div>
  );
};

export default App;
