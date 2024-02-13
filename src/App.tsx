import {
  Button,
  Input,
  Modal,
  useModal,
  ErrorMessage,
  SuccessMessage,
} from "@/lib";

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
        content={<p>Hello</p>}
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
      <ErrorMessage message="error message" />
      <SuccessMessage message="success message" />
    </div>
  );
};

export default App;
