import styled from "styled-components";

export const PickerOuter = styled.div`
  margin-left: 3rem;
  .picker-wrapper {
    position: relative;
    display: flex;
    width: 16rem;
    > * {
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: auto;
    }
  }

  .picker-outer {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    max-width: 16rem;
  }

  .color-copier {
    width: 100%;
    font-family: sans-serif;
    padding: 0.5rem 0.5rem 0;
    text-align: center;
    > span {
      margin-left: 0.5rem;
    }
  }

  .color-display {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    border: 2px solid #323232;
    user-select: none;
  }

  .alpha-picker {
    height: 1.5rem;
    width: 1.5rem;
    box-shadow: 0 0 0 2px #323232;
    position: absolute;
    border-radius: 50%;
    top: calc(50% - 0.75rem - 1px);
    left: calc(-1.5rem - 1.5rem);
    background: #323232;
    transform-origin: calc(5.5rem) center;
    user-select: none;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background-color: white;
      opacity: var(--opacity);
      content: "";
    }
  }
  .color-pickers {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    user-select: none;
    // justify-content: space-around;
  }
  .individual-color-picker {
    height: 0.9rem;
    overflow: hidden;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 2px rgba(18, 18, 18, 0.275);
    &:not(:first-child) {
      margin-top: 0.175rem;
    }
    &:not(:last-child) {
      margin-bottom: 0.175rem;
    }
    &:first-child {
      margin-top: auto;
    }
    &:last-child {
      margin-bottom: auto;
    }
    > input {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      height: 100%;
      width: calc(100% + 0.25rem);
      display: block;
      outline: none;
      margin: 0 -0.125rem;
    }
    &.red {
      background-image: linear-gradient(to right, #232 -2rem, #f00 90%);
    }
    &.blue {
      background-image: linear-gradient(to right, #232 -2rem, #00f 90%);
    }
    &.green {
      background-image: linear-gradient(to right, #232 -2rem, #0f0 90%);
    }
  }
`;
