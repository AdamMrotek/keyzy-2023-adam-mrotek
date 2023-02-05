"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
type ToolTip = {
  value: string;
  extraSymbol?: string;
  min: number;
  max: number;
};

const WIDTH_OF_THUMB = 30;
const HALF_TOOLTIP_WIDTH = 8;

export default function ToolTip(props: ToolTip) {
  const toolTipContainer = useRef<HTMLHeadingElement>(null);
  const { value, min, max, extraSymbol } = props;
  const [moveBy, setMoveBy] = useState<number | null>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);

  const calNewPercentPosition = () => {
    return (parseInt(value) - min) / (max - min);
  };

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setDivWidth(toolTipContainer.current?.clientWidth || null);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!divWidth) return;
    const newPosition =
      calNewPercentPosition() * (divWidth - WIDTH_OF_THUMB) -
      HALF_TOOLTIP_WIDTH;
    console.log(newPosition);
    setMoveBy(newPosition);
  }, [divWidth, value, setMoveBy, min, max]);
  return (
    <div ref={toolTipContainer}>
      <span
        style={{
          transform: `translate(${moveBy}px)`,
          opacity: `${divWidth ? 1 : 0}`,
        }}
        className="text-center w-12 inline-block text-parchment bg-azure px-2 py-1 rounded-full "
      >
        {value}
        {extraSymbol ? extraSymbol : ""}
      </span>{" "}
    </div>
  );
}
