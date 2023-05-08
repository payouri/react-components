import { FileMimeTypes } from "../constants/file.constants";

export const isFileTypeValid = (
  accept: FileMimeTypes[],
  type?: string
): boolean => {
  console.log(accept, type);
  if (!accept || accept.length === 0) return true;
  if (!type) return false;

  for (let i = 0; i < accept.length; i++) {
    const acceptedType = accept[i];
    const containsStar = acceptedType.includes("*");

    if (containsStar) {
      const [typePrefix] = acceptedType.split("/");

      if (typePrefix === "*") return true;
      if (type.includes(typePrefix)) return true;
    }

    if (type === acceptedType) return true;
  }

  return false;
};
