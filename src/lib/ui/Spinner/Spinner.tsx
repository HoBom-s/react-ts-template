import styled from "styled-components";

interface SpinnerBaseProps {
  $size: number;
  $color: string;
}

export const SpinnerBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerBase = styled.svg<SpinnerBaseProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  animation: rotate 1s linear infinite;

  & .path {
    stroke: ${(props) => props.$color};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Spinner = ({ size = "md", color = "#5652bf" }: SpinnerProps) => {
  const spinnerSize: number = (() => {
    if (size === "sm") {
      return 30;
    } else if (size === "md") {
      return 40;
    } else {
      return 50;
    }
  })();

  return (
    <SpinnerBox>
      <SpinnerBase viewBox="0 0 50 50" $size={spinnerSize} $color={color}>
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </SpinnerBase>
    </SpinnerBox>
  );
};
