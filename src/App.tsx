import { Button, Input, Modal, useModal, Info } from "@/lib";

const App = () => {
  const { isOpen, handleModalStateChange } = useModal();

  return (
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
    </div>
  );
};

export default App;
