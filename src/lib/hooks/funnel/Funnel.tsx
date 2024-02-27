import {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  isValidElement,
  useEffect,
} from "react";

import { NonEmptyArray, assert } from "@/lib";

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children:
    | Array<ReactElement<StepProps<Steps>>>
    | ReactElement<StepProps<Steps>>;
}

export const Funnel = <Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((idx) =>
      steps.includes((idx.props as Partial<StepProps<Steps>>).name ?? ""),
    ) as Array<ReactElement<StepProps<Steps>>>;

  const targetStep = validChildren.find((child) => child.props.name === step);

  assert(targetStep, `Cannot find valid step ${targetStep}`);

  return <Fragment>{targetStep}</Fragment>;
};

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}

export const Step = <Steps extends NonEmptyArray<string>>({
  name,
  onEnter,
  children,
}: StepProps<Steps>) => {
  useEffect(() => {
    onEnter?.();
  }, [onEnter]);

  return <Fragment key={name}>{children}</Fragment>;
};
