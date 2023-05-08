import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
// @ts-ignore
import { clamp } from "@youri-kane/js_utils/src/MathUtils";
// import Icon from "../Icon/Icon";
import { CSSProperties } from "styled-components";
import UseWindowMouse, {
  UnifiedPointerEvent,
} from "../../customHooks/useMouse";
import { PickerOuter } from "./ColorPicker.styles";

type AlphaHandleProps = {
  handleMouse: (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => void;
  alpha: number;
  angle: number;
};

const AlphaHandle = ({ handleMouse, alpha, angle }: AlphaHandleProps) => {
  return (
    <div
      onTouchStart={handleMouse}
      onMouseDown={handleMouse}
      onDoubleClick={(e) => {
        e.preventDefault();
      }}
      onDragStart={(e) => {
        e.preventDefault;
      }}
      className="alpha-picker"
      style={
        {
          "--opacity": alpha,
          transform: `rotate(${angle}rad)`,
        } as CSSProperties
      }
    />
  );
};

type ColorRangeProps = {
  onInput: (color: "red" | "green" | "blue", value: number) => void;
  color: "red" | "green" | "blue";
  value: string | number;
};

const ColorRange = ({ onInput, color, value }: ColorRangeProps) => {
  return (
    <div className={`individual-color-picker ${color}`}>
      <input
        onChange={({ target }) => {
          onInput(color, Number(target.value));
        }}
        onInput={({ target }) => {
          if (target instanceof HTMLInputElement)
            onInput(color, Number(target.value));
        }}
        type="range"
        min="0"
        max="255"
        value={value}
      ></input>
    </div>
  );
};

export type ColorPickerProps = {
  onColorChange: (color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }) => void;

  initRed?: number;
  initGreen?: number;
  initBlue?: number;
  initAlpha?: number;
};

export const ColorPicker = ({
  onColorChange,
  initRed = 30,
  initGreen = 245,
  initBlue = 245,
  initAlpha = 1,
}: ColorPickerProps) => {
  const r = 109.28;
  const offsetAngle = Math.PI * 2;

  const [dragged, setDragged] = useState(false);
  const [angle, setAngle] = useState(
    offsetAngle + Math.asin(((r / 2) * initAlpha) / r)
  );

  const [red, setRed] = useState(initRed);
  const [green, setGreen] = useState(initGreen);
  const [blue, setBlue] = useState(initBlue);
  const [alpha, setAlpha] = useState(initAlpha);

  const pickerRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAlpha(clamp((offsetAngle - angle) * -1 + r / (r * 2), 0, 1));
    return () => {};
  }, [angle]);

  const handleMouse = (
    event:
      | TouchEvent<HTMLElement>
      | MouseEvent<HTMLElement>
      | UnifiedPointerEvent
  ) => {
    const { type } = event;
    if ((type === "mousedown" || type === "touchstart") && !dragged) {
      setDragged(true);
    } else if (
      type === "mouseup" ||
      type === "mouseleave" ||
      type === "touchcancel" ||
      type === "touchend"
    ) {
      setDragged(false);
    } else if (
      "clientY" in event &&
      (type === "mousemove" || type === "touchmove") &&
      displayRef.current &&
      dragged
    ) {
      const { clientY } = event;
      const { height, top } = displayRef.current.getBoundingClientRect();

      const cy = top + height / 2;
      const y = clamp(clientY - cy, r / -2, r / 2);
      setAngle(-1 * Math.asin(y / r) + offsetAngle);
    }
    typeof onColorChange == "function" &&
      onColorChange({ red, green, blue, alpha });
  };

  UseWindowMouse({ callback: handleMouse, dependencies: [dragged] });

  const handleInput = (color: "red" | "green" | "blue", value: number) => {
    switch (color) {
      case "red":
        setRed(value);
        break;
      case "green":
        setGreen(value);
        break;
      case "blue":
        setBlue(value);
        break;
      default:
    }
    typeof onColorChange == "function" &&
      onColorChange({ red, green, blue, alpha });
  };

  return (
    <PickerOuter className="picker-outer">
      <div className="picker-wrapper" ref={pickerRef}>
        <div
          className="color-display"
          ref={displayRef}
          style={{
            backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(
              2
            )})`,
          }}
        ></div>
        <AlphaHandle handleMouse={handleMouse} alpha={alpha} angle={angle} />
        <div className="color-pickers">
          <ColorRange color="red" value={red} onInput={handleInput} />
          <ColorRange color="green" value={green} onInput={handleInput} />
          <ColorRange color="blue" value={blue} onInput={handleInput} />
        </div>
      </div>
      <div className="color-copier">
        {/* <Icon name="copy" /> */}
        <span>{`rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`}</span>
      </div>
    </PickerOuter>
  );
};
