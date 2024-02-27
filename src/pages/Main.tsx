import { useFunnel, Card } from "@/lib";

export const Main = () => {
  const [Funnel, state, setState] = useFunnel(["step1", "step2"], {
    initialStep: "step1",
  }).withState<{
    name: string;
  }>({ name: "step1" });

  console.log(state);

  return (
    <div>
      <Funnel>
        <Funnel.Step name="step1">
          <div>
            <button onClick={() => setState({ name: "step1" })}>
              Step1 button
            </button>
          </div>
        </Funnel.Step>
        <Funnel.Step name="step2">
          <div>
            <button onClick={() => setState({ name: "step2" })}>
              Step2 button
            </button>
          </div>
        </Funnel.Step>
      </Funnel>
      <Card
        header={<div>Header</div>}
        contents={<div>Contents</div>}
        footer={<div>Footer</div>}
      />
    </div>
  );
};
