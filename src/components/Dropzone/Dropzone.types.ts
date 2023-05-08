import { ChangeEvent, DragEvent, HTMLAttributes } from "react";
import { FileMimeTypes } from "../../constants/file.constants";

export type DropzoneProps = {
  onDrop: (files: File[]) => void;
  accept?: FileMimeTypes[];
  multiple?: boolean;
  inputProps?: Omit<HTMLAttributes<HTMLInputElement>, "accept" | "type">;
};

export type UseDropzone = {
  handleDrop: (event: DragEvent<HTMLElement>) => void;
  handleDragOver: (event: DragEvent<HTMLElement>) => void;
  handleDragLeave: (event: DragEvent<HTMLElement>) => void;
  handleDropzoneClick: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | "unknown";
};
