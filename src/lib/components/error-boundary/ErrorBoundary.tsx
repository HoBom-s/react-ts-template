import {
  Component,
  ComponentPropsWithRef,
  ErrorInfo,
  PropsWithChildren,
  PropsWithRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import type { ChildrenAlias } from "@/types";

interface FallbackProps<ErrorType extends Error = Error> {
  error: ErrorType;
  reset: () => void;
}

type FallbackType = <ErrorType extends Error>(
  props: FallbackProps<ErrorType>,
) => ChildrenAlias;

interface Props<ErrorType extends Error = Error> {
  /**
   * Error가 발생했을 때 어떠한 Component를 Render할지 결정하도록 한다.
   */
  fallback: FallbackType;

  /**
   * ErrorBoundary에서 Catch한 Error인 경우
   * 어떠한 이벤트를 호출할지 정의하도록 한다.
   */
  onError?: (error: ErrorType, info: ErrorInfo) => void;

  /**
   * ErrorBoundary의 Error가 초기화 되면 호출되는 함수를 정의한다.
   */
  onResetError?: () => void;
}

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState = {
  error: null,
};

class BaseErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<Props>>,
  State
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    onError?.(error, errorInfo);
  }

  resetState() {
    this.setState(initialState);
  }

  resetErrorBoundary() {
    this.props.onResetError?.();
    this.resetState();
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return fallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

/**
 * Render or useEffect에서 발생한 Error를 잡을 수 있는 ErrorBoundary를 정의한다.
 *
 * @param {Function} fallback       Fallback render component
 * @param {Function} onError        `optional` Error 발생 시 호출 될 event handler
 * @param {Function} onResetError   `optional` Error 초기화 시 호출될 event handler
 *
 * @Note
 *      `onError()`, `onResetError()` props의 경우
 *      optional 하므로 특정 action을 취해야 할 경우에만
 *      Props로 전달하도록 한다.
 *
 * @example
 *      <ErrorBoundary
 *          fallback={() => <div>This is Error</div>}
 *          onError={() => alert("Error")}
 *          onResetError={() => window.location.replace("/")}
 *      >
 *          <div>Hello</div>
 *      </ErrorBoundary>
 */
export const ErrorBoundary = forwardRef<
  { reset(): void },
  ComponentPropsWithRef<typeof BaseErrorBoundary>
>((props, resetRef) => {
  const ref = useRef<BaseErrorBoundary>(null);

  useImperativeHandle(resetRef, () => ({
    reset: () => ref.current?.resetErrorBoundary(),
  }));

  return <BaseErrorBoundary ref={ref} {...props} />;
});
