import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, useModal, Info, Form } from "@/lib";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const App = () => {
  const { isOpen, handleModalStateChange } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Button $primary size="md">
          잘보이니
        </Button>
        <Button size="lg">잘보이니</Button>
        <Input type="text" />
        <Input type="email" />
        <Input type="password" />
        <Button onClick={handleModalStateChange}>열어보자</Button>
        <Modal
          isOpen={isOpen}
          title="Hello"
          content={<Info title="Toast" text="Toast content" />}
          footer={{
            cancel: {
              label: "Cancel",
            },
            confirm: {
              label: "Confirm",
              onClick: handleModalStateChange,
            },
          }}
          close={handleModalStateChange}
        />
        <Form>
          <div>
            <Input type="text" />
            <Input type="email" />
            <Input type="password" />
          </div>
        </Form>
      </div>
    </QueryClientProvider>
  );
};

export default App;
