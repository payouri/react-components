import { useEffect } from "react";

export type UnifiedPointerEvent = {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
} & (
  | {
      type: "touchmove" | "touchend" | "touchcancel";
      touches: TouchList;
    }
  | {
      type: "mousemove" | "mouseup" | "mouseleave";
      touches?: undefined;
    }
);

export type UseUnifiedPointerParams = {
  callback: (event: UnifiedPointerEvent) => void;
  dependencies?: unknown[];
};

export const UseUnifiedPointer = ({
  callback,
  dependencies,
}: UseUnifiedPointerParams) => {
  const handleTouch = ({ touches, type, ...touchEvent }: TouchEvent) => {
    if (touches && touches[0]) {
      callback({
        ...touchEvent,
        ...Object.assign(
          {},
          {
            screenX: touches[0].screenY,
            screenY: touches[0].screenY,
            clientX: touches[0].clientX,
            clientY: touches[0].clientY,
            pageX: touches[0].pageX,
            pageY: touches[0].pageY,
          }
        ),
        type: type as Extract<
          UnifiedPointerEvent["type"],
          "touchmove" | "touchend" | "touchcancel"
        >,
        touches,
      });
    }
  };
  const handleMouse = (event: MouseEvent) => {
    callback({
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
      screenX: event.screenX,
      screenY: event.screenY,
      type: event.type as Extract<
        UnifiedPointerEvent["type"],
        "mousemove" | "mouseup" | "mouseleave"
      >,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseup", handleMouse);
    window.addEventListener("mouseleave", handleMouse);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchend", handleTouch);
    window.addEventListener("touchcancel", handleTouch);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseup", handleMouse);
      window.removeEventListener("mouseleave", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouch);
      window.removeEventListener("touchcancel", handleTouch);
    };
  }, [dependencies]);
};

export default UseUnifiedPointer;
