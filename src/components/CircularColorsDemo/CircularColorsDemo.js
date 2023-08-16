"use client";
import React, { useId } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [status, setStatus] = React.useState("paused");

  React.useEffect(() => {
    if (status === "playing") {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
      const intervalId = setInterval(
        () => setTimeElapsed((timeElapsed) => timeElapsed + 1),
        1000
      );
      return () => clearInterval(intervalId);
    }
  }, [status]);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % 3];

  const selectedColorOutlineId = useId();

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={selectedColorOutlineId}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() =>
              setStatus(status === "playing" ? "paused" : "playing")
            }
          >
            {status === "playing" ? <Pause /> : <Play />}
            <VisuallyHidden>
              {status === "playing" ? "Pause" : "Play"}
            </VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setStatus("paused");
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
