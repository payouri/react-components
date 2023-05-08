import { useRef } from "react";
import { useDropzone } from "./Dropzone.hook";
import { DropzoneProps } from "./Dropzone.types";
import {
  DropzoneContainer,
  DropzoneDragZone,
  DropzoneInput,
} from "./Dropzone.styles";

export const Dropzone = (props: DropzoneProps) => {
  const { inputProps, accept } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDropzoneClick,
    handleInputChange,
    isValid,
  } = useDropzone(props, inputRef);

  return (
    <DropzoneContainer>
      <DropzoneInput
        {...inputProps}
        ref={inputRef}
        accept={accept?.join(",")}
        type="file"
        onChange={handleInputChange}
      />
      <DropzoneDragZone
        isValid={isValid}
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleDropzoneClick}
      >
        Drop files here
      </DropzoneDragZone>
    </DropzoneContainer>
  );
};
