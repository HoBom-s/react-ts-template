/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { assert } from "@/lib";
import { Funnel, Step } from "./Funnel";
import { useQueryString } from "..";
import { createFunnelStateId, createFunnelStorage } from "./funnelUtil";

import type { FunnelProps, StepProps } from "..";
import type { FunnelStorage } from "./funnelUtil";
import type { NonEmptyArray } from "@/lib";

const DEFAULT_STEP_QUERY_KEY: string = "funnel-step";

type RouteFunnelStep<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
}

/**
 * `useFunnel.tsx`
 *
 * @reference 참조
 *    [Reference](https://slash.page/ko/libraries/react/use-funnel/readme.i18n/)
 *
 * @example
 *    const [Funnel, state, setState] = useFunnel(['step1', 'step2'], {
 *        initialStep: 'step1',
 *    }).withState<{
 *        name: string;
 *    }>({ name: 'step1' });
 *
 *    // ...
 *
 *    return (
 *        <Funnel>
 *          <Funnel.Step name='step1'>
 *            <button onClick={() => setState({ name: 'step1' })}>
 *              Step1 button
 *            </button>
 *          </Funnel.Step>
 *          <Funnel.Step name='step1'>
 *            <button onClick={() => setState({ name: 'step2' })}>
 *              Step2 button
 *            </button>
 *          </Funnel.Step>
 *        </Funnel>
 *    );
 *
 * @param {string[]} steps
 * @param options
 * @returns {[FunnelComponent, state, setState]}
 */
export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    /**
     * Store current step on query-string
     * /funnel?funnel-step=auth
     *
     * @default 'funnel-step'
     */
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  },
): readonly [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions) => void,
] & {
  withState: <
    StateExcludeStep extends Record<string, unknown> & { step?: never },
  >(
    initialState: StateExcludeStep,
  ) => [
    FunnelComponent<Steps>,
    StateExcludeStep,
    (
      next:
        | Partial<StateExcludeStep & { step: Steps[number] }>
        | ((
            next: Partial<StateExcludeStep & { step: Steps[number] }>,
          ) => StateExcludeStep & { step: Steps[number] }),
    ) => void,
  ];
} => {
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  assert(steps.length > 0, "The steps is empty !");

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelStep<Steps>) {
          const { qsValue } = useQueryString(stepQueryKey);

          const currentStep = qsValue ?? options?.initialStep;

          assert(
            currentStep,
            `Cannot expression current step. Please check the current step value ${currentStep} again !`,
          );

          /**
           * With children...
           *
           * @example
           *      <Funnel>
           *          {children}
           *      </Funnel>
           */
          return <Funnel<Steps> steps={steps} step={currentStep} {...props} />;
        },
        { Step },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setStep = useCallback(
    (step: Steps[number], setStepOptions?: SetStepOptions) => {
      const url = location.search;

      options?.onStepChange?.(step);

      switch (setStepOptions?.stepChangeType) {
        case "replace":
          navigate(url, {
            replace: true,
          });
          return;

        case "push":
        default:
          navigate(url, {
            replace: false,
          });
          return;
      }
    },
    [location.search, options, navigate],
  );

  type FunnelState = Record<string, unknown>;
  type Step = Steps[number];
  type NextState = FunnelState & { step?: Step };

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [state, _setState] = useFunnelState<FunnelState>({});

  const nextPendingStepRef = useRef<Step | null>(null);
  const nextStateRef = useRef<Partial<FunnelState> | null>(null);

  const setState = useCallback(
    (next: Partial<NextState> | ((next: Partial<NextState>) => NextState)) => {
      let nextStepValue: Partial<NextState>;

      if (typeof next === "function") {
        nextStepValue = next(state);
      } else {
        nextStepValue = next;
      }

      if (nextStepValue.step) {
        nextPendingStepRef.current = nextStepValue.step;
      }

      nextStateRef.current = nextStepValue;

      _setState(next);
    },
    [_setState, state],
  );

  useEffect(() => {
    if (nextPendingStepRef.current == null) {
      return;
    }

    setStep(nextPendingStepRef.current);

    nextPendingStepRef.current = null;
  }, [setStep, state]);

  const initializedRef = useRef(false);

  function withState<State extends Record<string, unknown>>(
    initialState: State,
  ) {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }
    return [FunnelComponent, state, setState] as const;
  }

  return Object.assign([FunnelComponent, setStep] as const, {
    withState,
  }) as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => Promise<void>,
  ] & {
    withState: <
      StateExcludeStep extends Record<string, unknown> & { step?: never },
    >(
      initialState: StateExcludeStep,
    ) => [
      FunnelComponent<Steps>,
      StateExcludeStep,
      (
        next:
          | Partial<StateExcludeStep & { step: Steps[number] }>
          | ((
              next: Partial<StateExcludeStep & { step: Steps[number] }>,
            ) => StateExcludeStep & { step: Steps[number] }),
      ) => void,
    ];
  };
};

function useFunnelState<T extends Record<string, any>>(
  defaultValue: Partial<T>,
  options?: { storage?: FunnelStorage<T> },
) {
  const location = useLocation();
  const { pathname, search } = location;

  const storage =
    options?.storage ??
    createFunnelStorage<T>(createFunnelStateId(`${pathname}${search}`));

  const persistentStorage = useRef(storage).current;

  const [_state, _setState] = useState<Partial<T>>(defaultValue);

  const setState = useCallback(
    (state: SetStateAction<Partial<T>>) => {
      _setState((prev) => {
        if (typeof state === "function") {
          const newState = state(prev);

          persistentStorage.set(newState);

          return newState;
        } else {
          persistentStorage.set(state);

          return state;
        }
      });
    },
    [persistentStorage],
  );

  return [_state, setState] as const;
}
