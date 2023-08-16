"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import styles from "./Header.module.css";

import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const COLORS = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(COLORS).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.action} onClick={handleClick}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
    </button>
  );
}

export default DarkLightToggle;
