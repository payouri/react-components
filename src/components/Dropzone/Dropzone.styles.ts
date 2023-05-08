import styled /* , { css } */ from "styled-components";
import { UseDropzone } from "./Dropzone.types";

// const a = css`
//   border: 2px dashed;
//   ${({ isValid }: Pick<UseDropzone, "isValid">) => {
//     if (isValid === true) {
//       return css`
//         border-color: green;
//       `;
//     } else if (isValid === false) {
//       return css`
//         border-color: red;
//       `;
//     } else {
//       return css`
//         border-color: black;
//       `;
//     }
//   }}
//   padding: 1rem;
// `;

export const DropzoneContainer = styled.div.attrs({
  "data-slot": "DropzoneContainer",
})``;

export const DropzoneInput = styled.input.attrs({
  "data-slot": "DropzoneInput",
})`
  display: none;
`;

export const DropzoneDragZone = styled.div.attrs({
  "data-slot": "DropzoneDragZone",
})<Pick<UseDropzone, "isValid">>`
  border: 2px dashed;
  border-color: ${({ isValid }) =>
    isValid === true ? "green" : isValid === false ? "red" : "black"};
  padding: 1rem;
`;
