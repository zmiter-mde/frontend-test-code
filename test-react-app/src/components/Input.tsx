import styled from "styled-components"

/**
 * The "shake" should count as "3 times", I suppose :)
 */
export const Input = styled("input")`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  outline: none;
  border: 2px solid blue;

  &.error {
    border: 2px solid red;
    &:focus {
      animation: shake 0.4s ease-in-out 0.2s 2;
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    50%,
    90% {
      transform: translateX(-10px);
    }
    20%,
    60% {
      transform: translateX(10px);
    }
  }
`
