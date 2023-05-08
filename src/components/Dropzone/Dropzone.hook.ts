import { ChangeEvent, DragEvent, Ref, useState } from "react";
import { DropzoneProps, UseDropzone } from "./Dropzone.types";
import { isFileTypeValid } from "../../helpers/file.helpers";
import { RefObject } from "react";

export const useDropzone = (
  props: DropzoneProps,
  inputRef: RefObject<HTMLInputElement>
): UseDropzone => {
  const { onDrop, accept, multiple } = props;
  const [isValid, setIsValid] = useState<boolean | "unknown">("unknown");

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValid("unknown");
    if (isValid !== true) return;

    const files = Array.from(event.dataTransfer.files);
    onDrop(files);
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValid("unknown");
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { items } = event.dataTransfer;

    if (accept) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(item);
        if (item.kind !== "file") {
          setIsValid(false);
          return;
        }

        if (!isFileTypeValid(accept, item.type)) {
          setIsValid(false);
          return;
        }
      }
    }

    if (items.length > 1 && multiple === false && isValid !== false) {
      setIsValid(false);
      return;
    } else if (items.length === 1 && isValid !== true) {
      setIsValid(true);
      return;
    }

    if (isValid !== true) {
      setIsValid(true);
    }
  };

  const handleDropzoneClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    if (accept) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!isFileTypeValid(accept, file.type)) {
          return;
        }
      }
    }

    onDrop(files);
  };

  return {
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleDropzoneClick,
    handleInputChange,
    isValid,
  };
};
